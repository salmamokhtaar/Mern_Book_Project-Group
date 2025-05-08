import React, { useEffect, useState } from 'react';
import BookCards from '../components/BookCards';
import { Spinner } from 'flowbite-react';

function BestSellerBooks() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:3000/all_books");
        const data = await response.json();

        // Sort books by some criteria to determine "best sellers"
        // For now, we'll just take the first 8 books
        setBooks(data.slice(0, 8));
        setError(null);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load books");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

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
    <div>
      <BookCards
        books={books}
        headline="Best Seller Books"
        subheadline="Explore our most popular books that readers can't get enough of"
      />
    </div>
  );
}

export default BestSellerBooks;