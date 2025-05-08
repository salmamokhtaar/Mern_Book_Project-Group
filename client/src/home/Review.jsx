import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Avatar } from 'flowbite-react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';

// Import images
import img from "../assets/banner/38.jpg";
import img2 from "../assets/banner/s2.jpg";
import img3 from "../assets/banner/s3.jpg";
import img4 from "../assets/banner/39.jpg";
import img5 from "../assets/banner/40.jpg";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

function Review() {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
        <motion.span
          className='inline-block text-primary-color font-medium mb-2'
          variants={itemVariants}
        >
          Testimonials
        </motion.span>
        <motion.h2
          className='text-5xl font-bold mb-4 text-gradient'
          variants={itemVariants}
        >
          What Our Readers Say
        </motion.h2>
        <motion.p
          className='text-xl text-neutral-600 max-w-2xl mx-auto'
          variants={itemVariants}
        >
          Discover why our community loves our book collection and service
        </motion.p>
      </motion.div>

      {/* Testimonial cards */}
      <div className='relative'>
        {/* Custom navigation buttons */}
        <div className="absolute top-1/2 -left-4 z-10 hidden md:block">
          <button className="review-swiper-button-prev bg-white p-3 rounded-full shadow-md text-primary-color hover:bg-primary-color hover:text-white transition-colors">
            <HiOutlineChevronLeft className="w-6 h-6" />
          </button>
        </div>
        <div className="absolute top-1/2 -right-4 z-10 hidden md:block">
          <button className="review-swiper-button-next bg-white p-3 rounded-full shadow-md text-primary-color hover:bg-primary-color hover:text-white transition-colors">
            <HiOutlineChevronRight className="w-6 h-6" />
          </button>
        </div>

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={{
            prevEl: '.review-swiper-button-prev',
            nextEl: '.review-swiper-button-next',
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          modules={[Pagination, Navigation, Autoplay]}
          className="mySwiper py-8"
        >
          {/* Testimonial 1 */}
          <SwiperSlide>
            <div className='bg-white rounded-lg shadow-lg p-8 h-full border border-neutral-200 relative'>
              <div className='absolute -top-5 left-8 bg-primary-color text-white p-3 rounded-full'>
                <FaQuoteLeft className="w-6 h-6" />
              </div>

              <div className='text-secondary-color flex gap-1 mb-4 mt-4'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              <p className='text-neutral-700 mb-6 italic'>
                "I've been a member for over a year now, and I'm constantly impressed by the quality and variety of books available. The website is easy to navigate, and the recommendations are spot on!"
              </p>

              <div className='flex items-center mt-auto'>
                <Avatar
                  img={img2}
                  alt="Suad"
                  rounded
                  size="lg"
                  className='border-4 border-neutral-100'
                />
                <div className='ml-4'>
                  <h5 className='text-lg font-bold text-neutral-800'>Suad Ahmed</h5>
                  <p className='text-primary-color'>Book Enthusiast</p>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Testimonial 2 */}
          <SwiperSlide>
            <div className='bg-white rounded-lg shadow-lg p-8 h-full border border-neutral-200 relative'>
              <div className='absolute -top-5 left-8 bg-secondary-color text-white p-3 rounded-full'>
                <FaQuoteLeft className="w-6 h-6" />
              </div>

              <div className='text-secondary-color flex gap-1 mb-4 mt-4'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              <p className='text-neutral-700 mb-6 italic'>
                "The customer service is exceptional! I had an issue with a download, and they resolved it immediately. The selection of books is impressive, and I love the personalized recommendations."
              </p>

              <div className='flex items-center mt-auto'>
                <Avatar
                  img={img}
                  alt="Nimco"
                  rounded
                  size="lg"
                  className='border-4 border-neutral-100'
                />
                <div className='ml-4'>
                  <h5 className='text-lg font-bold text-neutral-800'>Nimco Hassan</h5>
                  <p className='text-primary-color'>Avid Reader</p>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Testimonial 3 */}
          <SwiperSlide>
            <div className='bg-white rounded-lg shadow-lg p-8 h-full border border-neutral-200 relative'>
              <div className='absolute -top-5 left-8 bg-primary-color text-white p-3 rounded-full'>
                <FaQuoteLeft className="w-6 h-6" />
              </div>

              <div className='text-secondary-color flex gap-1 mb-4 mt-4'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              <p className='text-neutral-700 mb-6 italic'>
                "As a literature professor, I'm quite particular about my reading material. This platform has exceeded my expectations with its diverse collection of both classic and contemporary works."
              </p>

              <div className='flex items-center mt-auto'>
                <Avatar
                  img={img3}
                  alt="Salmo"
                  rounded
                  size="lg"
                  className='border-4 border-neutral-100'
                />
                <div className='ml-4'>
                  <h5 className='text-lg font-bold text-neutral-800'>Salmo Omar</h5>
                  <p className='text-primary-color'>Literature Professor</p>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Testimonial 4 */}
          <SwiperSlide>
            <div className='bg-white rounded-lg shadow-lg p-8 h-full border border-neutral-200 relative'>
              <div className='absolute -top-5 left-8 bg-secondary-color text-white p-3 rounded-full'>
                <FaQuoteLeft className="w-6 h-6" />
              </div>

              <div className='text-secondary-color flex gap-1 mb-4 mt-4'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              <p className='text-neutral-700 mb-6 italic'>
                "I've discovered so many new authors through this platform. The reading experience is smooth, and I appreciate the ability to download books for offline reading. Highly recommended!"
              </p>

              <div className='flex items-center mt-auto'>
                <Avatar
                  img={img4}
                  alt="Hamdi"
                  rounded
                  size="lg"
                  className='border-4 border-neutral-100'
                />
                <div className='ml-4'>
                  <h5 className='text-lg font-bold text-neutral-800'>Hamdi Ali</h5>
                  <p className='text-primary-color'>Digital Nomad</p>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Testimonial 5 */}
          <SwiperSlide>
            <div className='bg-white rounded-lg shadow-lg p-8 h-full border border-neutral-200 relative'>
              <div className='absolute -top-5 left-8 bg-primary-color text-white p-3 rounded-full'>
                <FaQuoteLeft className="w-6 h-6" />
              </div>

              <div className='text-secondary-color flex gap-1 mb-4 mt-4'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              <p className='text-neutral-700 mb-6 italic'>
                "The monthly book recommendations have introduced me to genres I wouldn't normally explore. The interface is intuitive, and the reading experience is seamless across all my devices."
              </p>

              <div className='flex items-center mt-auto'>
                <Avatar
                  img={img5}
                  alt="Hafsa"
                  rounded
                  size="lg"
                  className='border-4 border-neutral-100'
                />
                <div className='ml-4'>
                  <h5 className='text-lg font-bold text-neutral-800'>Hafsa Mohamed</h5>
                  <p className='text-primary-color'>Book Blogger</p>
                </div>
              </div>
            </div>
          </SwiperSlide>


      </Swiper>
        </div>

        {/* Testimonial stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="bg-white p-6 rounded-lg shadow-md border border-neutral-200">
            <h3 className="text-4xl font-bold text-primary-color mb-2">4.9/5</h3>
            <p className="text-neutral-600">Average Rating</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-neutral-200">
            <h3 className="text-4xl font-bold text-primary-color mb-2">10,000+</h3>
            <p className="text-neutral-600">Happy Readers</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-neutral-200">
            <h3 className="text-4xl font-bold text-primary-color mb-2">98%</h3>
            <p className="text-neutral-600">Satisfaction Rate</p>
          </div>
        </motion.div>
    </div>
  );
}

export default Review;