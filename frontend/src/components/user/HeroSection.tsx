import React from 'react';
import mapImage from './ddv.jpg';

function HeroSection() {
  return (
    <div className='m-8 bg-gray-800 rounded-lg p-6 flex flex-row items-center text-center'>
        <div className='w-[70%]'>
      <h1 className='text-3xl font-bold text-white mb-4'>Welcome to JobPulse!</h1>
      <p className='text-lg text-white mb-4'>
        JobPulse is your go-to platform for finding and offering short-term jobs in your community. 
        Whether you need a driver for a day or are looking for temporary work as a delivery person or coconut cutter, 
        we connect you with the right people quickly and easily.
      </p>
     
      <p className='text-lg text-white mb-4'>
        Post your job requests or browse available opportunities today and join our growing community!
      </p>
      <a 
        href="#post-job" // Link to the job posting section
        className='bg-white text-green-500 font-semibold px-6 py-2 rounded shadow hover:bg-gray-200 transition duration-300'
      >
        Get Started
      </a>
     


      </div>
      <div className='w-80 '>
    <img src={mapImage} className='rounded-lg' alt="Description of the image" />
</div>
      
    </div>
  );
}

export default HeroSection;
