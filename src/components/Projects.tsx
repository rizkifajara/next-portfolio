import React, { useEffect, useRef, useState } from 'react'
import {motion} from 'framer-motion'
import { Project } from '../../typings'
import { urlFor } from '@/sanity'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import ProjectModal from './ProjectModal'

type Props = {
  projects: Project[]
}

function Projects({projects}: Props) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sortedProjects = projects.sort((a, b) => a.order - b.order)

  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    const container = containerRef.current;
    if (container) {
      // Calculate the actual width of each project item (148vw)
      const projectItemWidth = window.innerWidth * 1.48;
      
      // Find current project index based on scroll position
      const currentIndex = Math.round(container.scrollLeft / projectItemWidth);
      
      // Calculate target index
      const targetIndex = direction === 'left' ? 
        Math.max(0, currentIndex - 1) : 
        Math.min(sortedProjects.length - 1, currentIndex + 1);
      
      // Scroll to exact position of target project
      const targetScrollPosition = targetIndex * projectItemWidth;
      
      container.scrollTo({
        left: targetScrollPosition,
        behavior: 'smooth'
      });
    }
  }

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

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
    className='relative flex overflow-hidden flex-col text-left md:flex-row
    max-w-full justify-evenly mx-auto items-center z-0'
    style={{height:"150vh"}}>
        <h3 className='absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl'>
            Projects
        </h3>

        <h3 className='absolute top-36 uppercase tracking-[3px] text-gray-500 text-sm'>
            Swipe right/left to see other projects
        </h3>

        <div className='relative w-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory
        z-20 scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80 items-center' ref={containerRef}>
          {/* Project */}
          {sortedProjects?.map((project: any, i: any)=> (
              
            <div key={"divproject"+project._id} id={"divproject"+project._id} className='flex-shrink-0 flex flex-col space-y-5
            items-center justify-center p-20 md:p-44 snap-center' style={{height:"148vh", width:"148vw"}}>
              <div className="flex flex-row items-center justify-center space-x-5">
                {/* Scroll button */}
                  <a onClick={() => handleScroll('left')} key={"buttonScrollLeft"+project._id} className="relative">
                    <ChevronLeftIcon key={"iconScrollLeft"+project._id} className='h-10 w-10 rounded-full filter grayscale
                    hover:grayscale-0 cursor-pointer' />
                  </a>
                <a key={"linkProject"+i} onClick={() => handleProjectClick(project)} className="cursor-pointer">
                  <motion.img 
                  key={"imgProject"+i}
                  initial={{
                    y:-300,
                  }}
                  transition={{
                    duration:1.2
                  }}
                  whileInView={{
                    opacity:1,
                    y:0
                  }}
                  viewport={{
                    once:true
                  }}
                  width={250}
                  height={250}
                  src={urlFor(project.image).url()} 
                  alt={project.title}
                  className="object-cover rounded-lg"
                  style={{width: "250px", height: "250px"}}
                  />
                </a>
                  <a onClick={() => handleScroll('right')} key={"buttonScrollRight"+project._id} className="relative">
                    <ChevronRightIcon key={"iconScrollRight"+project._id} className='h-10 w-10 rounded-full filter grayscale
                    hover:grayscale-0 cursor-pointer' />
                  </a>
              </div>
              <div key={"div2project"+i} className='space-y-10 px-0 md:px-10 max-w-6xl'>
                <h4 key={"h4project"+i} className='text-4xl font-semibold text-center'>
                  <span key={"spanproject"+i} className='underline decoration-[#F7AB0A]/50'>
                    Project {i+1} of {projects.length}:
                  </span> {" "}
                  {project.title}
                </h4>
                <div key={"div3project"+i} className="flex item-center space-x-2 justify-center">
                  {project?.technologies.map((technology: any) => (
                    <>
                      <img
                        key={'imgProject'+ i + technology._id}
                        src={urlFor(technology.image).url()}
                        alt={technology.title}
                        className="h-10 w-10"
                        data-tooltip-id={"tooltip" + technology._id}
                        data-tooltip-content={technology.title} />
                      
                      <Tooltip key={"toolproject"+ i + technology._id}
                        id={"tooltip" + technology._id}
                        place={"top"} />
                    </>
                  ))}
                </div>
                <p key={"pproject"+i} className='text-lg text-center md:text-left'>
                  {project.summary}
                </p>
              </div>
            </div>
            
          ))}
        </div>

        <div className='w-full absolute top-[30%] bg-light-accent/10 dark:bg-[#F7AB0A]/10 left-0 h-[500px] -skew-y-12'/>

        {/* Modal */}
        <ProjectModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          project={selectedProject}
        />
    </motion.div>
  )
}

export default Projects