import React from 'react'
import {FaTwitter, FaLinkedinIn, FaRegEnvelope, FaGithub} from 'react-icons/fa'

export const About = () => {
  return (
    <div className=' text-[#002455]'>
      <div className='flex justify-center'>
        <h2 className='text-2xl my-5 font-bold'>About</h2>
      </div>
      
      <div className='flex justify-center my-5 sm:text-lg'>
        <p className=' w-3/4 md:w-2/4'>Each journey is an adventure and all adventures need exciting travel partners. TravelPaddi is a web app that helps you connect with other travellers with 
        the same destination and similar time frames. It is a great way to meet and connect with new people especially when travelling alone. 
        <span className='font-bold'> Sign up</span>, <span className='font-bold'>Create</span> your itinerary and begin <span className='font-bold'>Connecting</span> with other travellers!</p>
      </div>

      <div className='flex justify-center my-5 text-lg'>
        <p className='w-3/4 md:w-2/4'>New features will be announced soon.</p>
      </div>
      <div className='sm:text-lg my-10 flex justify-center items-center flex-wrap'>
          <p className='mr-3'>Elo Agbawe Idiodi</p>
          <a className='mr-3' href="https://github.com/Eloagbawe" target="_blank" rel="noreferrer"><FaGithub/></a>
          <a className='mr-3' href="https://twitter.com/Typical_elo" target="_blank" rel="noreferrer"><FaTwitter/></a>
          <a className='mr-3' href="https://www.linkedin.com/in/elo-agbawe-idiodi-77a231156/" target="_blank" rel="noreferrer"><FaLinkedinIn/></a>
          <a className='mr-3' href="mailto:eloagbawe@gmail.com" target="_blank" rel="noreferrer"><FaRegEnvelope/></a>
      </div>
    </div>
  )
}
