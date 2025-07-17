import React, { use, useState } from 'react';
import { User, Mail, Calendar, Search, Filter, Plus, Edit, Trash2, Eye, Users, Shield, Crown, X, ChevronRight } from 'lucide-react';
import { useGetUserListQuery } from '../../redux/features/user/userApiSlice';
import {useDeleteUserMutation} from '../../redux/features/user/userApiSlice';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const { data, error, isLoading } = useGetUserListQuery();
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {   
      try {
        await deleteUser(userId).unwrap();
        setSelectedUser(null); // Deselect user after deletion
      } catch (err) {
        console.error('Failed to delete user:', err);
        alert('Failed to delete user. Please try again.');
      }
    }
  };


  const usersData = data?.data ?? [];

  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-red-50 text-red-700 border-red-200';
      case 'moderator': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'user': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return <Crown size={14} className="text-red-600" />;
      case 'moderator': return <Shield size={14} className="text-blue-600" />;
      case 'user': return <User size={14} className="text-green-600" />;
      default: return <User size={14} className="text-gray-600" />;
    }
  };

  if (isLoading) return <p className="p-8 text-center text-gray-600">Loading users...</p>;
  if (error) return <p className="p-8 text-center text-red-600">Error loading users.</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
              <p className="mt-1 text-sm text-gray-600">Manage and monitor user accounts</p>
            </div>
            <button
              onClick={() => console.log('Navigate to create user')}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2 font-medium"
            >
              <Plus size={16} />
              <span>Add User</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Users size={20} className="text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Users</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{usersData?.length || 0}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                <Crown size={20} className="text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Admins</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{(usersData?.filter(u => u.role === 'admin').length) || 0}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Shield size={20} className="text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Moderators</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{(usersData?.filter(u => u.role === 'moderator').length) || 0}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <User size={20} className="text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Users</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{(usersData?.filter(u => u.role === 'user').length) || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="flex items-center space-x-3">
              <Filter size={16} className="text-gray-500" />
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors min-w-32"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>
        </div>

        {/* User Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {usersData && usersData?.map((user) => (
                  <tr
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className={`cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedUser?.id === user.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-mono text-gray-900">#{user.id.toString().padStart(3, '0')}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-semibold text-gray-700">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Mail size={16} className="text-gray-400 mr-3" />
                        <span className="text-sm text-gray-900">{user.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role.name)}`}>
                        <span className="mr-1.5">{getRoleIcon(user.role.name)}</span>
                        {user.role.name.charAt(0).toUpperCase() + user.role.name.slice(1)}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar size={16} className="text-gray-400 mr-3" />
                        <span className="text-sm text-gray-900">{formatDate(user.created_at)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <Link to={`/admin/user-profile/${user.id}`} className="text-gray-600 hover:text-blue-600 p-1.5 rounded-md hover:bg-blue-50 transition-colors">
                          <Eye size={16} />
                        </Link>
                        <button className="text-gray-600 hover:text-green-600 p-1.5 rounded-md hover:bg-green-50 transition-colors">
                          <Edit size={16} />
                        </button>
                        <button onClick={handleDelete} className="text-gray-600 hover:text-red-600 p-1.5 rounded-md hover:bg-red-50 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected User Details */}
        {selectedUser && (
          <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">User Details</h2>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">ID</label>
                <p className="text-lg font-semibold text-gray-900">#{selectedUser.id.toString().padStart(3, '0')}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Name</label>
                <p className="text-lg font-semibold text-gray-900">{selectedUser.name}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Email</label>
                <p className="text-lg font-semibold text-gray-900">{selectedUser.email}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Role</label>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(selectedUser.role)}`}>
                  <span className="mr-1.5">{getRoleIcon(selectedUser.role)}</span>
                  {/* {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)} */}
                </span>
              </div>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Created</label>
                <p className="text-lg font-semibold text-gray-900">{formatDate(selectedUser.created_at)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;