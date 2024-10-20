"use client";

import React from "react";
import { FaClock, FaShoppingCart, FaStore } from "react-icons/fa";
import SideNavbar from "@/components/Navbar"; // Path sesuai dengan struktur proyek Anda
import ProtectedRoutes from "@/lib/protectedRoutes";

function KasirLayout({ children }) {
  const navItems = [
    { label: "Order", href: "/kasir", icon: FaStore },
    { label: "Cart", href: "/kasir/cart", icon: FaShoppingCart },
    { label: "History", href: "/kasir/history", icon: FaClock },
  ];

  return (
    <ProtectedRoutes expectedRole="KASIR">
      <SideNavbar title="Kasir" navItems={navItems}>
        {children}
      </SideNavbar>
    </ProtectedRoutes>
  );
}

export default KasirLayout;
