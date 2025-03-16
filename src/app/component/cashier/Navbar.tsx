"use client";
import React from "react";
import useAuthStore from "@/stores/authStores";
import { redirect } from "next/navigation";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const handleLogout = () => {
    logout();
    redirect("/login");
  };
  return (
    <div className=" h-full flex items-center justify-between ps-5 pe-20">
      <div className="">
        <h1 className=" text-white text-[20px] font-bold">POS Latda Shop</h1>
        <h1 className=" text-white text-[12px] font-bold">
          Power by SKV-GROUP
        </h1>
      </div>
      <div>
        <button
          onClick={handleLogout}
          className="bg-red-50 bg-opacity-50 text-white rounded-md px-3 py-1"
        >
          Logout
        </button>
      </div>
      <div className="flex gap-2 items-center text-gray-50 font-semibold uppercase">
        <p className="text-sm text-gray-200 lowercase">hello! </p>
        <p>{user?.username}</p>
        <p className="bg-gray-100 bg-opacity-50 px-3 rounded-sm">
          {user?.name}
        </p>
      </div>
    </div>
  );
};

export default Navbar;
