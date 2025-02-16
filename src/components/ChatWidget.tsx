import { useState, useRef, useEffect } from 'react'
import { IoMdSend } from 'react-icons/io'
import { FaRobot } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { useTheme } from '@/context/ThemeContext'

type Message = {
  content: string
  isUser: boolean
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { content: userMessage, isUser: true }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      })

      const data = await response.json()
      
      if (!response.ok) throw new Error(data.message)
      
      setMessages(prev => [...prev, { content: data.reply, isUser: false }])
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, { 
        content: "Sorry, I'm having trouble responding right now. Please try again later.", 
        isUser: false 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          theme === 'dark' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-500 hover:bg-blue-600'
        } text-white rounded-full p-4 shadow-lg transition-colors`}
      >
        {isOpen ? <IoClose size={24} /> : <FaRobot size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={`absolute bottom-16 right-0 w-80 h-96 rounded-lg shadow-xl flex flex-col border ${
          theme === 'dark' 
            ? 'bg-[rgb(36,36,36)] border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          {/* Header */}
          <div className={`${
            theme === 'dark' ? 'bg-orange-500' : 'bg-blue-500'
          } text-white p-4 rounded-t-lg`}>
            <h3 className="font-semibold">Chat with Rizki's AI Assistant</h3>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.isUser
                      ? theme === 'dark'
                        ? 'bg-orange-500 text-white'
                        : 'bg-blue-500 text-white'
                      : theme === 'dark'
                        ? 'bg-gray-700 text-gray-100'
                        : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className={`rounded-lg p-3 ${
                  theme === 'dark'
                    ? 'bg-gray-700 text-gray-100'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  Typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className={`p-4 border-t ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className={`flex-1 rounded-lg px-3 py-2 ${
                  theme === 'dark'
                    ? 'bg-gray-800 text-gray-100 border-gray-600 placeholder-gray-400'
                    : 'bg-white text-gray-800 border-gray-300 placeholder-gray-500'
                } border focus:outline-none ${
                  theme === 'dark' ? 'focus:border-orange-500' : 'focus:border-blue-500'
                }`}
              />
              <button
                type="submit"
                disabled={isLoading}
                className={`${
                  theme === 'dark'
                    ? 'bg-orange-500 hover:bg-orange-600'
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white rounded-lg px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
              >
                <IoMdSend />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
