import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@/context/ThemeContext'
import dynamic from 'next/dynamic'

const ChatWidget = dynamic(() => import('../components/ChatWidget'), {
  ssr: false,
  loading: () => null
})

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
