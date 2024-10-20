"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getLocalStorage } from "@/lib/localStorage";
import { AiFillDelete } from "react-icons/ai";
import { HiOutlineUserAdd } from "react-icons/hi";
import Modal from "@/components/ModalUser";
import { CiEdit } from "react-icons/ci";
import Pagination from "@/components/Pagination"; // import pagination component
import toast, { Toaster } from "react-hot-toast"; // Import toast

const UserPage = () => {
  const dataUser = getLocalStorage(`data_user`);
  const token = JSON.parse(dataUser).token;
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Set number of users per page

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getUsers = async () => {
    try {
      const urlUser = "http://localhost:4000/user/";
      const response = await axios.get(urlUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Gagal memuat data pengguna."); // Toast on error
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const urlDelete = `http://localhost:4000/user/drop/${id}`;
      await axios.delete(urlDelete, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Hapus user dari state tanpa refresh
      setUsers(users.filter((user) => user.id_user !== id));
      toast.success("Pengguna berhasil dihapus!"); // Toast on successful delete
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus pengguna."); // Toast on error
    }
  };

  const handleAddOrEditUser = async (user) => {
    try {
      if (isEditMode) {
        // Update user
        const urlUpdate = `http://localhost:4000/user/update/${user.id_user}`;
        await axios.put(urlUpdate, user, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Update user in state and move to the top
        setUsers((prevUsers) => {
          const updatedUsers = prevUsers.map((u) =>
            u.id_user === user.id_user ? user : u
          );
          return [user, ...updatedUsers.filter((u) => u.id_user !== user.id_user)];
        });
        toast.success("Pengguna berhasil diperbarui!"); // Toast on successful edit
      } else {
        // Add new user
        const urlAdd = "http://localhost:4000/user/add";
        const response = await axios.post(urlAdd, user, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Add new user at the top of the state
        setUsers((prevUsers) => [response.data.data, ...prevUsers]);
        toast.success("Pengguna berhasil ditambahkan!"); // Toast on successful add
      }
      setShowModal(false);
    } catch (error) {
      console.error(error);
      toast.error("Gagal menyimpan data pengguna."); // Toast on error
    }
  };
  

  const openEditModal = (user) => {
    setSelectedUser(user);
    setIsEditMode(true);
    setShowModal(true);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Toaster position="top-center" reverseOrder={false} />
      <main className="w-full max-w-6xl text-center bg-white p-5 rounded-3xl shadow-2xl flex flex-col">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-800">User Page</h1>
        <div className="mt-5 flex justify-end">
          <button
            onClick={() => {
              setSelectedUser(null);
              setIsEditMode(false);
              setShowModal(true);
            }}
            className="flex items-center bg-green-700 hover:bg-green-800 text-white text-md p-3 rounded-md font-bold transition-colors"
          >
            <HiOutlineUserAdd className="mr-2" />
            Add User
          </button>
          {showModal && (
            <Modal
              onClose={() => setShowModal(false)}
              user={selectedUser}
              isEdit={isEditMode}
              onSave={handleAddOrEditUser}  // Pass function to handle save
            />
          )}
        </div>

        {/* Wrapper for responsive table */}
        <div className="overflow-x-auto mt-8 flex-grow">
          <table className="w-full bg-gray-100 shadow-lg rounded-xl border-separate border-spacing-y-2 border-spacing-x-0">
            <thead>
              <tr className="bg-yellow-900 text-white text-sm md:text-[20px] leading-normal rounded-t-xl">
                <th className="py-3 px-2 md:px-6 text-center">ID</th>
                <th className="py-3 px-2 md:px-6 text-center">Nama User</th>
                <th className="py-3 px-2 md:px-6 text-center">Username</th>
                <th className="py-3 px-2 md:px-6 text-center">Email</th>
                <th className="py-3 px-2 md:px-6 text-center">Role</th>
                <th className="py-3 px-2 md:px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-[14px] md:text-[16px] font-semibold">
              {currentUsers.map((item) => (
                <tr
                  key={item.id_user}
                  className="bg-white hover:bg-gray-200 border-b border-gray-200 transition-all"
                >
                  <td className="py-3 px-2 md:px-6 text-center">{item.id_user}</td>
                  <td className="py-3 px-2 md:px-6 text-center">{item.nama_user}</td>
                  <td className="py-3 px-2 md:px-6 text-center">{item.username}</td>
                  <td className="py-3 px-2 md:px-6 text-center">{item.email}</td>
                  <td className="py-3 px-2 md:px-6 text-center">{item.role}</td>
                  <td className="py-3 px-2 md:px-6 text-center flex justify-center gap-2 md:gap-3">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded transition-colors"
                      onClick={() => openEditModal(item)}
                    >
                      <CiEdit />
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded transition-colors"
                      onClick={() => handleDeleteUser(item.id_user)}
                    >
                      <AiFillDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          ordersPerPage={usersPerPage}
          totalOrders={users.length}
          paginate={paginate}
          currentPage={currentPage} // Pass current page for pagination
        />
      </main>
    </div>
  );
};

export default UserPage;
