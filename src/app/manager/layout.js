"use client";
import React from "react";
import { MdDashboard, MdTableRestaurant } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import SideNavbar from "@/components/Navbar"; // Path sesuai dengan struktur proyek Anda
import ProtectedRoutes from "@/lib/protectedRoutes";

function ManagerLayout({ children }) {
  const navItems = [
    { label: "Dashboard", href: "/manager", icon: MdDashboard },
    { label: "Cashier Recap", href: "/manager/kasir", icon: IoMdPerson },
    {
      label: "Order History",
      href: "/manager/history",
      icon: MdTableRestaurant,
    },
  ];

  return (
    <ProtectedRoutes expectedRole="MANAJER">
        <SideNavbar title="Manajer" navItems={navItems}>
          {children}
        </SideNavbar>
    </ProtectedRoutes>
  );
}

export default ManagerLayout;
