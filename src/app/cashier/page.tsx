"use client";
import React from "react";
import SelectCart from "../component/cashier/SelectCart";
import dynamic from "next/dynamic";
import { CartProvider } from "../lib/cartRetailContext";
import Invoice from "../component/cashier/Invoice";
import FindProduct from "../component/cashier/FindProduct";

const page = () => {
  return (
    <CartProvider>
      <div className=" pt-5">
        <div className="  flex gap-5">
          <div className=" w-[730px] inline-block">
            <Invoice />
          </div>
          <div className=" w-[700px] inline-block">
            <SelectCart />
            <FindProduct />
          </div>
        </div>
      </div>
    </CartProvider>
  );
};

export default page;
