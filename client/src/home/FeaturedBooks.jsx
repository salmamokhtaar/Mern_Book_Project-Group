import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Spinner } from 'flowbite-react';
import { HiOutlineBookOpen, HiOutlineStar } from 'react-icons/hi';

function FeaturedBooks() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:3000/all_books");
        const data = await response.json();

        // For featured books, we'll take 3 random books
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        setBooks(shuffled.slice(0, 3));
        setError(null);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load featured books");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 lg:px-24 bg-white">
      <motion.div
        className="text-center mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.h2
          className="text-5xl font-bold mb-4 text-gradient"
          variants={itemVariants}
        >
          Featured Books
        </motion.h2>
        <motion.p
          className="text-xl text-gray-600 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Handpicked selections that deserve a special place on your bookshelf
        </motion.p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {books.map((book, index) => (
          <motion.div
            key={book._id}
            className="relative overflow-hidden rounded-lg shadow-lg group"
            variants={itemVariants}
          >
            <div className="absolute top-4 left-4 z-10">
              <span className="flex items-center bg-secondary-color text-neutral-900 px-3 py-1 rounded-full font-bold text-sm">
                <HiOutlineStar className="mr-1" /> Featured
              </span>
            </div>

            <div className="relative h-96 overflow-hidden">
              <img
                src={book.imageUrl}
                alt={book.bookTitle}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/400x600?text=No+Image";
                }}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80"></div>

              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{book.bookTitle}</h3>
                <p className="text-gray-300 mb-3">by {book.author}</p>

                <div className="mb-4">
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-neutral-200 text-neutral-800 mr-2">
                    {book.bookCategory}
                  </span>
                </div>

                <p className="text-gray-300 mb-6 line-clamp-2">
                  {book.bookDescription || "No description available"}
                </p>

                <div className="flex gap-3">
                  <Link
                    to={`/book/${book._id}`}
                    className="inline-flex items-center px-4 py-2 bg-primary-color hover:bg-primary-dark text-white rounded-lg transition-colors"
                  >
                    <HiOutlineBookOpen className="mr-2" />
                    View Details
                  </Link>

                  {book.bookPdfUrl && (
                    <a
                      href={book.bookPdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-secondary-color text-white hover:bg-secondary-dark rounded-lg transition-colors"
                    >
                      Read Now
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default FeaturedBooks;
