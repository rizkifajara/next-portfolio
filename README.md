# Personal Portfolio Website

This is a personal portfolio website built with Next.js, React, and Sanity CMS. It showcases skills, projects, and professional experiences in an interactive and responsive design.

## Features

- Responsive design that works on desktop and mobile
- Interactive UI elements with animations
- Skills section with hover effects
- Projects showcase with detailed modal views
- Experience timeline
- Contact form
- CMS integration for easy content management
- AI-powered chat assistant that can:
  - Answer questions about me in English and Indonesian
  - Provide information about my skills, experience, and background
  - Adapt to dark/light mode with theme-aware styling

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion for animations
- Sanity CMS for content management
- Vercel for deployment
- OpenRouter for AI chat capabilities
- Pinecone for vector database
- Xenova Transformers for embeddings

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- A Sanity account (for CMS functionality)
- OpenRouter API key (for AI chat)
- Pinecone API key and environment (for vector database)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/portfolio-website.git
   ```

2. Install dependencies:
   ```
   cd portfolio-website
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your credentials:
   ```
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   
   # AI Chat Configuration
   OPENAI_API_KEY=your_openrouter_api_key
   PINECONE_API_KEY=your_pinecone_api_key
   PINECONE_ENVIRONMENT=your_pinecone_environment
   ```

4. Set up your personal information:
   Create a `data/personal-info.json` file with your information chunks:
   ```json
   {
     "chunks": [
       {
         "id": "about-1",
         "text": "Your about text here",
         "metadata": { "category": "about" }
       },
       // Add more chunks for different sections
     ]
   }
   ```

5. Generate embeddings:
   ```
   npm run embeddings
   ```

6. Run the development server:
   ```
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## AI Chat Configuration

The AI chat feature uses:
- OpenRouter for generating responses
- Pinecone for storing and retrieving relevant context
- Xenova Transformers for generating embeddings

To update the chat's knowledge:
1. Modify the chunks in `data/personal-info.json`
2. Run `npm run embeddings` to update the vector database
3. The chat will automatically use the updated information

The chat supports:
- Bilingual responses (English and Indonesian)
- Dark/light mode theming
- Natural conversation style
- Context-aware responses based on your personal information

## Customization

- Update the content through the Sanity Studio
- Modify the components in the `src/components` directory to change the layout and design
- Adjust the styling using Tailwind classes or by modifying the `tailwind.config.js` file
- Customize the chat prompt and style in `src/pages/api/chat.ts` and `src/components/ChatWidget.tsx`

## Deployment

This project is set up for easy deployment on Vercel:
1. Connect your GitHub repository to Vercel
2. Add your environment variables in the Vercel project settings
3. Deploy and enjoy automatic updates on every push to main

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check [issues page](https://github.com/yourusername/portfolio-website/issues) if you want to contribute.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [OpenRouter Documentation](https://openrouter.ai/docs)
- [Pinecone Documentation](https://docs.pinecone.io)
- [Xenova Transformers](https://github.com/xenova/transformers.js)