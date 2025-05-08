import { Button, Label, TextInput, Select, Spinner } from 'flowbite-react';
import { useSnackbar } from 'notistack';
import React, { useState, useEffect, useContext } from 'react';
import { useLoaderData, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contects/AuthProvider';
import { HiOutlineUser, HiOutlineMail, HiOutlineKey, HiOutlineUserCircle } from 'react-icons/hi';

function EditUser() {
  const { id } = useParams();
  const userData = useLoaderData();
  const { enqueueSnackbar } = useSnackbar();
  const { authAxios } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: userData?.name || '',
    email: userData?.email || '',
    role: userData?.role || 'user'
  });
  const [error, setError] = useState('');

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle user update
  const handleUserUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Create user object for update
      const userObj = {
        name: formData.name,
        email: formData.email,
        role: formData.role
      };

      // Only include password if it's provided
      if (e.target.password.value.trim()) {
        userObj.password = e.target.password.value;
      }

      // Update user data
      await authAxios.put(`/users/${id}`, userObj);

      enqueueSnackbar("User updated successfully", { variant: 'success' });
      navigate('/admin/dashboard/users');
    } catch (error) {
      console.error("Error updating user:", error);
      setError(error.response?.data?.message || "Failed to update user");
      enqueueSnackbar("Failed to update user", { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='px-4 my-12 lg:px-24'>
      <div className="mb-8">
        <h2 className='text-3xl font-bold text-gray-800'>Edit User</h2>
        <p className="text-gray-600 mt-2">Update user information</p>
      </div>

      {/* Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        {error && (
          <div className="p-4 mb-6 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleUserUpdate} className="space-y-6">
          {/* User avatar and basic info */}
          <div className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b">
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <HiOutlineUserCircle className="w-16 h-16" />
            </div>
            <div>
              <h3 className="text-lg font-medium">{formData.name || 'User'}</h3>
              <p className="text-gray-500">{formData.email}</p>
              <span className="inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                {formData.role}
              </span>
            </div>
          </div>

          {/* Form fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <Label htmlFor="name" value="Full Name" className="mb-2 block" />
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <HiOutlineUser className="w-5 h-5 text-gray-500" />
                </div>
                <TextInput
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Full Name"
                  required
                  className="pl-10"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" value="Email Address" className="mb-2 block" />
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <HiOutlineMail className="w-5 h-5 text-gray-500" />
                </div>
                <TextInput
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Email Address"
                  required
                  className="pl-10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" value="New Password (leave blank to keep current)" className="mb-2 block" />
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <HiOutlineKey className="w-5 h-5 text-gray-500" />
                </div>
                <TextInput
                  id="password"
                  name="password"
                  type="password"
                  placeholder="New Password"
                  className="pl-10"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">Leave blank if you don't want to change the password</p>
            </div>

            {/* Role */}
            <div>
              <Label htmlFor="role" value="User Role" className="mb-2 block" />
              <Select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button
              color="light"
              onClick={() => navigate('/admin/dashboard/users')}
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
                  Updating...
                </>
              ) : (
                'Update User'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUser;