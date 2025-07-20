import { useState, useEffect } from 'react';
import { User } from 'lucide-react';
// import { Link } from 'react-router-dom';
import {
  useUpdateUserMutation,
  useGetUserByIdQuery,
} from '../../redux/features/user/userApiSlice';
import { useParams, useNavigate } from 'react-router-dom';

export default function UserEditForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ Fetch single user by ID
  const { data: user, isLoading: isFetching } = useGetUserByIdQuery(id);
  console.log(user);
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user?.data.name,
        email: user?.data.email,
        role: user?.data.role,
      });
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.role) {
      newErrors.role = 'Role is required';
    }

    if (formData.password && formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    const updateData = {
      id,
      ...formData,
    };

    try {
      await updateUser(updateData).unwrap();
      alert('User updated successfully!');
      navigate('/admin/user-list');
    } catch (err) {
      alert('Update failed. See console for error.');
      console.error(err);
    }
  };

  if (isFetching) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto py-8 px-6 bg-white shadow-md border rounded-lg">

      <div className="flex items-center mb-6 space-x-2">
        <User className="w-5 h-5 text-gray-600" />
        <h1 className="text-xl font-semibold">Edit User</h1>
      </div>


      {/* Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      {/* Role */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Role</label>
        <select
          value={formData.role}
          onChange={(e) => handleInputChange('role', e.target.value)}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.role ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select a role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="organizer">Organizer</option>
        </select>
        {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
      </div>

    
      <button
        onClick={handleSave}
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
      >
        {isLoading ? 'Saving...' : 'Save'}
      </button>

      {isError && (
        <p className="mt-4 text-red-500 text-sm">
          Error: {error?.data?.message || 'Failed to update'}
        </p>
      )}
    </div>
  );
}
