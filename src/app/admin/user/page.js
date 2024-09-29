"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getLocalStorage } from "@/lib/localStorage";
import { AiFillDelete } from "react-icons/ai";
import { HiOutlineUserAdd } from "react-icons/hi";
import Modal from "@/components/ModalUser";
import { CiEdit } from "react-icons/ci";

const UserPage = () => {
  const dataUser = getLocalStorage(`data_user`);
  const token = JSON.parse(dataUser).token;
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

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
      // Update the user list after deletion
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error(error);
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
    <div className="p-8">
      <main>
        <h1 className="text-5xl font-bold">User Page</h1>
        <div className="mt-5 justify-end">
          <button
            onClick={() => {
              setSelectedUser(null);
              setIsEditMode(false);
              setShowModal(true);
            }}
            className="flex items-center bg-green-900 text-white text-md p-3 rounded-md font-bold"
          >
            <HiOutlineUserAdd className="mr-3" />
            Add User
          </button>
          {showModal && (
            <Modal
              onClose={() => setShowModal(false)}
              user={selectedUser}
              isEdit={isEditMode}
            />
          )}
        </div>
        <table className="w-full mt-5 border-separate">
          <thead>
            <tr className="bg-yellow-900 text-white text-[20px] leading-normal">
              <th className="py-3 px-6 text-center">ID</th>
              <th className="py-3 px-6 text-center">Nama User</th>
              <th className="py-3 px-6 text-center">Username</th>
              <th className="py-3 px-6 text-center">Email</th>
              <th className="py-3 px-6 text-center">Role</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-[16px] font-semibold">
            {users.map((item) => (
              <tr
                key={item}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-center">{item.id_user}</td>
                <td className="py-3 px-6 text-center">{item.nama_user}</td>
                <td className="py-3 px-6 text-center">{item.username}</td>
                <td className="py-3 px-6 text-center">{item.email}</td>
                <td className="py-3 px-6 text-center">{item.role}</td>
                <td className="py-3 px-6 text-center flex gap-3">
                  <button
                    className="bg-blue-900 text-white py-1 px-3 rounded hover:bg-blue-700"
                    onClick={() => openEditModal(item)}
                  >
                    <CiEdit />
                  </button>
                  <button
                    className="bg-red-900 text-white py-1 px-3 rounded hover:bg-red-700"
                    onClick={() => handleDeleteUser(item)}
                  >
                    <AiFillDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default UserPage;
