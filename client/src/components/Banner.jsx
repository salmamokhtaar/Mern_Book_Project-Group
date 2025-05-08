import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BannerCard from '../home/BannerCard';
import { motion } from 'framer-motion';

function Banner() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${searchTerm}`);
    }
  };

  return (
    <div className='relative overflow-hidden'>
      {/* Background with gradient overlay */}
      <div className='absolute inset-0 bg-gradient-to-r from-primary-dark to-primary-color opacity-90'></div>

      {/* Animated background shapes */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-24 -left-24 w-96 h-96 bg-primary-light rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob'></div>
        <div className='absolute top-96 -right-20 w-96 h-96 bg-secondary-color rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000'></div>
        <div className='absolute -bottom-24 left-1/2 w-96 h-96 bg-primary-color rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000'></div>
      </div>

      <div className='px-4 lg:px-24 relative z-10'>
        <div className='flex w-full flex-col md:flex-row justify-between items-center gap-12 py-24 md:py-40'>
          {/* Left side */}
          <motion.div
            className='md:w-1/2 h-full space-y-8 text-white'
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className='text-5xl md:text-6xl font-bold leading-tight'>
              Discover Your Next
              <span className='text-secondary-color'> Favorite Book</span>
            </h1>

            <p className='md:w-4/5 text-xl md:text-2xl text-gray-200'>
              Explore our vast collection of books and immerse yourself in worlds of knowledge, adventure, and imagination.
            </p>

            <form onSubmit={handleSearch} className='flex flex-col sm:flex-row gap-4 sm:gap-0'>
              <input
                type="search"
                name="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='Search by title, author, or genre'
                className='py-3 px-4 w-full sm:w-auto sm:flex-1 rounded-lg sm:rounded-r-none outline-none text-gray-700 focus:ring-2 focus:ring-primary-color transition-all'
              />
              <button
                type="submit"
                className='bg-gradient-primary px-6 py-3 rounded-lg sm:rounded-l-none text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300'
              >
                Search
              </button>
            </form>

            <div className='pt-4 flex gap-4'>
              <Link
                to="/shop"
                className='inline-block px-6 py-3 bg-secondary-color text-neutral-900 font-medium rounded-lg hover:bg-secondary-dark transition-colors shadow-md'
              >
                Browse Books
              </Link>
              <Link
                to="/about"
                className='inline-block px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-primary-color transition-colors'
              >
                Learn More
              </Link>
            </div>
          </motion.div>

          {/* Right side */}
          <motion.div
            className='md:w-1/2'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <BannerCard />
          </motion.div>
        </div>
      </div>

      {/* Wave shape divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 md:h-24">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>
    </div>
  );
}

export default Banner;