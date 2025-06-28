import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { PageInfo } from '../../typings';
import { urlFor } from '@/sanity';
import dynamic from 'next/dynamic';
import { useTheme } from '@/context/ThemeContext';

// Dynamically import the World component to prevent SSR issues
const World = dynamic(() => import('@/components/ui/globe').then(mod => ({ default: mod.World })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#F7AB0A]"></div>
    </div>
  )
});

type Props = {
  pageInfo: PageInfo;
}

const colors = ["#06b6d4", "#3b82f6", "#6366f1"];
const indonesianCities = [
  {
    order: 1,
    lat: -7.7956,
    lng: 110.3695,
    color: colors[Math.floor(Math.random() * colors.length)],
    location: "Yogyakarta, Indonesia",
  },
];

const About: React.FC<Props> = ({pageInfo}) => {
  const { theme } = useTheme();
  const [selectedLocation, setSelectedLocation] = useState<{
    name: string;
    position: { x: number; y: number };
  } | null>(null);

  const handlePointClick = (location: string, position: { x: number; y: number }) => {
    console.log('handlePointClick called with:', location, position);
    setSelectedLocation({ name: location, position });
    // Auto-hide after 3 seconds
    setTimeout(() => setSelectedLocation(null), 3000);
  };

  // Theme-aware globe configuration
  const globeConfig = {
    pointSize: 2,
    pointColor: theme === 'dark' ? "#93c5fd" : "#F7AB0A", // Keep the accent color for points
    // Globe colors based on theme
    globeColor: theme === 'dark' ? "#F7AB0A" : "#93c5fd", // Orange for dark, light blue for light
    showAtmosphere: true,
    atmosphereColor: theme === 'dark' ? "#F7AB0A" : "#bfdbfe", // Orange glow for dark, very light blue for light
    atmosphereAltitude: 0.15,
    emissive: theme === 'dark' ? "#d97706" : "#60a5fa", // Darker orange for dark, medium blue for light
    emissiveIntensity: 0.3,
    shininess: 1.2,
    polygonColor: theme === 'dark' ? "rgba(34,139,34,0.6)" : "rgba(76,175,80,0.8)", // Forest green for dark theme, lighter green for light theme
    ambientLight: theme === 'dark' ? "#f59e0b" : "#93c5fd", // Amber for dark, light blue for light
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff", 
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: -2.5, lng: 118 }, // Center on Indonesia
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };

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
    className='flex flex-col relative text-center md:text-left xl:flex-row 
    max-w-7xl px-4 sm:px-6 md:px-10 justify-center xl:justify-between mx-auto items-center gap-6 sm:gap-8 md:gap-12 xl:gap-16'
    style={{height:"150vh", paddingTop: "80px"}}
    >
        {/* Background blobs */}
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

        <h3 className='absolute top-8 sm:top-10 md:top-12 lg:top-16 left-1/2 transform -translate-x-1/2 uppercase tracking-[10px] sm:tracking-[15px] md:tracking-[20px] text-gray-600 dark:text-gray-500 text-lg sm:text-xl md:text-2xl z-20'>
            About
        </h3>

        {/* Globe Container */}
        <div className='relative hidden sm:block w-full xl:w-[55%] h-[280px] sm:h-[320px] md:h-[400px] lg:h-[500px] xl:h-[700px] z-10 order-2 xl:order-1 flex-shrink-0'>
          <div className="w-full h-full relative flex items-center justify-center">
            {/* Globe */}
            <div className="w-full h-full flex items-center justify-center scale-75 sm:scale-90 md:scale-100 lg:scale-110 xl:scale-125">
              <World data={indonesianCities} globeConfig={globeConfig} onPointClick={handlePointClick} />
            </div>
            
            {/* Location Tooltip */}
            {selectedLocation && (
              <div 
                className="absolute z-30 bg-black/90 dark:bg-white/90 text-white dark:text-black px-3 py-2 rounded-lg text-sm font-medium shadow-lg border border-[#F7AB0A]/30 pointer-events-none"
                style={{
                  left: `${selectedLocation.position.x}px`,
                  top: `${selectedLocation.position.y}px`,
                  transform: 'translate(-50%, -100%)'
                }}
              >
                📍 {selectedLocation.name}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90 dark:border-t-white/90"></div>
              </div>
            )}
            
            {/* Connection Info Overlay */}
            <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 right-1 sm:right-2 z-20">
              <div className="bg-black/80 dark:bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 text-xs sm:text-sm">
                <h4 className="text-[#F7AB0A] font-semibold mb-1">🇮🇩 Indonesian Cities</h4>
                <p className="text-gray-300 dark:text-gray-400 leading-tight">
                  Interactive globe highlighting major Indonesian cities. 
                  <span className="hidden sm:inline">Click on the globe to see location details!</span>
                  <span className="sm:hidden">Tap to see details!</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className='w-full xl:w-[40%] flex flex-col items-center xl:items-start space-y-4 sm:space-y-5 md:space-y-6 z-10 order-1 xl:order-2 xl:pl-8'>
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
            className='flex-shrink-0 w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 rounded-full object-cover shadow-lg'
          />

          <div className='space-y-4 sm:space-y-5 md:space-y-6 px-2 sm:px-4 xl:px-0 text-center xl:text-left max-w-lg xl:max-w-none'>
            <h4 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight'>
              Here is a <span className='underline decoration-[#F7AB0A]/50'>little</span> background
            </h4>
            <p className='text-sm sm:text-base md:text-base lg:text-lg leading-relaxed text-gray-600 dark:text-gray-300'>
              {pageInfo.backgroundInformation}
            </p>
          </div>
        </div>
    </motion.div>
  )
}

export default About;