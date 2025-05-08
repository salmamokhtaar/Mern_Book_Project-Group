import { Table, Spinner, Button, TextInput } from 'flowbite-react';
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { AuthContext } from '../contects/AuthProvider';
import { HiOutlineTrash, HiOutlinePencilAlt, HiOutlineEye, HiOutlineSearch } from 'react-icons/hi';

function ManageBooks() {
  const { enqueueSnackbar } = useSnackbar();
  const { authAxios } = useContext(AuthContext);
  const [allBooks, setAllBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  // Fetch books with proper dependency array to avoid infinite loop
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const response = await authAxios.get("/all_books");
        setAllBooks(response.data);
        setFilteredBooks(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load books. Please try again.");
        enqueueSnackbar("Failed to load books", { variant: 'error' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [authAxios, enqueueSnackbar]);

  // Filter books based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredBooks(allBooks);
    } else {
      const filtered = allBooks.filter(book =>
        book.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.bookCategory.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  }, [searchTerm, allBooks]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await authAxios.delete(`/book/${id}`);
        setAllBooks(allBooks.filter(book => book._id !== id));
        setFilteredBooks(filteredBooks.filter(book => book._id !== id));
        enqueueSnackbar("Book deleted successfully", { variant: 'success' });
      } catch (error) {
        console.error("Error deleting book:", error);
        enqueueSnackbar("Failed to delete book", { variant: 'error' });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <div className="text-red-500 text-xl mb-4">{error}</div>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className='px-4 my-12 lg:px-24'>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className='text-3xl font-bold text-gray-800'>Manage Your Books</h2>

        {/* Search input */}
        <div className="relative w-full md:w-64">
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
      </div>

      {/* Books count */}
      <div className="mb-4">
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1.5 rounded-full">
          Total Books: {allBooks.length}
        </span>
        {searchTerm && (
          <span className="ml-2 bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1.5 rounded-full">
            Search Results: {filteredBooks.length}
          </span>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <Table className='w-full'>
          <Table.Head className="bg-gray-50">
            <Table.HeadCell className="py-3">No.</Table.HeadCell>
            <Table.HeadCell className="py-3">Book Title</Table.HeadCell>
            <Table.HeadCell className="py-3">Author</Table.HeadCell>
            <Table.HeadCell className="py-3">Category</Table.HeadCell>
            <Table.HeadCell className="py-3">Price</Table.HeadCell>
            <Table.HeadCell className="py-3">Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {filteredBooks.length === 0 ? (
              <Table.Row>
                <Table.Cell colSpan={6} className="text-center py-4">
                  {searchTerm ? "No books found matching your search" : "No books found"}
                </Table.Cell>
              </Table.Row>
            ) : (
              filteredBooks.map((book, index) => (
                <Table.Row key={book._id} className="bg-white hover:bg-gray-50">
                  <Table.Cell className="font-medium text-gray-900 whitespace-nowrap">
                    {index + 1}
                  </Table.Cell>
                  <Table.Cell className="font-medium">{book.bookTitle}</Table.Cell>
                  <Table.Cell>{book.author}</Table.Cell>
                  <Table.Cell>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {book.bookCategory}
                    </span>
                  </Table.Cell>
                  <Table.Cell>$10.00</Table.Cell>
                  <Table.Cell className="flex gap-2">
                    <Link
                      to={`/admin/dashboard/edit-books/${book._id}`}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                      title="Edit Book"
                    >
                      <HiOutlinePencilAlt size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                      title="Delete Book"
                    >
                      <HiOutlineTrash size={18} />
                    </button>
                    <Link
                      to={`/book/${book._id}`}
                      className="p-2 text-green-600 hover:bg-green-100 rounded-full transition-colors"
                      title="View Book"
                    >
                      <HiOutlineEye size={18} />
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}

export default ManageBooks