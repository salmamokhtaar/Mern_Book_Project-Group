import React, { useEffect, useState, useContext } from 'react';
import { Card, Spinner, TextInput, Select } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contects/AuthProvider';
import { HiOutlineSearch, HiOutlineBookOpen, HiOutlineUser } from 'react-icons/hi';

function Shop() {
  const { authAxios } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredBooks, setFilteredBooks] = useState([]);

  // Get all unique categories from books
  const categories = ['All', ...new Set(books.map(book => book.bookCategory))].filter(Boolean);

  // Fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:3000/all_books");
        const data = await response.json();
        setBooks(data);
        setFilteredBooks(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load books. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Filter books based on search term and category
  useEffect(() => {
    let result = [...books];

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(book => book.bookCategory === selectedCategory);
    }

    // Filter by search term
    if (searchTerm.trim() !== '') {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(book =>
        book.bookTitle.toLowerCase().includes(searchLower) ||
        book.author.toLowerCase().includes(searchLower) ||
        (book.bookDescription && book.bookDescription.toLowerCase().includes(searchLower))
      );
    }

    setFilteredBooks(result);
  }, [searchTerm, selectedCategory, books]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-28 px-4 lg:px-24 text-center">
        <div className="text-red-500 text-xl mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className='mt-28 px-4 lg:px-24 mb-16'>
      <h2 className='text-5xl font-bold text-center'>Book Collection</h2>

      {/* Search and filter */}
      <div className="my-8 flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative md:w-1/3">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <HiOutlineSearch className="w-5 h-5 text-gray-500" />
          </div>
          <TextInput
            type="search"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="md:w-1/4">
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4">
        <span className="text-gray-600">
          Showing {filteredBooks.length} of {books.length} books
        </span>
      </div>

      {/* Book grid */}
      {filteredBooks.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">No books found matching your criteria</p>
        </div>
      ) : (
        <div className='grid my-8 gap-8 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1'>
          {filteredBooks.map(book => (
            <Card key={book._id} className="hover:shadow-lg transition-shadow">
              <div className="relative h-64 overflow-hidden rounded-t-lg">
                <img
                  src={book.imageUrl}
                  alt={book.bookTitle}
                  className='w-full h-full object-cover'
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/300x400?text=No+Image";
                  }}
                />
              </div>

              <div className="flex-1">
                <h5 className="text-xl font-bold tracking-tight text-gray-900 line-clamp-1">
                  {book.bookTitle}
                </h5>

                <div className="flex items-center text-gray-700 text-sm mb-2">
                  <HiOutlineUser className="mr-1" />
                  <span>{book.author}</span>
                </div>

                <div className="mb-3">
                  <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    {book.bookCategory}
                  </span>
                </div>

                <p className="font-normal text-gray-700 mb-4 line-clamp-2">
                  {book.bookDescription || "No description available"}
                </p>
              </div>

              <div className="flex gap-2 mt-auto">
                <Link
                  to={`/book/${book._id}`}
                  className="flex-1 inline-flex justify-center items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
                >
                  <HiOutlineBookOpen className="mr-2 w-5 h-5" />
                  View Details
                </Link>

                {book.bookPdfUrl && (
                  <a
                    href={book.bookPdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
                  >
                    Read
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default Shop;