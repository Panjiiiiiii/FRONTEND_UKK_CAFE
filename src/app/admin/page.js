"use client";
import React, { useEffect, useState } from "react";
import { IoFastFoodOutline } from "react-icons/io5";
import { IoMdPerson } from "react-icons/io";
import { MdTableRestaurant } from "react-icons/md";
import { getLocalStorage } from "@/lib/localStorage";
import "../global.css";
import axios from "axios";

const Dashboard = () => {
  const dataUser = getLocalStorage(`data_user`);
  const token = JSON.parse(dataUser).token;
  const [user, setUser] = useState([]);
  const [menu, setMenu] = useState([]);
  const [meja, setMeja] = useState([]);

  const getUser = async () => {
    try {
      const urlUser = "http://localhost:4000/user/";
      const user = await axios.get(urlUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const response = user.data.data;
      if (response) {
        setUser(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMenu = async () => {
    try {
      const urlMenu = "http://localhost:4000/menu/";
      const menu = await axios.get(urlMenu, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const response = menu.data.data;
      if (response) {
        setMenu(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTable = async () => {
    try {
      const urlTable = "http://localhost:4000/meja/";
      const meja = await axios.get(urlTable, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const response = meja.data.data;
      if (response) {
        setMeja(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTable();
    getMenu();
    getUser();
  }, [token]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <main className="w-full max-w-6xl text-center bg-white p-10 rounded-3xl shadow-2xl">
        <h1 className="text-4xl font-bold mb-5 text-gray-800">Dashboard</h1>
        <h1 className="text-2xl font-semibold mb-10 text-gray-800">Live data Admin</h1>
        <div className="flex flex-wrap justify-center gap-5">
          <div className="w-full md:w-1/2 lg:w-1/3 bg-yellow-900 p-6 rounded-xl shadow-lg text-white flex items-center">
            <IoMdPerson className="text-8xl m-3" />
            <div className="p-10 text-left">
              <h3 className="text-2xl font-light mb-3">Jumlah User</h3>
              <h1 className="text-4xl font-bold">{user.length}</h1>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 bg-yellow-700 p-6 rounded-xl shadow-lg text-white flex items-center">
            <MdTableRestaurant className="text-8xl m-3" />
            <div className="p-10 text-left">
              <h3 className="text-2xl font-light mb-3">Jumlah Meja</h3>
              <h1 className="text-4xl font-bold">{meja.length}</h1>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 bg-yellow-600 p-6 rounded-xl shadow-lg text-white flex items-center">
            <IoFastFoodOutline className="text-8xl m-3" />
            <div className="p-10 text-left">
              <h3 className="text-2xl font-light mb-3">Jumlah Menu</h3>
              <h1 className="text-4xl font-bold">{menu.length}</h1>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
