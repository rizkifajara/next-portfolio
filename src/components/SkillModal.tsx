import React from 'react'
import { Skill } from '../../typings'
import { urlFor } from '@/sanity'
import { motion } from 'framer-motion'

type Props = {
    skill: Skill;
    isModal?: boolean;
}

function SkillModal({ skill, isModal = false }: Props) {
  const imageSize = isModal ? 'w-20 h-20 md:w-24 md:h-24' : 'w-24 h-24 xl:w-32 xl:h-32';
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='group relative flex cursor-pointer justify-center items-center'
    >
        <img 
          src={urlFor(skill.image).url()}
          className={`rounded-full border border-gray-500 object-cover 
          filter group-hover:grayscale transition duration-300 ease-in-out ${imageSize}`}
          alt={skill.title}
        />
        <div className={`absolute opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out
          group-hover:bg-white dark:group-hover:bg-gray-300 rounded-full z-0 ${imageSize}`}
        >
            <div className='flex items-center justify-center h-full'>
                <p className='text-base md:text-lg font-bold text-black opacity-100 text-center px-2'>
                    {skill.title}
                </p>
            </div>
        </div>
    </motion.div>
  )
}

export default SkillModal