import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { PageInfo } from '../../typings';
import { urlFor } from '@/sanity';
import dynamic from 'next/dynamic';

// Dynamically import the Globe demo to prevent SSR issues
const GlobeDemo = dynamic(() => import('./globe-demo'), {
  ssr: false,
});

type Props = {
  pageInfo: PageInfo;
}

const colors = ["#06b6d4", "#3b82f6", "#6366f1"];
const sampleArcs = [
  {
    order: 1,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: -22.9068,
    endLng: -43.1729,
    arcAlt: 0.1,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 1,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 3.139,
    endLng: 101.6869,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 1,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: -1.303396,
    endLng: 36.852443,
    arcAlt: 0.5,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 2,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 2,
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 3.139,
    endLng: 101.6869,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 2,
    startLat: -15.785493,
    startLng: -47.909029,
    endLat: 36.162909,
    endLng: -115.119411,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 3,
    startLat: -33.8688,
    startLng: 151.2093,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 3,
    startLat: 21.3099,
    startLng: -157.8581,
    endLat: 40.7128,
    endLng: -74.006,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 3,
    startLat: -6.2088,
    startLng: 106.8456,
    endLat: 51.5072,
    endLng: -0.1276,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 4,
    startLat: 11.986597,
    startLng: 8.571831,
    endLat: -15.595412,
    endLng: -56.05918,
    arcAlt: 0.5,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 4,
    startLat: -34.6118,
    startLng: -58.3960,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.7,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 4,
    startLat: 22.3193,
    startLng: 114.1694,
    endLat: 51.5072,
    endLng: -0.1276,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 5,
    startLat: 25.276987,
    startLng: 55.296249,
    endLat: 37.6872,
    endLng: -122.4194,
    arcAlt: 0.9,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 5,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: -33.8688,
    endLng: 151.2093,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 6,
    startLat: 31.2304,
    startLng: 121.4737,
    endLat: 37.6872,
    endLng: -122.4194,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 6,
    startLat: -15.432563,
    startLng: 28.315853,
    endLat: 1.094136,
    endLng: -63.34546,
    arcAlt: 0.7,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 7,
    startLat: 12.9716,
    startLng: 77.5946,
    endLat: 28.6139,
    endLng: 77.209,
    arcAlt: 0.1,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 7,
    startLat: 26.8206,
    startLng: 30.8025,
    endLat: 3.139,
    endLng: 101.6869,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 8,
    startLat: -14.270972,
    startLng: -170.132217,
    endLat: -35.110117,
    endLng: 173.550017,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 8,
    startLat: -21.118680,
    startLng: -175.208755,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.5,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  {
    order: 8,
    startLat: 3.139,
    startLng: 101.6869,
    endLat: -6.2088,
    endLng: 106.8456,
    arcAlt: 0.1,
    color: colors[Math.floor(Math.random() * colors.length)],
  },
];

const About: React.FC<Props> = ({pageInfo}) => {
  return (
    <motion.div
    initial={{
      opacity: 0
    }}
    whileInView={{
      opacity: 1
    }}
    transition={{
      duration: 1.5
    }}
    className='flex flex-col relative text-center md:text-left md:flex-row 
    max-w-7xl px-10 justify-evenly mx-auto items-center'
    style={{height:"150vh"}}
    >
        <div className="absolute top-[20%] left-0 w-72 h-72 
          bg-blue-400/30 dark:bg-[#F7AB0A]/30 
          rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl animate-blob-infinite"
          style={{ '--animation-delay': '0ms' } as React.CSSProperties}
        />
        <div className="absolute top-[30%] right-0 w-72 h-72 
          bg-purple-400/30 dark:bg-purple-300/30 
          rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl animate-blob-infinite"
          style={{ '--animation-delay': '2000ms' } as React.CSSProperties}
        />
        <div className="absolute bottom-[20%] left-[25%] w-72 h-72 
          bg-pink-400/30 dark:bg-pink-300/30 
          rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl animate-blob-infinite"
          style={{ '--animation-delay': '4000ms' } as React.CSSProperties}
        />

        <h3 className='absolute top-24 uppercase tracking-[20px] text-gray-600 dark:text-gray-500 text-2xl z-20'>
            About
        </h3>

        <div className='relative w-full h-[500px] md:h-[600px] z-10 flex items-center justify-center'>
          {/* <GlobeDemo /> */}
        </div>

        <motion.img 
          initial={{
            x:-200,
            opacity: 0
          }}
          transition={{
             duration: 1.2
          }}
          whileInView={{
            opacity:1,
            x:0
          }}
          viewport={{
            once:true
          }}
          src={urlFor(pageInfo?.profilePic).url()}
          className='-mb-20 md:mb-0 flex-shrink-0 w-56 h-56 rounded-full object-cover md:rounded-lg
          md:w-[400px] md:h-[400px] xl-w-[500px] xl-h-[500px] z-10'
        />

        <div className='space-y-10 px-0 md:px-10 z-10'>
          <h4 className='text-4xl font-semibold'>
            Here is a <span className='underline decoration-[#F7AB0A]/50'>little</span> background
          </h4>
          <p className='text-lg'>
            {pageInfo.backgroundInformation}
          </p>
        </div>
    </motion.div>
  )
}

export default About;