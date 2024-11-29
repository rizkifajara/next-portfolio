import React from 'react'
import { motion } from 'framer-motion'
import ExperienceCard from './ExperienceCard'
import { Experience } from '../../typings'

type Props = {
    experiences: Experience[];
}

function WorkExperience({experiences}: Props) {
  return (
    <motion.div 
    initial={{
        opacity:0
    }}
    whileInView={{
        opacity:1
    }}
    transition={{
        duration:1.5
    }}
    className='flex relative overflow-hidden flex-col text-left md:flex-row
    max-w-full px-10 justify-evenly mx-auto items-center z-0' style={{height:"150vh"}}>
        <div className="absolute inset-0 grid grid-cols-2 -skew-y-12 opacity-40 dark:opacity-20 z-0">
          <div className="bg-blue-400/40 dark:bg-[#F7AB0A]/20 h-[20%] transform rotate-12"></div>
          <div className="bg-purple-400/40 dark:bg-purple-300/20 h-[40%] transform -rotate-12"></div>
          <div className="bg-pink-400/40 dark:bg-pink-300/20 h-[60%] transform rotate-12"></div>
          <div className="bg-blue-400/40 dark:bg-[#F7AB0A]/20 h-[80%] transform -rotate-12"></div>
        </div>

        <h3 className='absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl z-20'>
            Experience
        </h3>

        <div className='w-full flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory 
        scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80 z-10'>
            {experiences?.map((experience: any) => (
                <ExperienceCard key={"card"+experience._id} experience={experience}/>
            ))}
        </div>
    </motion.div>
  )
}

export default WorkExperience