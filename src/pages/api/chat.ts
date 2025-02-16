import type { NextApiRequest, NextApiResponse } from 'next'
import { queryEmbeddings } from '@/utils/pinecone'

const OPENROUTER_API_KEY = process.env.OPENAI_API_KEY
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1'

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
  const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'HTTP-Referer': 'https://rizkifajar.dev',
      'X-Title': 'Rizki Portfolio Chat'
    },
    body: JSON.stringify({
      model: 'openai/gpt-3.5-turbo',
      messages,
      temperature: 0.7,
      max_tokens: 500
    })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to get chat completion')
  }

  const data = await response.json()
  return data.choices[0].message.content
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

    // Get relevant context from Pinecone
    const searchResults = await queryEmbeddings(message)
    const context = searchResults
      .map(result => result.text)
      .join('\n\n')
    
    const reply = await createChatCompletion([
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: `Context:\n${context}\n\nQuestion: ${message}` }
    ])

    return res.status(200).json({ reply })
  } catch (error: any) {
    console.error('Chat API error:', error)
    return res.status(500).json({ 
      message: 'Failed to get response',
      error: error.message 
    })
  }
}
