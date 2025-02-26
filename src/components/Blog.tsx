import Link from 'next/link'
import { motion } from 'framer-motion'
import { Post } from "../../typings"
import { urlFor } from "../sanity"

type Props = {
  posts: Post[]
}

function Blog({ posts }: Props) {
  return (
    <motion.div 
      initial={{
        opacity: 0
      }}
      whileInView={{
        opacity: 1
      }}
      transition={{
        duration: 1.5
      }}
      className='relative flex overflow-hidden flex-col text-left md:flex-row max-w-full justify-evenly mx-auto items-center'
      style={{height: "150vh"}}
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-xl md:text-2xl z-30">
        Blog
      </h3>

      {/* Animated Background */}
      <div className="absolute w-full h-full overflow-hidden">
        <svg className="absolute w-full h-[120%] -top-[10%]" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="wave-grad-light" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 0.2 }} />
              <stop offset="100%" style={{ stopColor: '#60A5FA', stopOpacity: 0.1 }} />
            </linearGradient>
            <linearGradient id="wave-grad-dark" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#F7AB0A', stopOpacity: 0.2 }} />
              <stop offset="100%" style={{ stopColor: '#FCD34D', stopOpacity: 0.1 }} />
            </linearGradient>
          </defs>
          <motion.path
            d="M 0 50 C 20 40, 40 60, 60 50 C 80 40, 100 60, 100 50 L 100 100 L 0 100 Z"
            className="fill-[url(#wave-grad-light)] dark:fill-[url(#wave-grad-dark)]"
            animate={{
              d: [
                "M 0 50 C 20 40, 40 60, 60 50 C 80 40, 100 60, 100 50 L 100 100 L 0 100 Z",
                "M 0 50 C 20 60, 40 40, 60 50 C 80 60, 100 40, 100 50 L 100 100 L 0 100 Z",
                "M 0 50 C 20 40, 40 60, 60 50 C 80 40, 100 60, 100 50 L 100 100 L 0 100 Z"
              ]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.path
            d="M 0 60 C 30 50, 70 70, 100 60 L 100 100 L 0 100 Z"
            className="fill-[url(#wave-grad-light)] dark:fill-[url(#wave-grad-dark)]"
            style={{ opacity: 0.3 }}
            animate={{
              d: [
                "M 0 60 C 30 50, 70 70, 100 60 L 100 100 L 0 100 Z",
                "M 0 60 C 30 70, 70 50, 100 60 L 100 100 L 0 100 Z",
                "M 0 60 C 30 50, 70 70, 100 60 L 100 100 L 0 100 Z"
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 z-20 mt-24 md:mt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post) => (
            <Link key={post._id} href={`/${post.slug.current}`}>
              <motion.article 
                initial={{
                  y: 100,
                  opacity: 0
                }}
                whileInView={{
                  y: 0,
                  opacity: 1
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100
                }}
                className="flex flex-col rounded-xl overflow-hidden shadow-lg bg-white/90 dark:bg-[#2d2d2d]/90 hover:bg-white dark:hover:bg-[#2d2d2d] transition-all duration-200 cursor-pointer h-full backdrop-blur-sm border border-blue-200/20 dark:border-amber-200/20 hover:scale-[1.02] hover:shadow-xl"
              >
                {post.mainImage && (
                  <div className="relative h-48 sm:h-56 md:h-64 w-full">
                    <img
                      src={urlFor(post.mainImage).width(800).height(600).url()}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4 sm:p-6 flex flex-col flex-grow">
                  <h4 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 line-clamp-2 text-gray-800 dark:text-gray-100">
                    {post.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-auto flex items-center">
                    <span className="inline-block w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-blue-500 dark:bg-amber-500 mr-2"></span>
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default Blog
