import React from 'react'
import { motion } from 'framer-motion'
import { Experience } from '../../typings'
import { urlFor } from '@/sanity'
import { Tooltip } from 'react-tooltip'

type Props = {
    experience: Experience
}

const ExperienceCard = ({ experience }: Props) => {
    return (
        <div>
            <article className='flex flex-col rounded-lg items-center space-y-7 flex-shrink-0
                w-[500px] md:w-[600px] xl:w-[900px] snap-center 
                bg-light-muted dark:bg-[#292929] p-10 
                hover:opacity-100 opacity-60
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
                    alt={experience.company} 
                />

                <div className='px-0 md:px-10'>
                    <h4 className='text-4xl font-light text-light-text dark:text-white'>
                        {experience.jobTitle}
                    </h4>
                    <p className='font-bold text-2xl mt-1 text-light-text dark:text-white'>
                        {experience.company}
                    </p>
                    <div className='flex space-x-2 my-2'>
                        {/* Stack */}
                        {experience?.technologies.map((technology:any) => (
                            <div key={"experience-tech-" + technology._id}>
                                <img 
                                    className="h-10 w-10 rounded-full"
                                    src={urlFor(technology.image).url()}
                                    alt={technology.title}
                                    data-tooltip-id={"exp-tech-" + technology._id}
                                    data-tooltip-content={technology.title}
                                />
                                <Tooltip 
                                    id={"exp-tech-" + technology._id}
                                    place="bottom"
                                />
                            </div>
                        ))}
                    </div>
                    <p className='uppercase py-5 text-light-secondary dark:text-gray-300'>
                        ({experience.dateStarted} - {experience.dateEnded})
                    </p>
                    <ul className='list-disc space-y-4 ml-5 text-lg text-light-text dark:text-white'>
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