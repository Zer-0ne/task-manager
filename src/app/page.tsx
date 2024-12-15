'use client'
import { FcGoogle } from 'react-icons/fc';
import Home from '@/components/home'
import ThemeSwitcher from '@/components/theme'
import React from 'react'
import { signIn, useSession } from 'next-auth/react';
import Typewriter from '@/components/typewriter';

const page = () => {
  const { status } = useSession();

  return (
    <div
      className='relative min-h-screen flex flex-1'
    >
      <div
        className='!container lg:!max-w-[1200px]  mx-auto my-4'
      >
        <div
          className='mx-4 flex flex-1 h-full justify-center items-center flex-col gap-3'
        >
          {
            status === 'authenticated' ?
              <Home /> :
              <WelcomePage />
          }
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  )
}



const WelcomePage = () => {
  return (
    <div className=" flex flex-col justify-between  text-gray-900 dark:text-white">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to <span className="text-blue-500">
            <Typewriter
              texts={[
                'Task Manager',
                'Organize Your Tasks',
                'Stay Productive',
                'Get Things Done!',
                'Achieve Your Goals'
              ]}
              speed={80}
            />
          </span>
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Simplify your work and get tasks done efficiently!
        </p>
        <div className="flex space-x-4">
          {/* Login with Google Button */}
          <button
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-white text-black border border-[#ffffff5f] rounded-full shadow-md hover:shadow-lg transition hover:border-white transform ease-in-out hover:scale-105 dark:bg-black dark:text-white"
            onClick={() => signIn('google')}
          >
            <FcGoogle size={20} />
            <span className="font-medium">Login with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};



export default page