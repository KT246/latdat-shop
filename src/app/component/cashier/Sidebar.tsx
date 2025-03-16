"use client";
import Link from "next/link";
import React from "react";
import { MdOutlinePointOfSale } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { FaFileInvoice } from "react-icons/fa";
import { Tooltip } from "@heroui/react";
import { FaRegUserCircle } from "react-icons/fa";
import { usePathname } from "next/navigation";
const Sidebar = () => {
  const path = usePathname();
  return (
    <div className="py-10 w-full overflow-hidden">
      <Tooltip content="ຂາຍຍ່ອຍ">
        <Link
          href={"#"}
          className="ps-2 py-5 flex hover:bg-blue-800 ease-in-out duration-300"
        >
          <MdOutlinePointOfSale size={40} color="white" />
        </Link>
      </Tooltip>
      <Tooltip content="ໃບບິນ">
        <Link
          href={"#"}
          className="ps-2 py-5 flex hover:bg-blue-800 ease-in-out duration-300"
        >
          <FaFileInvoice size={40} color="white" />
        </Link>
      </Tooltip>
      <Tooltip content="ລາຍງານການຂາຍ">
        <Link
          href={"#"}
          className="ps-2 py-5 flex hover:bg-blue-800 ease-in-out duration-300"
        >
          <CiViewList size={40} color="white" />
        </Link>
      </Tooltip>
      <Tooltip content="ຂໍ້ມູນສ່ວນຕົວ">
        <Link
          href={"#"}
          className="ps-2 py-5 flex hover:bg-blue-800 ease-in-out duration-300"
        >
          <FaRegUserCircle size={40} color="white" />
        </Link>
      </Tooltip>
    </div>
  );
};

export default Sidebar;
