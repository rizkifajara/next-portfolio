declare module 'react-syntax-highlighter' {
  import { ComponentType } from 'react';
  
  interface SyntaxHighlighterProps {
    language?: string;
    style?: any;
    className?: string;
    children: string;
    [key: string]: any;
  }
  
  export const Prism: ComponentType<SyntaxHighlighterProps>;
  const SyntaxHighlighter: ComponentType<SyntaxHighlighterProps>;
  export default SyntaxHighlighter;
}

declare module 'react-syntax-highlighter/dist/cjs/styles/prism' {
  export const tomorrow: any;
} 