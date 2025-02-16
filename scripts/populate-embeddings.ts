import * as dotenv from 'dotenv'
import { join } from 'path'
import { readFileSync } from 'fs'
import { upsertEmbedding } from '../src/utils/pinecone'

// Load environment variables from .env file
dotenv.config({ path: join(process.cwd(), '.env') })

interface Chunk {
  id: string
  text: string
  metadata: {
    category: string
    [key: string]: any
  }
}

interface PersonalInfo {
  chunks: Chunk[]
}

async function populateEmbeddings() {
  try {
    console.log('Starting to populate embeddings...')
    
    // Read personal info from JSON file
    const personalInfoPath = join(process.cwd(), 'data', 'personal-info.json')
    console.log('Reading from:', personalInfoPath)
    
    const fileContent = readFileSync(personalInfoPath, 'utf-8')
    console.log('File content length:', fileContent.length)
    
    const personalInfo: PersonalInfo = JSON.parse(fileContent)
    console.log('Total chunks:', personalInfo.chunks.length)
    
    // Process each chunk
    for (const chunk of personalInfo.chunks) {
      console.log(`Processing chunk: ${chunk.id}`)
      if (!chunk.text) {
        console.error(`Error: No text found for chunk ${chunk.id}`)
        continue
      }
      console.log(`Text length for ${chunk.id}:`, chunk.text.length)
      try {
        await upsertEmbedding(chunk.id, chunk.text, chunk.metadata)
        console.log(`Successfully processed ${chunk.id}`)
      } catch (error) {
        console.error(`Error processing ${chunk.id}:`, error)
      }
    }
    
    console.log('Finished processing all chunks!')
  } catch (error) {
    console.error('Fatal error:', error)
    process.exit(1)
  }
}

populateEmbeddings()
