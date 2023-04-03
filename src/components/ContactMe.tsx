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
        <h3 className='absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl'>
            Contact
        </h3>

        <div className='flex flex-col space-y-10'>
            <h4 className='text-4xl font-semibold text-center'>
                Need help for your business?{" "}
                <span className='decoration-[#F7AB0A]/50 underline'>
                    Let's talk.
                </span>
            </h4>

            <div className='space-y-10'>
                <div className='flex items-center space-x-5 justify-center'>
                    <PhoneIcon className='text-[#F7AB0A] h-7 w-7 animate-pulse'/>
                    <p className='text-2xl'>
                        {pageInfo.phoneNumber} (Whatsapp)
                    </p>
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

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-2 w-fit mx-auto'>
                <div className='flex space-x-2'>
                    <input {...register('name')} className="contactInput" placeholder="Name" type="text" />
                    <input {...register('email')} className="contactInput" placeholder="Email" type="email" />
                </div>
                <input {...register('subject')} className="contactInput" placeholder="Subject" type="text" />

                <textarea {...register('message')} className="contactInput" placeholder='Message' />

                <button 
                type="submit"
                className='bg-[#F7AB0A] py-5 px-10 rounded-md text-black font-bold text-lg'
                >
                    Submit
                </button>
            </form>
        </div>
    </motion.div>
  )
}

export default ContactMe