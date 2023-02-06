import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { Outlet } from "react-router-dom";
import { Header } from "../components";
import { deleteUser } from "../redux/slices/user.slice";

export default function TmpMain() {
  const currentUser = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      navigate("/auth");
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow-0">
        <Header />
      </div>
      <div className="flex justify-center">
        <div className="flex-grow scr-1400-more: max-w-[1400px]">
          <div className="flex-1 py-4 px-12">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
