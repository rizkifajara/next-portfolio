import React from 'react'
import { SocialIcon } from 'react-social-icons';
import { DocumentIcon, SunIcon, MoonIcon } from '@heroicons/react/24/solid';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Social } from '../../typings';
import { useTheme } from '@/context/ThemeContext';
import { Tooltip } from 'react-tooltip';

type Props = {
  socials: Social[];
}

const Header = ({socials}: Props) => {
  const { theme, toggleTheme } = useTheme();
  
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
          <div key={'SocialIconHeader' + social._id}>
            <SocialIcon 
              url={social.url}
              fgColor='gray'
              bgColor='transparent'
              className='flex-shrink-0'
              style={{ width: '40px', height: '40px' }}
              data-tooltip-id={"social-" + social._id}
              data-tooltip-content={social.title}
            />
            <Tooltip 
              id={"social-" + social._id}
              place="bottom"
            />
          </div>
        ))}

        <div>
          <a
            href="/CV_Rizki Fajar_Software Engineer.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 flex items-center justify-center w-10 h-10 transition-colors duration-200"
            data-tooltip-id="resume-tooltip"
            data-tooltip-content="Download Resume"
          >
            <DocumentIcon 
              className="h-6 w-6 text-gray-500"
            />
          </a>
          <Tooltip 
            id="resume-tooltip"
            place="bottom"
          />
        </div>
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
      className='flex flex-row items-center text-gray-300 cursor-pointer space-x-3'>
        <div>
          <button
            onClick={toggleTheme}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              theme === 'dark' 
                ? 'bg-[#F7AB0A] focus:ring-[#F7AB0A]' 
                : 'bg-[#3B82F6] focus:ring-[#3B82F6]'
            }`}
            data-tooltip-id="theme-tooltip"
            data-tooltip-content={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <span
              className={`absolute top-1 left-1 h-4 w-4 transform rounded-full 
              bg-white shadow-lg transition-transform duration-500 ease-in-out
              hover:scale-110 active:scale-95 ${
                theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
              }`}
              style={{
                transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }}
            />
            {/* Icons positioned absolutely within the track */}
            <SunIcon 
              className={`absolute right-1 top-1 h-4 w-4 transition-opacity duration-300 ${
                theme === 'dark' ? 'opacity-0' : 'opacity-100 text-white'
              }`} 
            />
            <MoonIcon 
              className={`absolute left-1 top-1 h-4 w-4 transition-opacity duration-300 ${
                theme === 'dark' ? 'opacity-100 text-white' : 'opacity-0'
              }`} 
            />
          </button>
          <Tooltip 
            id="theme-tooltip"
            place="bottom"
          />
        </div>

        <SocialIcon 
          className='cursor-pointer'
          network='email'
          fgColor='gray'
          bgColor='transparent'
          style={{ width: '40px', height: '40px' }}
          url='#contactme'
          title="Get in touch"
        />
        
        <Link href="#contactme">
          <span className="uppercase hidden md:inline-flex text-sm text-gray-400 cursor-pointer hover:text-gray-300">
            Get in touch
          </span>
        </Link>
      </motion.div>
    </header>
  )
}

export default Header;