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

  const handleCloseModal = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowAllSkills(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 grid grid-cols-6 gap-2 transform rotate-12 opacity-50">
          {[...Array(36)].map((_, i) => (
            <div
              key={i}
              className="h-16 bg-blue-400/30 dark:bg-[#F7AB0A]/30 rounded-lg transition-all duration-500"
              style={{
                opacity: Math.random() * 0.5 + 0.5,
                transform: `rotate(${Math.random() * 30}deg) scale(${Math.random() * 0.5 + 0.8})`,
                animation: `pulse ${3 + Math.random() * 2}s ease-in-out infinite`
              }}
            />
          ))}
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className='flex relative flex-col text-center md:text-left xl:flex-row
        max-w-[2000px] xl:px-10 min-h-screen justify-center xl:space-y-0 mx-auto items-center'
        style={{height:"150vh"}}>
          <h3 className='absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl z-10'>
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
                      className="md:hidden"
                    />
                ))}
                {displayedSkills.map((skill, index) => (
                    <Skill 
                      key={`${skill._id}-md`} 
                      skill={skill} 
                      directionLeft={index % 2 === 1}
                      className="hidden md:block"
                    />
                ))}
            </div>

            {hasMoreSkills && (
              <button
                className='mt-10 bg-light-accent/80 dark:bg-[#F7AB0A]/80 
                text-white dark:text-white 
                hover:bg-light-accent dark:hover:bg-[#F7AB0A] 
                transition-colors duration-200 
                py-2 px-4 rounded-md font-semibold'
                onClick={() => setShowAllSkills(true)}
              >
                Show More Skills
              </button>
            )}
          </div>
      </motion.div>

      {showAllSkills && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={handleCloseModal}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 w-11/12 max-w-4xl max-h-[90vh] 
            overflow-hidden relative"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                All Skills
              </h2>
              <button
                onClick={() => setShowAllSkills(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 
                dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 
                dark:hover:bg-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto max-h-[calc(90vh-8rem)] scrollbar-thin 
            scrollbar-track-gray-200 dark:scrollbar-track-gray-700 
            scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-500">
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                {skills.map((skill) => (
                  <SkillModal 
                    key={skill._id} 
                    skill={skill} 
                    isModal={true}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Skills