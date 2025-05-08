import { Table, Badge, Spinner, Button } from 'flowbite-react';
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { AuthContext } from '../contects/AuthProvider';
import { HiOutlineTrash, HiOutlinePencilAlt, HiOutlineUserCircle } from 'react-icons/hi';

function Users() {
  const { enqueueSnackbar } = useSnackbar();
  const { authAxios } = useContext(AuthContext);
  const [allUsers, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users with proper dependency array to avoid infinite loop
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await authAxios.get("/users");
        setUsers(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users. Please try again.");
        enqueueSnackbar("Failed to load users", { variant: 'error' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [authAxios, enqueueSnackbar]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await authAxios.delete(`/users/${id}`);
        setUsers(allUsers.filter(user => user._id !== id));
        enqueueSnackbar("User deleted successfully", { variant: 'success' });
      } catch (error) {
        console.error("Error deleting user:", error);
        enqueueSnackbar("Failed to delete user", { variant: 'error' });
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
      <div className="flex justify-between items-center mb-8">
        <h2 className='text-3xl font-bold text-gray-800'>User Management</h2>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1.5 rounded-full">
          Total Users: {allUsers.length}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <Table className='w-full'>
          <Table.Head className="bg-gray-50">
            <Table.HeadCell className="py-3">No.</Table.HeadCell>
            <Table.HeadCell className="py-3">Name</Table.HeadCell>
            <Table.HeadCell className="py-3">Email</Table.HeadCell>
            <Table.HeadCell className="py-3">Role</Table.HeadCell>
            <Table.HeadCell className="py-3">Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {allUsers.length === 0 ? (
              <Table.Row>
                <Table.Cell colSpan={5} className="text-center py-4">
                  No users found
                </Table.Cell>
              </Table.Row>
            ) : (
              allUsers.map((user, index) => (
                <Table.Row key={user._id} className="bg-white hover:bg-gray-50">
                  <Table.Cell className="font-medium text-gray-900 whitespace-nowrap">
                    {index + 1}
                  </Table.Cell>
                  <Table.Cell className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <HiOutlineUserCircle size={20} />
                    </div>
                    <span>{user.name || "N/A"}</span>
                  </Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>
                    <Badge color={user.role === 'admin' ? 'success' : 'info'} className="px-2 py-1">
                      {user.role || "user"}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell className="flex gap-2">
                    <Link
                      to={`/admin/dashboard/users/${user._id}`}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                      title="Edit User"
                    >
                      <HiOutlinePencilAlt size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                      title="Delete User"
                    >
                      <HiOutlineTrash size={18} />
                    </button>
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

export default Users