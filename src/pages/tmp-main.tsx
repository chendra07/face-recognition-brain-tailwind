import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { Outlet } from "react-router-dom";
import { Header } from "../components";
import { jwtDecoder } from "../utils/jwtDecoder";
import { deleteUser } from "../redux/slices/user.slice";

export default function TmpMain() {
  const userProfile = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userProfile) {
      navigate("/auth");
      return;
    }

    const { exp } = jwtDecoder(userProfile.token);
    const date = new Date();
    const currentDate = parseInt((date.getTime() / 1000).toFixed(0));

    if (currentDate >= exp) {
      dispatch(deleteUser());
    }
  }, []);

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
