import * as dotenv from 'dotenv'
import { join } from 'path'
import { Pinecone } from '@pinecone-database/pinecone'
import { pipeline } from '@xenova/transformers'

// Load environment variables from .env file
dotenv.config({ path: join(process.cwd(), '.env') })

interface PineconeIndex {
  name: string
  host?: string
  dimension?: number
  metric?: string
  spec?: any
  status?: any
}

interface PineconeMatch {
  id: string
  metadata?: Record<string, any>
  score?: number
}

export interface SearchResult {
  id: string
  text: string
  score: number
  metadata?: {
    category: string
    [key: string]: any
  }
}

class PineconeService {
  private embedder: any
  private pinecone: any
  private readonly INDEX_NAME = 'portfolio-assistant'
  private readonly EMBEDDING_MODEL = 'Xenova/all-MiniLM-L6-v2'
  private readonly EMBEDDING_DIMENSION = 384  // MiniLM-L6-v2 dimension

  constructor() {
    if (!process.env.PINECONE_API_KEY) {
      throw new Error('Missing required Pinecone API key')
    }

    this.pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY
    })
  }

  private async getEmbedder() {
    if (!this.embedder) {
      console.log('Loading embedding model...')
      this.embedder = await pipeline('feature-extraction', this.EMBEDDING_MODEL, {
        quantized: false
      })
    }
    return this.embedder
  }

  async getIndex() {
    try {
      const indexes = await this.pinecone.listIndexes()
      console.log('Available indexes:', indexes)
      let existingIndex = indexes.indexes?.find((i: PineconeIndex) => i.name === this.INDEX_NAME)
      
      if (existingIndex) {
        // Check if dimensions match
        if (existingIndex.dimension !== this.EMBEDDING_DIMENSION) {
          console.log('Index dimensions do not match, deleting old index...')
          await this.pinecone.deleteIndex(this.INDEX_NAME)
          // Wait for deletion to complete
          await new Promise(resolve => setTimeout(resolve, 1000 * 10))
          existingIndex = null
        }
      }

      if (!existingIndex) {
        console.log('Creating new Pinecone index...')
        // Create a new index if it doesn't exist
        await this.pinecone.createIndex({
          name: this.INDEX_NAME,
          dimension: this.EMBEDDING_DIMENSION,
          metric: 'cosine',
          spec: {
            serverless: {
              cloud: 'aws',
              region: 'us-east-1'
            }
          }
        })
        // Wait for index to be ready
        console.log('Waiting for index to be ready...')
        await new Promise(resolve => setTimeout(resolve, 1000 * 60))
      }

      return this.pinecone.index(this.INDEX_NAME)
    } catch (error) {
      console.error('Error getting Pinecone index:', error)
      throw error
    }
  }

  async createEmbedding(text: string) {
    try {
      const embedder = await this.getEmbedder()
      const output = await embedder(text, {
        pooling: 'mean',
        normalize: true
      })
      return Array.from(output.data)
    } catch (error) {
      console.error('Error creating embedding:', error)
      throw error
    }
  }

  async upsertEmbedding(id: string, text: string, metadata: Record<string, any> = {}) {
    try {
      console.log(`Getting index for ${id}...`)
      const index = await this.getIndex()
      
      console.log(`Creating embedding for ${id}...`)
      const embedding = await this.createEmbedding(text)
      
      console.log(`Upserting vector for ${id}...`)
      await index.upsert([{
        id,
        values: embedding,
        metadata: {
          text,
          ...metadata,
        },
      }])
      console.log(`Successfully upserted ${id}`)
    } catch (error) {
      console.error(`Error upserting embedding for ${id}:`, error)
      throw error
    }
  }

  async queryEmbeddings(query: string, topK: number = 3) {
    try {
      const index = await this.getIndex()
      const queryEmbedding = await this.createEmbedding(query)
      
      const results = await index.query({
        vector: queryEmbedding,
        topK,
        includeMetadata: true,
      })

      return results.matches.map((match: PineconeMatch) => ({
        id: match.id,
        text: match.metadata?.text,
        score: match.score,
        metadata: match.metadata,
      }))
    } catch (error) {
      console.error('Error querying embeddings:', error)
      throw error
    }
  }
}

const pineconeService = new PineconeService()

export const upsertEmbedding = pineconeService.upsertEmbedding.bind(pineconeService)
export const queryEmbeddings = pineconeService.queryEmbeddings.bind(pineconeService)
