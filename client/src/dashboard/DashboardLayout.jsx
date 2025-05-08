import Sidebar from './SidebarBook';
import React, { useContext } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contects/AuthProvider';
import { Spinner } from 'flowbite-react';

function DashboardLayout() {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile sidebar - shown on small screens */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t">
        <div className="flex justify-around py-2">
          <Link to="/admin/dashboard" className="flex flex-col items-center text-xs">
            <span className="p-1 rounded-full bg-blue-100 text-blue-600 mb-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </span>
            Dashboard
          </Link>
          <Link to="/admin/dashboard/upload" className="flex flex-col items-center text-xs">
            <span className="p-1 rounded-full bg-blue-100 text-blue-600 mb-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </span>
            Upload
          </Link>
          <Link to="/admin/dashboard/manage" className="flex flex-col items-center text-xs">
            <span className="p-1 rounded-full bg-blue-100 text-blue-600 mb-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </span>
            Books
          </Link>
          <Link to="/admin/dashboard/users" className="flex flex-col items-center text-xs">
            <span className="p-1 rounded-full bg-blue-100 text-blue-600 mb-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
            Users
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto pb-16 md:pb-0">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;