import React from 'react'
import { SocialIcon } from 'react-social-icons';

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
        />
        <Link href="#contact">
          <p className="uppercase hidden md:inline-flex text-sm text-gray-400">
            Get in touch
          </p>
        </Link>
      </motion.div>
    </header>
  )
}