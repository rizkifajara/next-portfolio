import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Skill from './Skill'
import SkillModal from './SkillModal'
import { Skill as SkillType } from '../../typings'
import Modal from './Modal'

type Props = {
    skills: SkillType[];
}

function Skills({skills}: Props) {
  const [showAllSkills, setShowAllSkills] = useState(false);

  const displayedSkills = skills.slice(0, 20);
  const hasMoreSkills = skills.length > 20;

  return (
    <motion.div 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1.5 }}
    className='flex relative flex-col text-center md:text-left xl:flex-row
    max-w-[2000px] xl:px-10 min-h-screen justify-center xl:space-y-0 mx-auto items-center'
    style={{height:"150vh"}}>
        <h3 className='absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl'>
            Skills
        </h3>

        <h3 className='absolute top-36 uppercase tracking-[3px] text-gray-500 text-sm'>
            Hover over images for technology stack name
        </h3>

        <div className='flex flex-col items-center'>
          <div className='grid grid-cols-4 gap-5'>
              {displayedSkills.map((skill, index) => (
                  <Skill 
                    key={skill._id} 
                    skill={skill} 
                    directionLeft={index % 2 === 0}
                  />
              ))}
          </div>

          {hasMoreSkills && (
            <button
              className='mt-10 bg-[#F7AB0A] text-black py-2 px-4 rounded-md'
              onClick={() => setShowAllSkills(true)}
            >
              Show More Skills
            </button>
          )}
        </div>

        {showAllSkills && (
          <Modal onClose={() => setShowAllSkills(false)} title="Skills">
            <div className='grid grid-cols-4 gap-5 max-h-[80vh] overflow-y-auto'>
              {skills.map((skill) => (
                <SkillModal key={skill._id} skill={skill} />
              ))}
            </div>
          </Modal>
        )}
    </motion.div>
  )
}

export default Skills