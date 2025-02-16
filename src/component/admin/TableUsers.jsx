import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
import { getListAllUsers, changeUserStatus, changeUserRole } from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";

const TableUsers = () => {
  const token = useEcomStore((state) => state.token);
  const [users, setUsers] = useState([]);

  // Fetch users on component mount
  useEffect(() => {
    handleGetUsers(token);
  }, []);

  const handleGetUsers = (token) => {
    getListAllUsers(token)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  };

  // Handle status change
  const handleChangeUserStatus = (userId, userStatus) => {
    const value = {
      id: userId,
      enabled: !userStatus,
    };
    changeUserStatus(token, value)
      .then((res) => {
        toast.success("Update Status Success!!");
        handleGetUsers(token); // Refresh data after update
      })
      .catch((err) => console.log(err));
  };

  // Handle role change
  const handleChangeUserRole = (userId, userRole) => {
    const value = {
      id: userId,
      role: userRole,
    };
    changeUserRole(token, value)
      .then((res) => {
        toast.success("Update Role Success!!");
        handleGetUsers(token); // Refresh data after update
      })
      .catch((err) => console.log(err));
  };

  // Define table columns
  const columns = [
    {
      name: "ลำดับ",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "100px",
    },
    {
      name: "ชื่อ",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "สิทธิ์",
      cell: (row) => (
        <select
          className="bg-gray-100 border border-gray-300 rounded-md !px-2 !py-1"
          value={row.role}
          onChange={(e) => handleChangeUserRole(row.id, e.target.value)}
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      ),
    },
    {
      name: "สถานะ",
      cell: (row) => (
        <span
          className={`${
            row.enabled ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
          } !px-2 !py-1 rounded-full text-sm font-medium`}
        >
          {row.enabled ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      name: "จัดการ",
      cell: (row) => (
        <button
          className={`${
            row.enabled ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"
          } text-white !px-3 !py-1 rounded-md shadow-md`}
          onClick={() => handleChangeUserStatus(row.id, row.enabled)}
        >
          {row.enabled ? "Disable" : "Enable"}
        </button>
      ),
    },
  ];

  return (
    <div className="container !mx-auto !p-4 bg-white rounded-lg shadow-md">
 
      <DataTable
        columns={columns}
        data={users}
        pagination
        highlightOnHover
        pointerOnHover
        responsive
        customStyles={{
          headCells: {
            style: {
              fontSize: "1rem",
              fontWeight: "bold",
              backgroundColor: "#f9fafb",
            },
          },
          rows: {
            style: {
              fontSize: "0.9rem",
            },
          },
        }}
      />
    </div>
  );
};

export default TableUsers;