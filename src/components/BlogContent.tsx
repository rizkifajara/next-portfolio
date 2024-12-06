import { PortableText } from '@portabletext/react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import Image from 'next/image'
import { urlFor } from '../sanity'

const components = {
  types: {
    code: ({ value }: any) => (
      <div className="my-4">
        {value.filename && (
          <div className="bg-gray-800 px-4 py-2 text-gray-200 text-sm rounded-t-lg">
            {value.filename}
          </div>
        )}
        <SyntaxHighlighter
          language={value.language || 'text'}
          style={tomorrow}
          className="rounded-b-lg"
        >
          {value.code}
        </SyntaxHighlighter>
      </div>
    ),
    image: ({ value }: any) => (
      <div className="relative my-4 w-full h-96">
        <Image
          src={urlFor(value).url()}
          alt={value.alt || ' '}
          fill
          className="object-contain"
        />
        {value.caption && (
          <div className="text-center text-gray-500 mt-2">
            {value.caption}
          </div>
        )}
      </div>
    ),
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl font-bold my-4">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-bold my-3">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-bold my-2">{children}</h3>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    code: ({ children }: any) => (
      <code className="bg-gray-100 rounded px-1 py-0.5">{children}</code>
    ),
  },
}

export default function BlogContent({ content }: { content: any[] }) {
  return (
    <article className="prose prose-lg max-w-none">
      <PortableText value={content} components={components} />
    </article>
  )
}