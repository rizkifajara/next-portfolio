import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Project } from '../../typings';
import { urlFor } from '@/sanity';
import useEmblaCarousel from 'embla-carousel-react';
import { useTheme } from '@/context/ThemeContext';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

function ProjectModal({ isOpen, onClose, project }: Props) {
  const { theme } = useTheme();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          scrollPrev();
          break;
        case 'ArrowRight':
          scrollNext();
          break;
        case 'Escape':
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, scrollPrev, scrollNext, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 z-[100]"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            className="fixed inset-0 flex items-center justify-center z-[101] p-4"
          >
            <div className={`w-[90vw] max-w-4xl rounded-lg p-6 overflow-y-auto max-h-[90vh] ${
              theme === 'dark' ? 'bg-[#242424]' : 'bg-white'
            }`}>
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{project.title}</h2>
                <button
                  onClick={onClose}
                  className={`${
                    theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                  } transition-colors`}
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-4">
                {/* Carousel */}
                <div className="relative h-[500px]">
                  <div className="overflow-hidden h-full" ref={emblaRef}>
                    <div className="flex h-full">
                      {/* Main project image */}
                      <div className="flex-[0_0_100%] min-w-0 relative h-full">
                        <img
                          src={urlFor(project.image).url()}
                          alt={project.title}
                          className="w-full h-full object-contain rounded-lg"
                        />
                      </div>
                      
                      {/* Project screenshots */}
                      {project.screenshots?.map((screenshot, index) => (
                        <div key={index} className="flex-[0_0_100%] min-w-0 relative h-full">
                          <img
                            src={urlFor(screenshot).url()}
                            alt={`${project.title} screenshot ${index + 1}`}
                            className="w-full h-full object-contain rounded-lg"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Navigation buttons */}
                  <button
                    onClick={scrollPrev}
                    className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                      theme === 'dark' ? 'bg-black/50 hover:bg-black/70' : 'bg-white/50 hover:bg-white/70'
                    } text-white p-2 rounded-full transition-colors z-10`}
                  >
                    <ChevronLeftIcon className="h-6 w-6" />
                  </button>
                  <button
                    onClick={scrollNext}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 ${
                      theme === 'dark' ? 'bg-black/50 hover:bg-black/70' : 'bg-white/50 hover:bg-white/70'
                    } text-white p-2 rounded-full transition-colors z-10`}
                  >
                    <ChevronRightIcon className="h-6 w-6" />
                  </button>

                  {/* Dots navigation */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                    {scrollSnaps.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === selectedIndex
                            ? theme === 'dark' 
                              ? 'bg-[#F7AB0A] w-4'
                              : 'bg-[#3B82F6] w-4'
                            : theme === 'dark'
                              ? 'bg-white/50 hover:bg-white/75'
                              : 'bg-gray-500/50 hover:bg-gray-500/75'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Project details */}
                <div className="mt-4">
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{project.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech._id}
                        className={`px-3 py-1 rounded-full text-sm ${
                          theme === 'dark'
                            ? 'bg-[#F7AB0A]/10 text-[#F7AB0A]'
                            : 'bg-[#3B82F6]/10 text-[#3B82F6]'
                        }`}
                      >
                        {tech.title}
                      </span>
                    ))}
                  </div>
                  {project.linkToBuild && (
                    <a
                      href={project.linkToBuild}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-4 inline-block px-4 py-2 rounded-lg transition-colors ${
                        theme === 'dark'
                          ? 'bg-[#F7AB0A] text-black hover:bg-[#F7AB0A]/90'
                          : 'bg-[#3B82F6] text-white hover:bg-[#3B82F6]/90'
                      }`}
                    >
                      View Project
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ProjectModal; 