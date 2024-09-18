import React from 'react'
import { motion } from 'framer-motion'
import { Skill as SkillType } from '../../typings'
import { urlFor } from '@/sanity'

type Props = {
    directionLeft?: boolean;
    skill: SkillType;
    className?: string;
}

function Skill({ directionLeft, skill, className = '' }: Props) {
  return (
    <div className={`group relative flex cursor-pointer ${className}`}>
        <motion.div
        initial={{
            x: directionLeft ? -200 : 200, 
            opacity: 0
        }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="relative w-24 h-24 xl:w-32 xl:h-32 rounded-full overflow-hidden"
        >
            <img 
                src={urlFor(skill.image).url()}
                className='object-cover w-full h-full filter transition duration-300 ease-in-out'
            />
            <div className='absolute inset-0 bg-gray-300 opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out'>
                <div className='flex items-center justify-center h-full'>
                    <p className='text-lg md:text-2xl font-bold text-gray-900 opacity-100'>
                        {skill.title}
                    </p>
                </div>
            </div>
        </motion.div>
    </div>
  )
}

export default Skill