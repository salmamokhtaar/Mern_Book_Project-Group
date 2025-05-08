import { Sidebar } from 'flowbite-react';
import {
  HiChartPie,
  HiOutlineCloudUpload,
  HiInbox,
  HiUser,
  HiOutlineLogout,
  HiOutlineDocumentText,
  HiOutlineQuestionMarkCircle,
  HiOutlineHome
} from 'react-icons/hi';
import { useContext } from 'react';
import { AuthContext } from '../contects/AuthProvider';
import { useSnackbar } from 'notistack';
import { useLocation, useNavigate, Link as RouterLink } from 'react-router-dom';

function SidebarBook() {
  const { enqueueSnackbar } = useSnackbar();
  const { logout, user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  // Get current path to highlight active menu item
  const currentPath = location.pathname;

  const handleLogout = async () => {
    try {
      await logout();
      enqueueSnackbar("Logged out successfully", { variant: 'success' });
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
      enqueueSnackbar("Failed to logout", { variant: 'error' });
    }
  };

  // Function to check if a menu item is active
  const isActive = (path) => {
    if (path === '/admin/dashboard' && currentPath === '/admin/dashboard') {
      return true;
    }
    if (path !== '/admin/dashboard' && currentPath.startsWith(path)) {
      return true;
    }
    return false;
  };

  // Custom sidebar item component that uses RouterLink instead of href
  const CustomSidebarItem = ({ to, icon, active, className, children, onClick }) => {
    return (
      <li>
        <RouterLink
          to={to}
          className={`flex items-center p-2 text-base font-normal rounded-lg ${
            active ? 'bg-blue-50 text-blue-600' : 'text-gray-900 hover:bg-gray-100'
          } ${className || ''}`}
          onClick={onClick}
        >
          <span className="w-6 h-6 transition duration-75">{icon}</span>
          <span className="ml-3">{children}</span>
        </RouterLink>
      </li>
    );
  };

  return (
    <div className="h-full">
      <Sidebar aria-label="Admin dashboard sidebar" className="h-full border-r">
        <RouterLink to="/admin/dashboard" className="flex items-center gap-3 p-4 border-b">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">{user?.name || "Admin User"}</span>
            <span className="text-xs text-gray-500">{user?.role || "admin"}</span>
          </div>
        </RouterLink>

        <div className="h-full bg-white p-2">
          <ul className="space-y-2 py-2">
            <CustomSidebarItem
              to="/admin/dashboard"
              icon={<HiChartPie className="w-5 h-5" />}
              active={isActive('/admin/dashboard')}
            >
              Dashboard
            </CustomSidebarItem>

            <CustomSidebarItem
              to="/admin/dashboard/upload"
              icon={<HiOutlineCloudUpload className="w-5 h-5" />}
              active={isActive('/admin/dashboard/upload')}
            >
              Upload Book
            </CustomSidebarItem>

            <CustomSidebarItem
              to="/admin/dashboard/manage"
              icon={<HiInbox className="w-5 h-5" />}
              active={isActive('/admin/dashboard/manage')}
            >
              Manage Books
            </CustomSidebarItem>

            <CustomSidebarItem
              to="/admin/dashboard/users"
              icon={<HiUser className="w-5 h-5" />}
              active={isActive('/admin/dashboard/users')}
            >
              Users
            </CustomSidebarItem>
          </ul>

          <div className="pt-4 mt-4 border-t border-gray-200">
            <ul className="space-y-2 py-2">
              <CustomSidebarItem
                to="/"
                icon={<HiOutlineHome className="w-5 h-5" />}
              >
                Back to Home
              </CustomSidebarItem>

              <CustomSidebarItem
                to="#"
                icon={<HiOutlineDocumentText className="w-5 h-5" />}
              >
                Documentation
              </CustomSidebarItem>

              <CustomSidebarItem
                to="#"
                icon={<HiOutlineQuestionMarkCircle className="w-5 h-5" />}
              >
                Help
              </CustomSidebarItem>

              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full p-2 text-base font-normal text-red-600 rounded-lg hover:bg-red-50"
                >
                  <HiOutlineLogout className="w-5 h-5" />
                  <span className="ml-3">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </Sidebar>
    </div>
  );
}

export default SidebarBook