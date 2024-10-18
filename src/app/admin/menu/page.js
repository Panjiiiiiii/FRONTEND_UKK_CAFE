"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getLocalStorage } from "@/lib/localStorage";
import { IoFastFoodOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { AiFillDelete } from "react-icons/ai";
import Modal from "@/components/ModalMenu";
import { Toaster, toast } from "react-hot-toast"; // Import toast
import Pagination from "@/components/Pagination"; // Import Pagination component

const MenuPage = () => {
  const dataUser = getLocalStorage(`data_user`);
  const token = JSON.parse(dataUser).token;
  const [menus, setMenus] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5); // Set number of orders per page

  // Function to fetch menu data
  const getMenu = async () => {
    try {
      const urlMenu = "http://localhost:4000/menu/";
      const response = await axios.get(urlMenu, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMenus(response.data.data); // Set the menu data
      toast.success("Menu data loaded successfully!"); // Toast on successful load
    } catch (error) {
      console.error(error);
      toast.error("Failed to load menu data."); // Toast on error
    }
  };

  // Function to handle menu deletion
  const handleDeleteMenu = async (id) => {
    try {
      const urlDelete = `http://localhost:4000/menu/drop/${id}`;
      await axios.delete(urlDelete, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Update the menu list after deletion
      setMenus(menus.filter((menu) => menu.id_menu !== id));
      toast.success("Menu deleted successfully!"); // Toast on successful delete
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete menu."); // Toast on error
    }
  };

  // Function to open modal for editing
  const openEditModal = (menu) => {
    setSelectedMenu(menu);
    setIsEditMode(true);
    setShowModal(true);
  };

  // Pagination function
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Fetch menu data when component mounts
  useEffect(() => {
    getMenu();
  }, []);

  // Get current orders for the current page
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = menus.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Toaster /> 
      <main className="w-full max-w-6xl text-center bg-white p-10 rounded-3xl shadow-2xl flex flex-col">
        <h1 className="text-5xl font-bold mb-10 text-gray-800">Menu Page</h1>
        <div className="mt-5 flex justify-end">
          <button
            onClick={() => {
              setShowModal(true);
              setIsEditMode(false);
              setSelectedMenu(null);
            }}
            className="flex items-center bg-green-900 text-white text-md p-3 rounded-md font-bold"
          >
            <IoFastFoodOutline className="mr-3" />
            Add Menu
          </button>
          {showModal && (
            <Modal
              onClose={() => setShowModal(false)}
              menu={selectedMenu}
              isEdit={isEditMode}
            />
          )}
        </div>

        {/* Wrapper for the table */}
        <div className="flex-grow mt-5">
          <div className="max-h-[400px] overflow-y-auto"> {/* Adjusted height for table */}
            <table className="w-full border-separate">
              <thead>
                <tr className="bg-yellow-900 text-white text-[20px] leading-normal">
                  <th className="py-3 px-6 text-center">ID</th>
                  <th className="py-3 px-6 text-center">Menu Photo</th>
                  <th className="py-3 px-6 text-center">Menu Name</th>
                  <th className="py-3 px-6 text-center">Type</th>
                  <th className="py-3 px-6 text-center">Description</th>
                  <th className="py-3 px-6 text-center">Price</th>
                  <th className="py-3 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-[16px] font-semibold">
                {currentOrders.map((item) => (
                  <tr
                    key={item.id_menu}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-center">{item.id_menu}</td>
                    <td className="py-3 px-6 flex justify-center items-center text-center">
                      <img
                        src={`http://localhost:4000/menu/image/${item.gambar}`}
                        alt={item.nama_menu}
                        className="object-fill w-[50px] h-[50px] block"
                      />
                    </td>
                    <td className="py-3 px-6 text-center">{item.nama_menu}</td>
                    <td className="py-3 px-6 text-center">{item.jenis}</td>
                    <td className="py-3 px-6 text-center">{item.deskripsi}</td>
                    <td className="py-3 px-6 text-center">{item.harga}</td>
                    <td className="py-3 px-6 text-center flex justify-center gap-3">
                      <button 
                        className="bg-blue-900 text-white py-1 px-3 rounded hover:bg-blue-700"
                        onClick={() => openEditModal(item)}
                      >
                        <CiEdit />
                      </button>
                      <button
                        className="bg-red-900 text-white py-1 px-3 rounded hover:bg-red-700"
                        onClick={() => handleDeleteMenu(item.id_menu)}
                      >
                        <AiFillDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination with Previous/Next buttons */}
        {menus.length > ordersPerPage && ( // Only show pagination if necessary
          <Pagination 
            currentPage={currentPage} // Pass the current page to Pagination component
            ordersPerPage={ordersPerPage} 
            totalOrders={menus.length} 
            paginate={paginate} 
          />
        )}
      </main>
    </div>
  );
};

export default MenuPage;
