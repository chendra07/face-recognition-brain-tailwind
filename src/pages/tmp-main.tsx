import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components";

export default function TmpMain() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow-0">
        <Header />
      </div>
      <div className="flex justify-center">
        <div className="flex-grow scr-1400-more: max-w-[1400px]">
          <div className="flex-1 py-4 px-12 bg-slate-100">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
