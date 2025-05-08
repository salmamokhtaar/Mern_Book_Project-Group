import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/autoplay';

import './BannerCard.css';

// Import required modules
import { EffectCards, Autoplay } from 'swiper/modules';

export default function BannerCard() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch some books for the banner
    fetch("http://localhost:3000/all_books")
      .then(res => res.json())
      .then(data => {
        // Get 6 random books for the banner
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        setBooks(shuffled.slice(0, 6));
      })
      .catch(err => console.error("Error fetching banner books:", err));
  }, []);

  return (
    <motion.div
      className='banner relative'
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative elements */}
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-secondary-color rounded-full opacity-70 z-0"></div>
      <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-primary-color rounded-full opacity-70 z-0"></div>

      {/* Glowing effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary-color/20 to-secondary-color/20 blur-xl"></div>

      <Swiper
        effect={'cards'}
        grabCursor={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[EffectCards, Autoplay]}
        className="mySwiper"
      >
        {books.map((book, index) => (
          <SwiperSlide key={book._id || index} className="relative overflow-hidden">
            <Link to={`/book/${book._id}`} className="block w-full h-full">
              <img
                src={book.imageUrl}
                alt={book.bookTitle || `Book ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  // Use the default images from CSS as fallback
                  e.target.style.backgroundImage = `url('src/assets/banner/${(index % 6) + 1}.webp')`;
                  e.target.style.backgroundSize = 'cover';
                  e.target.style.backgroundPosition = 'center';
                }}
              />

              {/* Book info overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-4">
                <h3 className="text-white text-lg font-bold line-clamp-1">{book.bookTitle}</h3>
                <p className="text-gray-300 text-sm">{book.author}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Shine effect */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
      </div>
    </motion.div>
  );
}
