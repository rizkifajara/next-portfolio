import React from 'react'
import { motion } from 'framer-motion'
import Skill from './Skill'
import {Skill as SkillType} from '../../typings'

type Props = {
    skills: SkillType[];
}

function Skills({skills}: any) {
  return (
    <motion.div 
    initial={{
        opacity:0,
    }}
    whileInView={{
        opacity:1
    }}
    transition={{
        duration:1.5
    }}
    className='flex relative flex-col text-center md:text-left xl:flex-row
    max-w-[2000px] xl:px-10 min-h-screen justify-center xl:space-y-0 mx-auto items-center'
    style={{height:"150vh"}}>
        <h3 className='absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl'>
            Skills
        </h3>

        <h3 className='absolute top-36 uppercase tracking-[3px] text-gray-500 text-sm'>
            Hover over images for technology stack name
        </h3>

        <div className='grid grid-cols-3 md:grid-cols-4 gap-5'>
            {skills?.slice(0, skills.length / 2).map((skill:any) => (
                <Skill key={'skill1'+skill._id} skill={skill} directionLeft={true}/>
            ))}

            {skills?.slice(skills.length / 2, skills.length).map((skill:any) => (
                <Skill key={'skill2'+skill._id} skill={skill} directionLeft={false}/>
            ))}
        </div>
    </motion.div>
  )
}

export default Skills