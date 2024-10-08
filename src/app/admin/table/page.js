"use client";
import React from "react";
import { useState, useEffect } from "react";
import { MdTableRestaurant } from "react-icons/md";
import { getLocalStorage } from "@/lib/localStorage";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import Modal from "@/components/ModalTable";
const tablePage = () => {
  const dataUser = getLocalStorage(`data_user`);
  const token = JSON.parse(dataUser).token;
  const [tables, setTables] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const getTables = async () => {
    const urlTables = "http://localhost:4000/meja/";
    const response = await axios.get(urlTables, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTables(response.data.data);
  };
  useEffect(() => {
    getTables();
  }, []);

  const deleteTables = async (id) => {
    try {
      const urlDelete = `http://localhost:4000/meja/drop/${id}`;
      await axios.delete(urlDelete, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="p-8">
      <main>
        <h1 className="text-5xl font-bold">User Page</h1>
        <div className="mt-5 justify-end">
          <button onClick={() => setShowModal(true)} className="flex items-center bg-green-900 text-white text-md p-3 rounded-md font-bold">
            <MdTableRestaurant className="mr-3" />
            Add Table
          </button>
        </div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}/>
        )}
        <table className="w-full mt-5 border-separate">
          <thead>
            <tr className="bg-yellow-900 text-white text-[20px] leading-normal">
              <th className="py-3 px-6 text-center">ID</th>
              <th className="py-3 px-6 text-center">Meja</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-[16px] font-semibold">
            {tables.map((item) => (
              <tr
                key={item}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-center">{item.id_meja}</td>
                <td className="py-3 px-6 text-center">{item.nomor_meja}</td>
                <td className="py-3 px-6 text-center flex gap-3">
                  <button
                    className="bg-red-900 text-white py-1 px-3 rounded hover:bg-red-700"
                    onClick={() => deleteTables(item.id_meja)}
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

export default tablePage;
