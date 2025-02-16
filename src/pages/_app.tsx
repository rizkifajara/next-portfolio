import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@/context/ThemeContext'
import ChatWidget from '../components/ChatWidget'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <div>
        <Component {...pageProps} />
        <ChatWidget />
      </div>
    </ThemeProvider>
  )
}
