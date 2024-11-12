import React from 'react'

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

export default UserManagement
