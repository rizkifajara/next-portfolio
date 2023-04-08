import React, { useEffect, useRef } from 'react'
import {motion} from 'framer-motion'
import { Project } from '../../typings'
import { urlFor } from '@/sanity'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import ScrollIntoView from 'react-scroll-into-view'

type Props = {
  projects: Project[]
}

function Projects({projects}: any) {

  const containerRef: any = React.useRef(); // <-- (1) create Ref
  const sliderTimerRef: any = React.useRef();

  useEffect(() => {
    return () => {
      // clear any running intervals on component unmount
      clearInterval(sliderTimerRef.current);
    };
  }, []);

  function slide(direction: string) {
    // clear any previously set intervals and reset scrollCompleted
    clearInterval(sliderTimerRef.current);
    let scrollCompleted = 0;
  
    sliderTimerRef.current = setInterval(function() {
      const container: any = containerRef.current; // <-- (3) access current ref value
  
      if (direction === 'left') {
        container.scrollLeft -= 100; // <-- (4)  Optional Chaining null check
      } else {
        container.scrollLeft += 100; // <-- (4)  Optional Chaining null check
      }
      scrollCompleted += 10;
      if (scrollCompleted >= 100) {
        clearInterval(sliderTimerRef.current);
      }
    }, 50);
  }
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
          {projects?.map((project: any, i: any)=> {
            let prevEl;
            let nextEl;
            if(i == projects.length - 1 && i != 0) {
              nextEl = projects[0]
              prevEl = projects[i-1]
            } else if (i == 0 && i != projects.length -1) {
              nextEl = projects[i+1]
              prevEl = projects[projects.length - 1]
            } else {
              nextEl = projects[i+1]
              prevEl = projects[i-1]
            }
            

            return (
              
            <div key={"divproject"+project._id} id={"divproject"+project._id} className='flex-shrink-0 flex flex-col space-y-5
            items-center justify-center p-20 md:p-44' style={{height:"150vh", width:"150vw"}}>
              <div className="flex flex-row items-center justify-center space-x-5">
                {/* Scroll button */}
                <ScrollIntoView key={"scrollIntoViewLeft"+project._id} selector={"#divproject"+prevEl._id}>
                  <a key={"buttonScrollLeft"+project._id} className="relative">
                    <ChevronLeftIcon key={"iconScrollLeft"+project._id} className='h-10 w-10 rounded-full filter grayscale
                    hover:grayscale-0 cursor-pointer' />
                  </a>
                </ScrollIntoView>
                <a key={"linkProject"+i} href={project.linkToBuild} target="_blank">
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
                  />
                </a>
                <ScrollIntoView key={"scrollIntoViewRight"+project._id} selector={"#divproject"+nextEl._id}>
                  <a key={"buttonScrollRight"+project._id} className="relative">
                    <ChevronRightIcon key={"iconScrollRight"+project._id} className='h-10 w-10 rounded-full filter grayscale
                    hover:grayscale-0 cursor-pointer' />
                  </a>
                </ScrollIntoView>
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
            
          )})}
        </div>

        <div className='w-full absolute top-[30%] bg-[#F7AB0A]/10 left-0 h-[500px] -skew-y-12'/>
    </motion.div>
  )
}

export default Projects