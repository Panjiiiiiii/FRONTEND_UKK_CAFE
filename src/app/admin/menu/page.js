"use client";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { getLocalStorage } from "@/lib/localStorage";
import { IoFastFoodOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { AiFillDelete } from "react-icons/ai";
import { Button } from "@headlessui/react";

const menuPage = () => {
  const dataUser = getLocalStorage(`data_user`);
  const token = JSON.parse(dataUser).token;
  const [menus, setMenus] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const getMenu = async () => {
    try {
      const urlMenu = "http://localhost:4000/menu/";
      const response = await axios.get(urlMenu, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMenus(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getMenu();
  }, []);
  return (
    <div className="p-8">
      <main>
        <h1 className="text-5xl font-bold">Menu Page</h1>
        <div className="mt-5 justify-end">
          <button
            onClick={() => {
              setShowModal(true);
              setIsEditMode(false);
              setSelectedUser(null);
            }}
            className="flex items-center bg-green-900 text-white text-md p-3 rounded-md font-bold"
          >
            <IoFastFoodOutline className="mr-3" />
            Add menu
          </button>
        </div>
        <table className="w-full mt-5 border-separate">
          <thead>
            <tr className="bg-yellow-900 text-white text-[20px] leading-normal">
              <th className="py-3 px-6 text-center">ID</th>
              <th className="py-3 px-6 text-center">Foto menu</th>
              <th className="py-3 px-6 text-center">Nama menu</th>
              <th className="py-3 px-6 text-center">Jenis</th>
              <th className="py-3 px-6 text-center">Deskripsi</th>
              <th className="py-3 px-6 text-center">Harga</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-[16px] font-semibold">
            {menus.map((item) => (
              <tr
                key={item}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-center">{item.id_menu}</td>
                <td className="py-3 px-6 flex justify-center items-center text-center"><img src={`http://localhost:4000/menu/image/${item.gambar}`} className="object-fill w-[50px] h-[50px] block"/></td>
                <td className="py-3 px-6 text-center">{item.nama_menu}</td>
                <td className="py-3 px-6 text-center">{item.jenis}</td>
                <td className="py-3 px-6 text-center">{item.deskripsi}</td>
                <td className="py-3 px-6 text-center">{item.harga}</td>
                <td className="py-3 px-6 text-center flex gap-3">
                  <button className="bg-blue-900 text-white py-1 px-3 rounded hover:bg-blue-700">
                    <CiEdit />
                  </button>
                  <button className="bg-red-900 text-white py-1 px-3 rounded hover:bg-red-700">
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

export default menuPage;
