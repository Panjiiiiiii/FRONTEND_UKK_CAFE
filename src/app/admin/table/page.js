"use client";
import React, { useState, useEffect } from "react";
import { MdTableRestaurant } from "react-icons/md";
import { getLocalStorage } from "@/lib/localStorage";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import Modal from "@/components/ModalTable";
import Pagination from "@/components/Pagination"; // Import Pagination component
import { Toaster, toast } from "react-hot-toast"; // Import toast

const TablePage = () => {
  const dataUser = getLocalStorage(`data_user`);
  const token = JSON.parse(dataUser).token;
  const [tables, setTables] = useState([]);
  const [showModal, setShowModal] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [tablesPerPage] = useState(5); // Set number of tables per page

  // Function to fetch table data
  const getTables = async () => {
    try {
      const urlTables = "http://localhost:4000/meja/";
      const response = await axios.get(urlTables, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTables(response.data.data);
      toast.success("Data meja berhasil dimuat!"); // Toast on successful load
    } catch (error) {
      console.error(error);
      toast.error("Gagal memuat data meja."); // Toast on error
    }
  };

  useEffect(() => {
    getTables();
  }, []);

  // Function to delete a table
  const deleteTables = async (id) => {
    try {
      const urlDelete = `http://localhost:4000/meja/drop/${id}`;
      await axios.delete(urlDelete, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTables(tables.filter((table) => table.id_meja !== id));
      toast.success("Meja berhasil dihapus!"); // Toast on successful delete
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus meja."); // Toast on error
    }
  };

  // Pagination logic
  const indexOfLastTable = currentPage * tablesPerPage;
  const indexOfFirstTable = indexOfLastTable - tablesPerPage;
  const currentTables = tables.slice(indexOfFirstTable, indexOfLastTable);
  const totalTables = tables.length; // Total number of tables

  // Function to handle page change (Next/Previous)
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= Math.ceil(totalTables / tablesPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Toaster />
      <main className="w-full max-w-6xl text-center bg-white p-10 rounded-3xl shadow-2xl flex flex-col">
        <h1 className="text-5xl font-bold mb-10 text-gray-800">Table Page</h1>
        <div className="mt-5 flex justify-end">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center bg-green-700 hover:bg-green-800 text-white text-md p-3 rounded-md font-bold transition-colors"
          >
            <MdTableRestaurant className="mr-3" />
            Add Table
          </button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)} />
          )}
        </div>
        
        {/* Wrapper for responsive table */}
        <div className="flex-grow overflow-x-auto mt-10">
          <div className="max-h-[300px] overflow-y-auto">
            <table className="w-full bg-gray-100 shadow-lg rounded-xl border-separate border-spacing-y-2 border-spacing-x-0">
              <thead>
                <tr className="bg-yellow-900 text-white text-[20px] leading-normal rounded-t-xl">
                  <th className="py-3 px-6 text-center">ID</th>
                  <th className="py-3 px-6 text-center">Meja</th>
                  <th className="py-3 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-[16px] font-semibold">
                {currentTables.map((item) => (
                  <tr key={item.id_meja} className="bg-white hover:bg-gray-200 border-b border-gray-200 transition-all">
                    <td className="py-3 px-6 text-center">{item.id_meja}</td>
                    <td className="py-3 px-6 text-center">{item.nomor_meja}</td>
                    <td className="py-3 px-6 text-center flex justify-center gap-3">
                      <button
                        className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded transition-colors"
                        onClick={() => deleteTables(item.id_meja)}
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
        <Pagination 
          ordersPerPage={tablesPerPage} 
          totalOrders={totalTables} 
          currentPage={currentPage} 
          paginate={paginate} 
        />
      </main>
    </div>
  );
};

export default TablePage;
