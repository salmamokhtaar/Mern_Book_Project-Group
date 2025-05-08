import React, { useState, useContext } from 'react';
import { Button, Label, TextInput, Textarea, Select, Spinner } from 'flowbite-react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contects/AuthProvider';
import { HiOutlineBookOpen, HiOutlinePhotograph, HiOutlineDocumentText, HiOutlineUser } from 'react-icons/hi';

function UploadBooks() {
  const { enqueueSnackbar } = useSnackbar();
  const { authAxios } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const bookCategories = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Programming",
    "Fantasy",
    "Horror",
    "History",
    "Self-help",
    "Business",
    "Children Books",
    "Travel",
    "Religion",
    "Art And Design"
  ];

  const [formData, setFormData] = useState({
    bookTitle: '',
    author: '',
    imageUrl: '',
    bookCategory: bookCategories[0],
    bookDescription: '',
    bookPdfUrl: ''
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Preview image
  const imagePreview = formData.imageUrl && formData.imageUrl.startsWith('http')
    ? formData.imageUrl
    : 'https://via.placeholder.com/300x400?text=Book+Cover';

  // Handle book submission
  const handleBookSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Create book object for submission
      const bookObj = {
        bookTitle: formData.bookTitle,
        author: formData.author,
        imageUrl: formData.imageUrl,
        bookCategory: formData.bookCategory,
        bookDescription: formData.bookDescription,
        bookPdfUrl: formData.bookPdfUrl
      };

      // Send data to the database
      await authAxios.post("/upload_book", bookObj);

      enqueueSnackbar("Book uploaded successfully", { variant: 'success' });

      // Reset form
      setFormData({
        bookTitle: '',
        author: '',
        imageUrl: '',
        bookCategory: bookCategories[0],
        bookDescription: '',
        bookPdfUrl: ''
      });

      // Navigate to manage books page
      navigate('/admin/dashboard/manage');
    } catch (error) {
      console.error("Error uploading book:", error);
      setError(error.response?.data?.message || "Failed to upload book");
      enqueueSnackbar("Failed to upload book", { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className='px-4 my-12 lg:px-24'>
      <div className="mb-8">
        <h2 className='text-3xl font-bold text-gray-800'>Upload A Book</h2>
        <p className="text-gray-600 mt-2">Add a new book to the collection</p>
      </div>

      {/* Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        {error && (
          <div className="p-4 mb-6 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          {/* Book preview */}
          <div className="md:w-1/3">
            <div className="sticky top-6">
              <div className="mb-6 overflow-hidden rounded-lg shadow-md">
                <img
                  src={imagePreview}
                  alt={formData.bookTitle || "Book cover"}
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/300x400?text=Image+Error";
                  }}
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-2">{formData.bookTitle || "Book Title"}</h3>
                <p className="text-gray-600 text-sm mb-2">By {formData.author || "Author"}</p>
                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                  {formData.bookCategory}
                </span>
                <div className="mt-4 text-sm text-gray-600">
                  <p className="line-clamp-4">{formData.bookDescription || "No description available"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form fields */}
          <div className="md:w-2/3">
            <form onSubmit={handleBookSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Book Title */}
                <div>
                  <Label htmlFor="bookTitle" value="Book Title" className="mb-2 block" />
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <HiOutlineBookOpen className="w-5 h-5 text-gray-500" />
                    </div>
                    <TextInput
                      id="bookTitle"
                      name="bookTitle"
                      value={formData.bookTitle}
                      onChange={handleChange}
                      type="text"
                      placeholder="Book Title"
                      required
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Author */}
                <div>
                  <Label htmlFor="author" value="Author" className="mb-2 block" />
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <HiOutlineUser className="w-5 h-5 text-gray-500" />
                    </div>
                    <TextInput
                      id="author"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      type="text"
                      placeholder="Author Name"
                      required
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <Label htmlFor="imageUrl" value="Book Cover Image URL" className="mb-2 block" />
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <HiOutlinePhotograph className="w-5 h-5 text-gray-500" />
                    </div>
                    <TextInput
                      id="imageUrl"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleChange}
                      type="text"
                      placeholder="Image URL"
                      required
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <Label htmlFor="bookCategory" value="Book Category" className="mb-2 block" />
                  <Select
                    id="bookCategory"
                    name="bookCategory"
                    value={formData.bookCategory}
                    onChange={handleChange}
                    required
                  >
                    {bookCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              {/* Book Description */}
              <div>
                <Label htmlFor="bookDescription" value="Book Description" className="mb-2 block" />
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <HiOutlineDocumentText className="w-5 h-5 text-gray-500" />
                  </div>
                  <Textarea
                    id="bookDescription"
                    name="bookDescription"
                    value={formData.bookDescription}
                    onChange={handleChange}
                    placeholder="Write your book description..."
                    required
                    rows={6}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* PDF URL */}
              <div>
                <Label htmlFor="bookPdfUrl" value="Book PDF URL" className="mb-2 block" />
                <TextInput
                  id="bookPdfUrl"
                  name="bookPdfUrl"
                  value={formData.bookPdfUrl}
                  onChange={handleChange}
                  type="text"
                  placeholder="PDF URL"
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-3 pt-6 border-t">
                <Button
                  color="light"
                  onClick={() => navigate('/admin/dashboard/manage')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  color="blue"
                >
                  {isLoading ? (
                    <>
                      <Spinner size="sm" className="mr-2" />
                      Uploading...
                    </>
                  ) : (
                    'Upload Book'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadBooks