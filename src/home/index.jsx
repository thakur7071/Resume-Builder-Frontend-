import Header from '@/components/custom/Header';
import React from 'react';

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      <Header />
      <main className="flex flex-col items-center justify-center flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight leading-tight text-gray-900 dark:text-white md:text-4xl lg:text-5xl xl:text-6xl mb-6 text-center">
          Get Your Dynamic Professional Profile
        </h1>
        <p className="mt-4 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl text-center">
          Create and manage your professional profile with ease. Customize your details, add your experiences, skills, and much more to showcase your career achievements and goals.
        </p>
        <div className="mt-8 flex justify-center">

        </div>
        <div className="mt-12 flex flex-col items-center text-center px-4">
          <img
            src="/cv.png" 
            alt="Resume Builder"
            className="w-full max-w-md rounded-lg shadow-lg"
          />
          <p className="mt-4 text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-800 dark:text-gray-200">
            Start Building Your Perfect Resume Today!
          </p>
        </div>
      </main>
      <footer className="bg-gray-800 dark:bg-gray-700 text-white py-6 mt-12">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Your Company. All rights reserved.</p>
          <div className="mt-4 flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-200">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-gray-200">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-gray-200">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
