import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { PageInfo } from '../../typings';
import { urlFor } from '@/sanity';

type Props = {
  pageInfo: PageInfo;
}

export default function About({pageInfo}: any) {
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
    className='flex flex-col relative text-center md:text-left md:flex-row 
    max-w-7xl px-10 justify-evenly mx-auto items-center'
    style={{height:"150vh"}}
    >
        <div className="absolute top-[20%] left-0 w-72 h-72 
          bg-blue-400/30 dark:bg-[#F7AB0A]/30 
          rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl animate-blob-infinite"
          style={{ '--animation-delay': '0ms' } as React.CSSProperties}
        />
        <div className="absolute top-[30%] right-0 w-72 h-72 
          bg-purple-400/30 dark:bg-purple-300/30 
          rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl animate-blob-infinite"
          style={{ '--animation-delay': '2000ms' } as React.CSSProperties}
        />
        <div className="absolute bottom-[20%] left-[25%] w-72 h-72 
          bg-pink-400/30 dark:bg-pink-300/30 
          rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl animate-blob-infinite"
          style={{ '--animation-delay': '4000ms' } as React.CSSProperties}
        />

        <h3 className='absolute top-24 uppercase tracking-[20px] text-gray-600 dark:text-gray-500 text-2xl z-20'>
            About
        </h3>
        <motion.img 
          initial={{
            x:-200,
            opacity: 0
          }}
          transition={{
             duration: 1.2
          }}
          whileInView={{
            opacity:1,
            x:0
          }}
          viewport={{
            once:true
          }}
          src={urlFor(pageInfo?.profilePic).url()}
          className='-mb-20 md:mb-0 flex-shrink-0 w-56 h-56 rounded-full object-cover md:rounded-lg
          md:w-[400px] md:h-[400px] xl-w-[500px] xl-h-[500px] z-10'
        />

        <div className='space-y-10 px-0 md:px-10 z-10'>
          <h4 className='text-4xl font-semibold'>
            Here is a <span className='underline decoration-[#F7AB0A]/50'>little</span> background
          </h4>
          <p className='text-lg'>
            {pageInfo.backgroundInformation}
          </p>
        </div>
    </motion.div>
  )
}