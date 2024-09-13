import React from 'react'
import { SocialIcon } from 'react-social-icons';
import { DocumentIcon } from '@heroicons/react/24/solid';

import { motion } from 'framer-motion';
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import Link from 'next/link';
import { Social } from '../../typings';

type Props = {
  socials: Social[];
}

export default function Header({socials}: any) {
  console.log(socials)
  return (
    <header className='sticky top-0 p-5 flex items-center justify-between max-w-7xl mx-auto z-20 md:items-center'>
      <motion.div 
      initial={{
        x:-500,
        opacity: 0,
        scale: 0.5,
      }}
      animate={{
        x:0,
        opacity:1,
        scale:1
      }}
      transition={{
        duration:1.5
      }}
      className='flex flex-row items-center'>
        {/* Social Icon */}
        {socials.map((social: any) => (
          <>
            <SocialIcon
              key={social._id}
              url={social.url}
              fgColor='gray'
              bgColor='transparent'
              className={social.title}
              data-tooltip-id={"toolsocial1" + social._id}
              data-tooltip-content={social.title} />
            
            <Tooltip
              id={"toolsocial1" + social._id}
              place={"bottom"} /> 
          </>
        ))}

        <a
          href="/CV_Rizki Fajar_Software Engineer.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-3 flex items-center justify-center w-10 h-10 transition-colors duration-200"
        >
          <DocumentIcon 
            className="h-6 w-6 text-gray-500"
          data-tooltip-id="resume-tooltip"
          data-tooltip-content="Resume" />
          <Tooltip
            id="resume-tooltip"
            place={"bottom"} />
        </a>
        
      </motion.div>

      

      <motion.div
      initial={{
        x:500,
        opacity:0,
        scale:0.5
      }}
      animate={{
        x:0,
        opacity:1,
        scale:1
      }}
      transition={{
        duration:1.5
      }}
      className='flex flex-row items-center text-gray-300 cursor-pointer'>
        <SocialIcon 
          className='cursor-pointer'
          network='email'
          fgColor='gray' 
          bgColor='transparent'
          url='#contactme'
        />
        <Link href="#contactme">
          <p className="uppercase hidden md:inline-flex text-sm text-gray-400">
            Get in touch
          </p>
        </Link>
      </motion.div>
    </header>
  )
}