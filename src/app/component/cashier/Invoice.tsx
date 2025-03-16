"use client";
import { Button, Input } from "@heroui/react";
import { TiDeleteOutline } from "react-icons/ti";
import React from "react";
import { useCart } from "@/app/lib/cartRetailContext";

const Invoice = () => {
  const { cart, total, clearCart } = useCart();
  return (
    <div>
      <div className=" w-full p-2 border border-black rounded-lg shadow-lg h-[74vh] bg-white">
        <div className="w-full h-[52vh] overflow-y-scroll mb-2">
          <table className="w-full relative">
            <thead className=" sticky top-0">
              <tr className="bg-green-200  w-full">
                <th className=" py-1 "></th>
                <th className=" py-1 ">ຊື່ສິນຄ້າ</th>
                <th className=" py-1">ຈຳນວນ</th>
                <th className=" py-1">ໜ່ວຍ</th>
                <th className=" py-1">ລາຄາ</th>
                <th className=" py-1">ລວມ</th>
                <th className=" py-1">ລຶບ</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.barcode}</td>
                  </tr>
                );
              })}
              {/* {Array(10).fill(10).map((_, index) => {
                                return (
                                    <tr key={index} className='border-b border-gray-300 hover:bg-blue-100 ease-in-out duration-100'>
                                        <td className='py-2'>
                                            {index + 1}.
                                        </td>
                                        <td className=' w-[400px]'>
                                            ຢາງນອກໜ້າM9540 12.4-24.PR16 ຕາຊ້າງຫວຽດ
                                        </td>
                                        <td>
                                            <input type='number' min={1} defaultValue='1' className='w-10' />
                                        </td>
                                        <td className='text-center'>
                                            ອັນ
                                        </td>
                                        <td className='text-right'>
                                            100,000
                                        </td>
                                        <td className='text-right pe-3'>
                                            100,000
                                        </td>
                                        <td className='text-right'>
                                            <div className='flex justify-center items-center'>
                                                <TiDeleteOutline
                                                    size={20}
                                                    color='red'
                                                    className='cursor-pointer' />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })} */}
            </tbody>
          </table>
        </div>
        <div className="w-full flex justify-between px-2 bg-blue-100 border-b border-gray-300">
          <p>ລວມ</p>
          <p className=" text-[20px] font-bold">1.000.000 ກີບ</p>
        </div>
        <div className="w-full flex justify-between px-2 bg-blue-100">
          <p>ສ່ວນຫຼຸດ</p>
          <p className=" text-[20px] font-bold text-red-600">20%</p>
        </div>
        <div className="w-full flex justify-between items-center p-2 bg-green-200">
          <p className=" text-[30px] font-bold">ລວມເງິນຕ້ອງຈ່າຍ</p>
          <p className=" text-[30px] font-bold">
            <span className="text-red-500">900.000</span> ກີບ
          </p>
        </div>
      </div>
      <div className="mt-3 flex justify-between">
        <Button className="w-[300px] h-[80px] bg-red-500 text-gray-100">
          <p className="text-[40px] font-bold">ເຄຍກະຕ່າ</p>
        </Button>

        <Button color="primary" className="w-[300px] h-[80px]">
          <p className=" text-[40px] font-bold text-gray-100">ຂາຍ</p>
        </Button>
      </div>
    </div>
  );
};
export default Invoice;
