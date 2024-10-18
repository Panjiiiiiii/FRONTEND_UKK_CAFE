"use client";

import React from "react";
import {
  MdDashboard,
  MdTableRestaurant,
  MdOutlineLogout,
} from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { IoFastFoodOutline } from "react-icons/io5";
import SideNavbar from "@/components/Navbar"; // Path sesuai dengan struktur proyek Anda

function AdminLayout({ children }) {
  const navItems = [
    { label: "Dashboard", href: "/admin", icon: MdDashboard },
    { label: "Edit User", href: "/admin/user", icon: IoMdPerson },
    { label: "Edit Table", href: "/admin/table", icon: MdTableRestaurant },
    { label: "Edit Menu", href: "/admin/menu", icon: IoFastFoodOutline },
  ];

  return <SideNavbar title="Admin" navItems={navItems}>{children}</SideNavbar>;
}

export default AdminLayout;
