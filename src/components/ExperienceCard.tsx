 import { urlFor } from '@/sanity'
import { motion } from 'framer-motion'
import React from 'react'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import { Experience, Technology } from '../../typings'

 
 type Props = {
    experience: Experience
 }
 
 function ExperienceCard({experience}: any) {
   return (
     <div>
        <article className='flex flex-col rounded-lg items-center space-y-7 flex-shrink-0
        w-[500px] md:w-[600px] xl:w-[900px] snap-center bg-[#292929] p-10 hover:opacity-100 opacity-40
        cursor-pointer transition-opacity duration-200 overflow-hidden'>
            <motion.img 
            initial={{
                y: -100,
                opacity: 0
            }}
            transition={{
                duration: 1.2
            }}
            whileInView={{
                opacity: 1,
                y: 0
            }}
            viewport={{
                once: true
            }}
            className='w-32 h-32 rounded-full md:rounded-full xl:w-[200px]
            xl:h-[200px] object-cover object-center'
            src={urlFor(experience?.companyImage).url()}
            alt={experience.company} />

            <div className='px-0 md:px-10'>
                <h4 className='text-4xl font-light'>
                    {experience.jobTitle}
                </h4>
                <p className='font-bold text-2xl mt-1'>
                    {experience.company}
                </p>
                <div className='flex space-x-2 my-2'>
                    {/* Stack */}
                    {experience?.technologies.map((technology:any) => (
                        <>
                            <img key={"experience"+technology._id}
                            className="h-10 w-10 rounded-full"
                            src={urlFor(technology.image).url()}
                            alt={technology.title}
                            data-tooltip-id={"tooltip" + technology._id}
                            data-tooltip-content={technology.title}/>
                            
                            <Tooltip key={"tooltipexperience"+technology._id}
                            id={"tooltip" + technology._id} 
                            place={"bottom"}/>
                        </>
                    ))}
                </div>
                <p className='uppercase py-5 text-gray-300'>
                    ({experience.dateStarted} - {experience.dateEnded})
                </p>
                <ul className='list-disc space-y-4 ml-5 text-lg'>
                    {experience?.points.map((point:any, i:any) => (
                        <li key={"pointexperience"+i}>{point}</li>
                    ))}
                </ul>
            </div>
        </article>
     </div>
   )
 }
 
 export default ExperienceCard