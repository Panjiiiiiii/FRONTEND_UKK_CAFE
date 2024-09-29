"use client";
import React, { useEffect, useState } from "react";
import { IoFastFoodOutline } from "react-icons/io5";
import { IoMdPerson } from "react-icons/io";
import { MdTableRestaurant } from "react-icons/md";
import { getLocalStorage } from "@/lib/localStorage";
import "../global.css";
import axios from "axios";

const dashboard = () => {
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
    <div className="p-8">
      <main>
        <h1 className="text-5xl font-bold">Dashboard</h1>
        <div className="w-full flex flex-row mt-5 gap-5">
          <div className="w-full md:w-1/2 lg:w-1/3 bg-yellow-900 p-4 rounded-lg shadow-md text-white flex items-center">
            <IoMdPerson className="text-8xl m-3" />
            <div className="p-10">
              <h3 className="text-2xl font-thin mb-3">Jumlah user</h3>
              <h1 className="text-4xl font-bold">{user.length}</h1>
            </div>
          </div>
          <div className="bg-yellow-700 p-4 rounded-lg shadow-md text-white flex items-center w-full md:w-1/2 lg:w-1/3">
            <MdTableRestaurant className="text-8xl m-3" />
            <div className="p-10">
              <h3 className="text-2xl font-thin mb-3">Jumlah meja</h3>
              <h3 className="text-4xl font-bold">{meja.length}</h3>
            </div>
          </div>
          <div className="bg-yellow-600 p-4 rounded-lg shadow-md text-white flex items-center w-full md:w-1/2 lg:w-1/3">
            <IoFastFoodOutline className="text-8xl m-3"/>
            <div className="p-10">
              <h3 className="text-2xl font-thin mb-3">Jumlah menu</h3>
              <h1 className="text-4xl font-bold">{menu.length}</h1>
            </div>
          </div>
        </div>
        {/* show all username, email, password, role*/}
        {/* show all menu*/}
      </main>
    </div>
  );
};

export default dashboard;
