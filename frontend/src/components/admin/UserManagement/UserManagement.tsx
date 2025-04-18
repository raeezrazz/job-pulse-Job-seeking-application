
import { useTable } from "react-table";
import axios from "axios";
import React, { useState, useEffect, useMemo } from "react";


function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()} className="min-w-full border border-gray-300">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-200">
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} className="p-2 border border-gray-300 text-left font-semibold">
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} className="hover:bg-gray-100">
              {row.cells.map(cell => (
                <td {...cell.getCellProps()} className="p-2 border border-gray-300">
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const UserManagement = ({ users, loading }) => {
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState([]);

  const columns = useMemo(() => [
  {
    Header: "User Details",
    columns: [
      { Header: "No.", accessor: "no" }, // Serial number
      { Header: "Name", accessor: "name" }, // User's name
      { Header: "Joined Date", accessor: "joinedDate" }, // Date user joined
      { Header: "Email", accessor: "email" }, // User's email
      { Header: "Phone", accessor: "phone" }, // User's phone number
      { 
        Header: "Profile Picture", 
        accessor: "dp", // Profile picture (display image)
        Cell: ({ value }) => <img src={value} alt="DP" className="w-8 h-8 rounded-full" /> 
      }, 
      {
        Header: "Action",
        accessor: "action", // Placeholder for actions
        Cell: ({ row }) => (
          <div>
            <button
              onClick={() => handleEdit(row.original)}
              className="text-blue-500 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(row.original)}
              className="ml-2 text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        )
      }
    ]
  }
], []);


  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/user");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingData(false);
      }
    };

    if (loadingData) {
      getData();
    }
  }, [loadingData]);

  
    if (loading) {
      return <div>Loading users...</div>; // Display loading state
    }
  
    return (
      <div className="bg-white shadow-md rounded-lg p-4">
      <div className="mb-4 flex justify-between">
        <h2 className="text-xl font-semibold text-gray-700">User Management</h2>
        {/* You can add other actions or buttons here if needed */}
      </div>
      {/* <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="border border-gray-300 p-3 text-left font-medium">No.</th>
            <th className="border border-gray-300 p-3 text-left font-medium">Name</th>
            <th className="border border-gray-300 p-3 text-left font-medium">Email</th>
            <th className="border border-gray-300 p-3 text-left font-medium">Phone</th>
            <th className="border border-gray-300 p-3 text-left font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className="hover:bg-blue-50 transition-colors duration-200">
              <td className="border border-gray-300 p-3 text-gray-700">{index + 1}</td>
              <td className="border border-gray-300 p-3 text-gray-700">{user.name}</td>
              <td className="border border-gray-300 p-3 text-gray-700">{user.email}</td>
              <td className="border border-gray-300 p-3 text-gray-700">{user.phone}</td>
              <td className="border border-gray-300 p-3 text-gray-700">
                <button className="bg-red-500 text-white rounded px-3 py-1 hover:bg-red-600 transition duration-200">
                  Block
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
        {loadingData ? (
        <p>Loading...</p>
      ) : (
        <Table columns={columns} data={data} />
      )}
    </div>
    
    );
  };

export default UserManagement
