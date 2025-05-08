import React from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { HiOutlineArrowLeft, HiOutlineDocumentDownload, HiOutlineBookOpen } from 'react-icons/hi';

function SingleBook() {
  const { _id, bookTitle, author, imageUrl, bookCategory, bookDescription, bookPdfUrl } = useLoaderData();

  return (
    <div className='mt-28 px-4 lg:px-24 mb-16'>
      <div className="container mx-auto">
        {/* Back button */}
        <Link to="/shop" className="inline-flex items-center mb-6 text-blue-600 hover:underline">
          <HiOutlineArrowLeft className="mr-2" /> Back to Books
        </Link>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Book image */}
          <div className="md:w-1/3">
            <img
              src={imageUrl}
              alt={bookTitle}
              className='w-full rounded-lg shadow-lg object-cover'
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/400x600?text=No+Image";
              }}
            />
          </div>

          {/* Book details */}
          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{bookTitle}</h1>
            <p className="text-xl text-gray-700 mb-4">By {author}</p>

            <div className="mb-6">
              <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
                {bookCategory}
              </span>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-700 whitespace-pre-line">{bookDescription}</p>
            </div>

            {bookPdfUrl && (
              <div className="mt-8">
                <a
                  href={bookPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  <HiOutlineDocumentDownload className="mr-2 w-5 h-5" />
                  Download PDF
                </a>

                <a
                  href={bookPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-5 py-2.5 ml-4 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200"
                >
                  <HiOutlineBookOpen className="mr-2 w-5 h-5" />
                  Read Online
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleBook;