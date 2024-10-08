import React, { useState, useEffect } from 'react'
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
  const [displayCount, setDisplayCount] = useState(8);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setDisplayCount(8);
      } else if (window.innerWidth < 768) {
        setDisplayCount(12);
      } else {
        setDisplayCount(20);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const displayedSkills = skills.slice(0, displayCount);
  const hasMoreSkills = skills.length > displayCount;

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
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5'>
              {displayedSkills.map((skill, index) => (
                  <Skill 
                    key={skill._id} 
                    skill={skill} 
                    directionLeft={index % 2 === 0}
                    className="md:hidden" // Only visible on small screens
                  />
              ))}
              {displayedSkills.map((skill, index) => (
                  <Skill 
                    key={`${skill._id}-md`} 
                    skill={skill} 
                    directionLeft={index % 2 === 1}
                    className="hidden md:block" // Only visible on medium screens and up
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
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 max-h-[80vh] overflow-y-auto'>
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