import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BsFacebook, BsGithub, BsInstagram, BsTwitter, BsLinkedin } from 'react-icons/bs';
import { FaBookOpen, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { HiOutlineArrowUp } from 'react-icons/hi';

function MyFooter() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-600 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-24">
        {/* Footer top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company info */}
          <div>
            <div className="flex items-center mb-6">
              <FaBookOpen className="text-primary-color text-3xl mr-2" />
              <h2 className="text-2xl font-bold">BookHaven</h2>
            </div>
            <p className="text-neutral-300 mb-6">
              Your ultimate destination for discovering, reading, and downloading books across all genres and interests.
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-primary-color mt-1 mr-3" />
                <p className="text-neutral-300">123 Book Street, Reading Avenue, Libraryville</p>
              </div>
              <div className="flex items-center">
                <FaPhoneAlt className="text-primary-color mr-3" />
                <p className="text-neutral-300">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-primary-color mr-3" />
                <p className="text-neutral-300">contact@bookhaven.com</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 border-b border-neutral-700 pb-2">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-neutral-300 hover:text-primary-color transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-300 hover:text-primary-color transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-neutral-300 hover:text-primary-color transition-colors">
                  Book Collection
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-neutral-300 hover:text-primary-color transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-neutral-300 hover:text-primary-color transition-colors">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-bold mb-6 border-b border-neutral-700 pb-2">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-neutral-300 hover:text-primary-color transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-primary-color transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-primary-color transition-colors">
                  Contact Support
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-primary-color transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-primary-color transition-colors">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-6 border-b border-neutral-700 pb-2">Newsletter</h3>
            <p className="text-neutral-300 mb-4">
              Subscribe to our newsletter to get updates on our latest book releases and promotions.
            </p>
            <form className="space-y-3">
              <div>
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary-color hover:bg-primary-dark text-white py-2 px-4 rounded-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-700 my-8"></div>

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 mb-4 md:mb-0">
            &copy; {currentYear} BookHaven. All rights reserved.
          </p>

          {/* Social icons */}
          <div className="flex space-x-4">
            <a
              href="#"
              className="bg-neutral-700 p-2 rounded-full text-white hover:bg-primary-color transition-colors"
              aria-label="Facebook"
            >
              <BsFacebook />
            </a>
            <a
              href="#"
              className="bg-neutral-700 p-2 rounded-full text-white hover:bg-primary-color transition-colors"
              aria-label="Twitter"
            >
              <BsTwitter />
            </a>
            <a
              href="#"
              className="bg-neutral-700 p-2 rounded-full text-white hover:bg-primary-color transition-colors"
              aria-label="Instagram"
            >
              <BsInstagram />
            </a>
            <a
              href="#"
              className="bg-neutral-700 p-2 rounded-full text-white hover:bg-primary-color transition-colors"
              aria-label="LinkedIn"
            >
              <BsLinkedin />
            </a>
            <a
              href="#"
              className="bg-neutral-700 p-2 rounded-full text-white hover:bg-primary-color transition-colors"
              aria-label="GitHub"
            >
              <BsGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-primary-color p-3 rounded-full text-white shadow-lg hover:bg-primary-dark transition-colors z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <HiOutlineArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
}

export default MyFooter;