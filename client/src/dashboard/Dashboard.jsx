import React, { useEffect, useState, useContext } from 'react';
import { Card, Spinner } from 'flowbite-react';
import { AuthContext } from '../contects/AuthProvider';
import { HiOutlineUsers, HiOutlineBookOpen, HiOutlineDocumentAdd, HiOutlineChartBar } from 'react-icons/hi';
import { Link } from 'react-router-dom';

function Dashboard() {
  const { user, authAxios } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBooks: 0,
    recentBooks: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);

        // Fetch books
        const booksResponse = await authAxios.get('/all_books');

        // Fetch users
        const usersResponse = await authAxios.get('/users');

        setStats({
          totalUsers: usersResponse.data.length,
          totalBooks: booksResponse.data.length,
          recentBooks: booksResponse.data.slice(0, 5) // Get 5 most recent books
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [authAxios]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="px-4 py-8 lg:px-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name || 'Admin'}!</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <HiOutlineBookOpen className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Books</p>
              <h3 className="text-2xl font-bold">{stats.totalBooks}</h3>
            </div>
          </div>
          <Link to="/admin/dashboard/manage" className="text-blue-600 hover:underline text-sm mt-4 inline-block">
            View all books →
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <HiOutlineUsers className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
            </div>
          </div>
          <Link to="/admin/dashboard/users" className="text-blue-600 hover:underline text-sm mt-4 inline-block">
            Manage users →
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
              <HiOutlineDocumentAdd className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Add New Book</p>
              <h3 className="text-lg font-bold">Upload Book</h3>
            </div>
          </div>
          <Link to="/admin/dashboard/upload" className="text-blue-600 hover:underline text-sm mt-4 inline-block">
            Upload now →
          </Link>
        </Card>
      </div>

      {/* Recent Books */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Recent Books</h2>
          <Link to="/admin/dashboard/manage" className="text-blue-600 hover:underline text-sm">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Book Title</th>
                <th scope="col" className="px-6 py-3">Author</th>
                <th scope="col" className="px-6 py-3">Category</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentBooks.length === 0 ? (
                <tr className="bg-white border-b">
                  <td colSpan="4" className="px-6 py-4 text-center">No books found</td>
                </tr>
              ) : (
                stats.recentBooks.map((book) => (
                  <tr key={book._id} className="bg-white border-b hover:bg-gray-50">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {book.bookTitle}
                    </th>
                    <td className="px-6 py-4">{book.author}</td>
                    <td className="px-6 py-4">{book.bookCategory}</td>
                    <td className="px-6 py-4">
                      <Link to={`/admin/dashboard/edit-books/${book._id}`} className="font-medium text-blue-600 hover:underline mr-3">
                        Edit
                      </Link>
                      <Link to={`/book/${book._id}`} className="font-medium text-green-600 hover:underline">
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;