"use client";
import { HeroUIProvider } from "@heroui/system";
// import {NextUIProvider} from '@nextui-org/react'
import Navbar from "../component/cashier/Navbar";
import Sidebar from "../component/cashier/Sidebar";
import { protectRoute } from "@/middleware/authMiddleware";

export default function Layout({ children }: { children: React.ReactNode }) {
  protectRoute();

  return (
    <HeroUIProvider>
      <div className=" bg-slate-200">
        <div className="w-full h-[60px] bg-blue-500 fixed top-0 z-50">
          <Navbar />
        </div>
        <div className="h-[100vh] pt-[60px]">
          <div className="flex w-full h-full gap-5">
            <div className=" bg-blue-950 w-[60px] h-full">
              <Sidebar />
            </div>
            <div className=" w-full">{children}</div>
          </div>
        </div>
      </div>
    </HeroUIProvider>
  );
}
