import type { NextApiRequest, NextApiResponse } from 'next'
import type { SearchResult } from '@/utils/pinecone'
import { queryEmbeddings } from '@/utils/pinecone'
import NodeCache from 'node-cache'
import { GoogleGenerativeAI } from '@google/generative-ai'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY!
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)

// Cache responses for 1 hour
const cache = new NodeCache({ stdTTL: 3600 })

// System prompt that defines the assistant's behavior
const SYSTEM_PROMPT = `You are Rizki Fajar. Respond to questions as if you were Rizki himself, using a friendly, professional, and personal tone.
Use "I", "me", and "my" when referring to Rizki's experiences, skills, and background.
Keep responses concise but engaging, and maintain a conversational style.
Base your responses only on the provided context - if you're not sure about something, be honest about it.

Important language rules:
1. If the user asks in Indonesian (Bahasa Indonesia), respond in Indonesian
2. If the user asks in English, respond in English
3. For Indonesian responses:
   - Use "Saya" for "I"
   - Keep a professional but friendly tone
   - Use proper Indonesian, not slang
   - Example: "Saya seorang software engineer yang fokus di pengembangan web..."

Example responses in English:
"I specialize in full-stack development, with experience in React and Node.js. I'm currently working at..."
"My background includes..."
"I'm passionate about..."

Example responses in Indonesian:
"Saya saat ini bekerja sebagai AI Software Engineer di Platter.ai..."
"Latar belakang pendidikan saya..."
"Saya memiliki pengalaman dalam..."

Avoid third-person phrases in either language.`

async function createChatCompletion(messages: any[]) {
  try {
    const userMessage = messages[messages.length - 1].content

    // Create chat model with Gemini-Pro
    const model = genAI.getGenerativeModel({ 
      model: 'Gemini 2.5 Flash Preview 05-20'
    })

    // Send message and get response
    const result = await model.generateContent([
      { text: SYSTEM_PROMPT },
      { text: userMessage }
    ])
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Gemini API error:', error)
    throw error
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { message } = req.body

    if (!message) {
      return res.status(400).json({ message: 'Message is required' })
    }

    // Check cache first
    const cacheKey = `chat_${message.toLowerCase().trim()}`
    const cachedResponse = cache.get(cacheKey)
    if (cachedResponse) {
      return res.status(200).json({ reply: cachedResponse })
    }

    // Get relevant context from Pinecone
    const searchResults: SearchResult[] = await queryEmbeddings(message)
    const context = searchResults
      .filter(result => result.score > 0.7) // Only use highly relevant results
      .map(result => result.text)
      .join('\n\n')
    
    const reply = await createChatCompletion([
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: `Context:\n${context}\n\nQuestion: ${message}` }
    ])

    // Cache the response
    cache.set(cacheKey, reply)

    return res.status(200).json({ reply })
  } catch (error: any) {
    console.error('Chat API error:', error)
    return res.status(500).json({ 
      message: 'Failed to get response',
      error: error.message 
    })
  }
}
