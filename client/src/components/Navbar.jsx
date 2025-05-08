import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
// react icons
import { FaBarsStaggered, FaBlog, FaXmark, FaUser } from "react-icons/fa6";
import { AuthContext } from '../contects/AuthProvider';
import { toast } from 'react-toastify';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // toggle profile menu
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  // handle logout
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // nav items
  const navItems = [
    { link: "Home", path: "/" },
    { link: "About", path: "/about" },
    { link: "Shop", path: "/shop" },
  ];

  // Add admin dashboard link if user is admin
  if (user && user.role === 'admin') {
    navItems.push({ link: "Dashboard", path: "/admin/dashboard" });
  }

  return (
    <header className='w-full bg-transparent fixed top-0 right-0 left-0 transition-all ease-in duration-300 z-50'>
      <nav className={`py-4 lg:px-24 px-4 ${isSticky ? "sticky bg-[#E3CD81FF] shadow-lg top-0 right-0 left-0" : ""}`}>
        <div className='flex justify-between items-center text-base gap-8'>

          {/* logo */}
          <Link to={"/"} className='text-2xl font-bold text-blue-700 items-center flex gap-2'>
            <FaBlog className='inline-block'/>Books
          </Link>

          {/* nav items for large devices */}
          <ul className='md:flex space-x-12 hidden'>
            {
              navItems.map(({link, path})=>
                <Link key={path} to={path} className='block text-base uppercase cursor-pointer hover:text-blue-700'>
                  {link}
                </Link>
              )
            }
          </ul>

          {/* Auth buttons and profile for lg devices */}
          <div className='hidden lg:flex items-center space-x-6'>
            {user ? (
              <div className="relative">
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    <FaUser />
                  </div>
                  <span className="font-medium">{user.name?.split(' ')[0]}</span>
                </button>

                {/* Profile dropdown menu */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Your Profile
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        to="/admin/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsProfileMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="text-gray-800 hover:text-blue-700 font-medium">
                  Login
                </Link>
                <Link to="/signup" className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors">
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* menu btn for mobile devices */}
          <div className='md:hidden'>
            <button onClick={toggleMenu} className='text-black focus:outline-none'>
              {isMenuOpen ? <FaXmark className='w-5 h-5'/> : <FaBarsStaggered className='w-5 h-5'/>}
            </button>
          </div>
        </div>

        {/* nav items for sm devices */}
        <div className={`space-y-4 px-4 mt-16 py-7 bg-blue-700 ${isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"}`}>
          {
            navItems.map(({link, path})=>
              <Link
                key={path}
                to={path}
                className='block text-white text-base uppercase cursor-pointer'
                onClick={() => setIsMenuOpen(false)}
              >
                {link}
              </Link>
            )
          }

          {/* Auth links for mobile */}
          <div className="pt-4 border-t border-blue-500">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="block text-white text-base uppercase cursor-pointer mb-3"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block text-white text-base uppercase cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-white text-base uppercase cursor-pointer mb-3"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block text-white text-base uppercase cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar