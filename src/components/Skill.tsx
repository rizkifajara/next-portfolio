import React from 'react'
import { motion } from 'framer-motion'
import { Skill } from '../../typings'
import { urlFor } from '@/sanity'

type Props = {
    directionLeft?: boolean
    skill: Skill
}

function Skill({ directionLeft, skill }: any) {
  return (
    <div className='group relative flex cursor-pointer'>
        <motion.img 
        initial={{
            x: directionLeft ? -200 : 200, 
            opacity: 0
        }}
        transition={{
            duration:1,
        }}
        whileInView={{
            opacity:1,
            x:0
        }}
        src={urlFor(skill.image).url()}
        className='rounded-full border border-gray-500 object-cover w-24 h-24 xl:w-32 xl:h-32
        filter group-hover:grayscale transition duration-300 ease-in-out'
        />
        <div className='absolute opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out
        group-hover:bg-gray-300 h-24 w-24 md:h-28 md:w-28 xl:h-32 xl:w-32 rounded-full z-0'>
            <div className='flex items-center justify-center h-full'>
                <p className='text-lg md:text-2xl font-bold text-gray-900 opacity-100'>
                    {skill.title}
                </p>
            </div>
        </div>
    </div>
  )
}

export default Skill