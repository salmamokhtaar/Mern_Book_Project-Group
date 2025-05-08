import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaBookOpen, FaEye } from 'react-icons/fa';
import { HiOutlineBookOpen } from 'react-icons/hi';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';

// Import required modules
import { Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';

function BookCards({ headline, books, subheadline }) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const headlineVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className='py-16 px-4 lg:px-24 bg-neutral-50'>
      <motion.div
        className='text-center mb-12'
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.h2
          className='text-5xl font-bold mb-4 text-gradient'
          variants={headlineVariants}
        >
          {headline}
        </motion.h2>

        {subheadline && (
          <motion.p
            className='text-xl text-neutral-700 max-w-2xl mx-auto'
            variants={headlineVariants}
          >
            {subheadline}
          </motion.p>
        )}
      </motion.div>

      {/* Book Cards Carousel */}
      <div className='mt-12'>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
          modules={[Pagination, Autoplay, EffectCoverflow]}
          className="mySwiper"
        >
          {books.map(book => (
            <SwiperSlide key={book._id} className="py-8 px-2">
              <div className="book-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <div className="relative overflow-hidden shine">
                  <img
                    src={book.imageUrl}
                    alt={book.bookTitle}
                    className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/300x400?text=No+Image";
                    }}
                  />

                  {/* Overlay */}
                  <div className="book-overlay absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent flex flex-col justify-end p-4">
                    <div className="flex gap-2 mb-2">
                      <Link
                        to={`/book/${book._id}`}
                        className="p-2 bg-primary-color rounded-full text-white hover:bg-primary-dark transition-colors"
                        title="View Details"
                      >
                        <FaEye />
                      </Link>

                      {book.bookPdfUrl && (
                        <a
                          href={book.bookPdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-secondary-color rounded-full text-neutral-900 hover:bg-secondary-dark transition-colors"
                          title="Read Book"
                        >
                          <FaBookOpen />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <div className="mb-2">
                    <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full bg-primary-light/20 text-primary-color last:mr-0 mr-1">
                      {book.bookCategory}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 line-clamp-1">{book.bookTitle}</h3>

                  <p className="text-neutral-700 mb-2">by {book.author}</p>

                  <p className="text-neutral-700 line-clamp-2 mb-4 flex-1">
                    {book.bookDescription || "No description available"}
                  </p>

                  <div className="mt-auto flex justify-between items-center">
                    <span className="text-lg font-bold text-primary-color">$10.00</span>

                    <Link
                      to={`/book/${book._id}`}
                      className="inline-flex items-center text-sm font-medium text-primary-color hover:text-primary-dark"
                    >
                      View Details
                      <HiOutlineBookOpen className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <Link
          to="/shop"
          className="inline-block px-6 py-3 bg-gradient-primary-secondary text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-xl"
        >
          View All Books
        </Link>
      </div>
    </div>
  );
}

export default BookCards;