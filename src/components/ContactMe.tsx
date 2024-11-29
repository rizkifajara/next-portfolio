import React from 'react'
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from 'framer-motion';
import { PageInfo } from '../../typings';

type Inputs = {
  name: string,
  email: string,
  subject: string,
  message: string,
};

type Props = {
    pageInfo: PageInfo;
}

function ContactMe({pageInfo}: any) {

  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = formData => {
    window.location.href = `mailto:rizkifajar456@gmail?subject=${formData.subject}
    &body=Hi, my name is ${formData.name}. ${formData.message} (${formData.email})`;
  };

  const formatPhoneNumber = (phoneNumber: string) => {
    return phoneNumber.replace(/^\+/, '');
  }

  return (
    <motion.div 
    initial={{
        opacity: 0
    }}
    whileInView={{
        opacity: 1
    }}
    transition={{
        duration:1.5
    }}
    className='flex relative flex-col text-center md:text-left md:flex-row
    max-w-7xl px-10 justify-evenly mx-auto items-center'
    style={{height:"150vh"}}>
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full dark:bg-opacity-20"
              style={{
                width: `${Math.floor(Math.random() * 200 + 100)}px`,
                height: `${Math.floor(Math.random() * 200 + 100)}px`,
                backgroundColor: i % 2 === 0 
                  ? 'var(--geometry-primary, rgba(13, 110, 253, 0.2))' 
                  : 'var(--geometry-secondary, rgba(108, 117, 125, 0.2))',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.4,
                animation: `float ${10 + i * 2}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>

        <h3 className='absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl'>
            Contact
        </h3>

        <div className='flex flex-col space-y-10 z-10 w-full max-w-2xl mx-auto'>
            <h4 className='text-4xl font-semibold text-center'>
                Need help for your business?{" "}
                <span className='decoration-[#F7AB0A]/50 underline'>
                    Let's talk.
                </span>
            </h4>

            <div className='space-y-10'>
                <div className='flex items-center space-x-5 justify-center'>
                    <PhoneIcon className='text-[#F7AB0A] h-7 w-7 animate-pulse'/>
                    <a 
                    href={`https://wa.me/${formatPhoneNumber(pageInfo.phoneNumber)}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-2xl hover:text-[#F7AB0A] transition-colors duration-200'
                    >
                        {pageInfo.phoneNumber} (Whatsapp)
                    </a>
                </div>

                <div className='flex items-center space-x-5 justify-center'>
                    <EnvelopeIcon className='text-[#F7AB0A] h-7 w-7 animate-pulse'/>
                    <p className='text-2xl'>
                        {pageInfo.email}
                    </p>
                </div>

                <div className='flex items-center space-x-5 justify-center'>
                    <MapPinIcon className='text-[#F7AB0A] h-7 w-7 animate-pulse'/>
                    <p className='text-2xl'>
                        {pageInfo.address}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-4 w-full'>
                <div className='flex space-x-2 w-full'>
                    <input 
                        {...register('name')} 
                        className="contactInput flex-1" 
                        placeholder="Name" 
                        type="text"
                        data-gramm="false"
                        data-gramm_editor="false"
                    />
                    <input 
                        {...register('email')} 
                        className="contactInput flex-1" 
                        placeholder="Email" 
                        type="email"
                        data-gramm="false"
                        data-gramm_editor="false"
                    />
                </div>
                <input 
                    {...register('subject')} 
                    className="contactInput w-full" 
                    placeholder="Subject" 
                    type="text"
                    data-gramm="false"
                    data-gramm_editor="false"
                />

                <textarea 
                    {...register('message')} 
                    className="contactInput w-full" 
                    placeholder='Message'
                    data-gramm="false"
                    data-gramm_editor="false"
                />

                <div className="flex justify-center pt-2">
                    <button 
                        type="submit"
                        className='bg-[#0d6efd] dark:bg-[#F7AB0A] py-5 px-8 rounded-md 
                        text-white dark:text-white font-bold text-lg 
                        hover:bg-[#0d6efd]/90 dark:hover:bg-[#F7AB0A]/90 transition-all'
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </motion.div>
  )
}

export default ContactMe