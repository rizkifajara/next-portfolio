import { useState, useRef, useEffect, useCallback, memo } from 'react'
import { IoMdSend } from 'react-icons/io'
import { FaRobot } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { useTheme } from '@/context/ThemeContext'
import { motion, AnimatePresence } from 'framer-motion'

type Message = {
  id: string
  content: string
  isUser: boolean
}

// Memoize animation variants
const chatVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 100 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30,
      duration: 0.5
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8, 
    y: 100,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30,
      duration: 0.3
    }
  }
} as const

const buttonVariants = {
  initial: { scale: 0 },
  animate: { 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
      duration: 0.5
    }
  },
  hover: { 
    scale: 1.1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: { scale: 0.9 }
} as const

// Memoize message component
const ChatMessage = memo(({ message, theme }: { message: Message, theme: 'dark' | 'light' }) => (
  <motion.div
    key={message.id}
    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
    initial={{ opacity: 0, x: message.isUser ? 50 : -50, y: 20 }}
    animate={{ opacity: 1, x: 0, y: 0 }}
    exit={{ opacity: 0, x: message.isUser ? 50 : -50 }}
    transition={{ type: "spring", stiffness: 500, damping: 30 }}
    layout
  >
    <motion.div
      className={`max-w-[80%] rounded-lg p-3 ${
        message.isUser
          ? theme === 'dark'
            ? 'bg-orange-500 text-white'
            : 'bg-blue-500 text-white'
          : theme === 'dark'
            ? 'bg-gray-700 text-gray-100'
            : 'bg-gray-100 text-gray-800'
      }`}
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      layout
    >
      {message.content}
    </motion.div>
  </motion.div>
))

ChatMessage.displayName = 'ChatMessage'

// Memoize loading indicator with multiple animation options
const LoadingIndicator = memo(({ theme }: { theme: 'dark' | 'light' }) => {
  // Option 1: Animated dots (classic typing indicator)
  const AnimatedDots = () => (
    <div className="flex items-center space-x-1">
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-current rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
    </div>
  )

  // Choose which animation to use (you can change this)
  const SelectedAnimation = AnimatedDots // Change this to any of the above

  return (
    <motion.div
      className="flex justify-start"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      <div className={`rounded-lg p-3 ${
        theme === 'dark'
          ? 'bg-gray-700 text-gray-100'
          : 'bg-gray-100 text-gray-800'
      }`}>
        <SelectedAnimation />
      </div>
    </motion.div>
  )
})

LoadingIndicator.displayName = 'LoadingIndicator'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom()
    }
  }, [messages, scrollToBottom])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    const newUserMessage = { id: Date.now().toString(), content: userMessage, isUser: true }
    setMessages(prev => [...prev, newUserMessage])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      })

      if (!response.ok) throw new Error('Failed to get response')

      const data = await response.json()
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(),
        content: data.reply, 
        isUser: false 
      }])
    } catch (error) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        isUser: false
      }])
    } finally {
      setIsLoading(false)
    }
  }, [input, isLoading])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      <div className="relative">
        {/* Text Box */}
        <motion.div 
          className="absolute pointer-events-none" 
          style={{ right: '4.5rem', bottom: '0.5rem' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            scale: [0.8, 1, 1, 0.8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatDelay: 1
          }}
        >
          <div className="bg-gray-800 dark:bg-gray-700 text-white px-4 py-2 rounded-l-xl relative flex items-center">
            <span className="text-[10px] font-medium whitespace-nowrap">ASK ME ANYTHING</span>
            {/* Sharp edge on the right */}
            <div className="absolute right-0 top-0 h-full w-2 bg-gray-800 dark:bg-gray-700"></div>
            {/* Triangle pointer */}
            <div className="absolute -right-2 bottom-2 w-0 h-0 
              border-t-8 border-t-transparent
              border-l-8 border-l-gray-800 dark:border-l-gray-700
              border-b-8 border-b-transparent">
            </div>
          </div>
        </motion.div>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`${
            theme === 'dark' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-500 hover:bg-blue-600'
          } text-white rounded-full p-4 shadow-lg relative z-10`}
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap="tap"
        >
          <motion.div
            animate={{ rotate: isOpen ? 0 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <IoClose size={24} /> : <FaRobot size={24} />}
          </motion.div>
        </motion.button>
      </div>

      {/* Chat Window */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            className={`absolute bottom-16 right-0 w-80 h-96 rounded-lg shadow-xl flex flex-col border ${
              theme === 'dark' 
                ? 'bg-[rgb(36,36,36)] border-gray-700' 
                : 'bg-white border-gray-200'
            }`}
            variants={chatVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
          >
            {/* Header */}
            <motion.div
              className={`${
                theme === 'dark' ? 'bg-orange-500' : 'bg-blue-500'
              } text-white p-4 rounded-t-lg`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <h3 className="font-semibold">Chat with Rizki's AI Assistant</h3>
            </motion.div>

            {/* Messages */}
            <motion.div 
              className="flex-1 overflow-y-auto p-4 space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <AnimatePresence mode="popLayout">
                {messages.map((msg) => (
                  <ChatMessage key={msg.id} message={msg} theme={theme} />
                ))}
              </AnimatePresence>
              
              {isLoading && <LoadingIndicator theme={theme} />}
              <div ref={messagesEndRef} />
            </motion.div>

            {/* Input */}
            <motion.form
              onSubmit={handleSubmit}
              className={`p-4 border-t ${
                theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex space-x-2">
                <motion.input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask me anything..."
                  className={`flex-1 rounded-lg px-3 py-2 ${
                    theme === 'dark'
                      ? 'bg-gray-800 text-gray-100 border-gray-600 placeholder-gray-400'
                      : 'bg-white text-gray-800 border-gray-300 placeholder-gray-500'
                  } border focus:outline-none ${
                    theme === 'dark' ? 'focus:border-orange-500' : 'focus:border-blue-500'
                  }`}
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className={`${
                    theme === 'dark'
                      ? 'bg-orange-500 hover:bg-orange-600'
                      : 'bg-blue-500 hover:bg-blue-600'
                  } text-white rounded-lg px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <IoMdSend />
                </motion.button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
