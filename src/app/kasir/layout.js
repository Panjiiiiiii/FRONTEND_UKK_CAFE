"use client";

import React from "react";
import {
  FaClock,
  FaShoppingCart,
  FaStore,
} from "react-icons/fa";
import SideNavbar from "@/components/Navbar"; // Path sesuai dengan struktur proyek Anda

function KasirLayout({ children }) {
  const navItems = [
    { label: "Order", href: "/kasir", icon: FaStore },
    { label: "Cart", href: "/kasir/cart", icon: FaShoppingCart },
    { label: "History", href: "/kasir/history", icon: FaClock },
  ];

  return <SideNavbar title="Kasir" navItems={navItems}>{children}</SideNavbar>;
}

export default KasirLayout;
