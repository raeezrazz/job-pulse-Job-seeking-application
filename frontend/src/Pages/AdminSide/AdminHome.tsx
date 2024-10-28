import React, { useState, useEffect } from 'react';
import { loadUsers } from '../../api/adminApi';

function AdminHome() {
  const [activePage, setActivePage] = useState('dashboard');
  const [users, setUsers] = useState([]); // Changed to an array
  const [loading, setLoading] = useState(true);

  const allUsers = async () => {
    setLoading(true);
    try {
      const userList = await loadUsers();
      console.log(userList, "here is user list");
      if (Array.isArray(userList.data.data)) {
        setUsers(userList.data.data);
        console.log("Users are an array:", userList.data.data);
      } else {
        console.error("Expected an array but received:", userList.data.data);
      }
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activePage === 'user-management') {
      allUsers();
    }
  }, [activePage]);

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'user-management':
        return <UserManagement users={users} loading={loading} />; // Pass users and loading state
      case 'package-management':
        return <PackageManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
        <h1 className="text-xl font-bold mb-6">Admin Panel</h1>
        <ul>
          <li className="mb-4">
            <button onClick={() => setActivePage('dashboard')} className="hover:text-gray-400 w-full text-left">Dashboard</button>
          </li>
          <li className="mb-4">
            <button onClick={() => setActivePage('user-management')} className="hover:text-gray-400 w-full text-left">User Management</button>
          </li>
          <li className="mb-4">
            <button onClick={() => setActivePage('package-management')} className="hover:text-gray-400 w-full text-left">Package Management</button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold">{activePage.replace('-', ' ').toUpperCase()}</h2>
        {renderContent()}
      </div>
    </div>
  );
}

const Dashboard = () => (
  <div>
    <h3 className="text-xl">Welcome to the Dashboard!</h3>
  </div>
);

const UserManagement = ({ users, loading }) => {
  if (loading) {
    return <div>Loading users...</div>; // Display loading state
  }

  return (
    <div>
      <h3 className="text-xl mb-4">User Management Section</h3>
     
      <div className="mb-4 flex justify-between">
        </div>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">No.</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Phone</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => ( // Map over users array
            <tr key={user.id}> {/* Assuming user.id is unique */}
              <td className="border border-gray-300 p-2">{index + 1}</td>
              <td className="border border-gray-300 p-2">{user.name}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">{user.phone}</td>
              <td className="border border-gray-300 p-2">
                <button className="bg-red-500 text-white rounded p-1 hover:bg-red-600 ml-2">Block</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const PackageManagement = () => (
  <div>
    <h3 className="text-xl">Package Management Section</h3>
  </div>
);

export default AdminHome;
