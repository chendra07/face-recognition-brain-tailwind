import React, { useState } from "react";
import { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { icons, brainSmall } from "../assets";
import Button from "./button";
import LinkBtn from "./linkBtn";
import { deleteUser } from "../redux/slices/user.slice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import clsx from "clsx";

export default function Header() {
  const currentUser = useSelector((state: RootState) => state.user);
  const [isMenuActive, setisMenuActive] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div
      className={clsx(
        "flex pl-12 min-h-[60px]",
        "scr-600-less:pl-4",
        "bg-gray-300 text-slate-500",
        "dark:bg-slate-700 dark:text-gray-200"
      )}
    >
      <div className="flex items-center mr-auto">
        <Link
          to={"/resource/home"}
          className={clsx(
            "text-2xl opacity-80 transition-all font-bold flex",
            "hover:text-slate-700 hover:dark:opacity-100",
            "dark:hover:text-gray-100"
          )}
        >
          Smart Brain V2
        </Link>
      </div>
      <div className="flex scr-700-less:hidden">
        <LinkBtn.HoverBg to="/resource/settings">
          <div className="flex items-center justify-center">
            <img
              src={currentUser?.image || icons.person}
              alt="profile"
              className="rounded-full w-[3.5rem] h-[3.5rem] object-cover bg-white mr-4"
            />
            <p>{currentUser?.name || "undefined"}</p>
          </div>
        </LinkBtn.HoverBg>

        <LinkBtn.HoverBg to="/resource/history">
          <div className="flex items-center justify-center">
            <span className="material-icons mr-2">history</span>
            <p>History</p>
          </div>
        </LinkBtn.HoverBg>

        <Button.HoverBg
          action={() => {
            dispatch(deleteUser());
            toast.success("successfully logout");
            navigate("/auth", { replace: true });
          }}
        >
          <div className="flex items-center justify-center">
            <span className="material-icons mr-2">logout</span>
            <p>Logout</p>
          </div>
        </Button.HoverBg>
      </div>
      <div className="hidden relative scr-700-less:flex">
        <div className="flex items-center justify-center">
          <Button.HoverBg
            className="h-full"
            action={() => setisMenuActive((prev) => !prev)}
          >
            <span className="material-icons scale-125">
              {isMenuActive ? "close" : "menu"}
            </span>
          </Button.HoverBg>
        </div>

        <div
          className={clsx(
            isMenuActive ? "flex" : "hidden",
            "absolute top-[60px] right-0 z-[1] rounded-bl-2xl shadow-xl",
            "w-[15rem] min-h-[5rem] pt-4 flex-col items-center",
            "dark:shadow-none",
            "dark:bg-slate-400 bg-gray-200 shadow-gray-500"
          )}
        >
          <img
            src={currentUser?.image || icons.person}
            alt="profile"
            className="rounded-full w-[6rem] h-[6rem] mb-2 object-cover bg-white mr-4"
          />
          <LinkBtn.HoverBg className="w-full mb-2" to="/resource/settings">
            <p>{currentUser?.name || "Undefined"}</p>
          </LinkBtn.HoverBg>
          <LinkBtn.HoverBg className="w-full" to="/resource/settings">
            <div className="flex items-center justify-center p-2">
              <span className="material-icons mr-2">history</span>
              <p>History</p>
            </div>
          </LinkBtn.HoverBg>
          <Button.HoverBg
            className="w-full"
            action={() => {
              dispatch(deleteUser());
              toast.success("successfully logout");
              navigate("/auth", { replace: true });
            }}
          >
            <div className="flex items-center justify-center p-2">
              <span className="material-icons mr-2">logout</span>
              <p>logout</p>
            </div>
          </Button.HoverBg>
        </div>
        <div
          onClick={() => setisMenuActive(false)}
          className={clsx(
            isMenuActive ? "flex" : "hidden",
            "absolute top-0 right-0 z-0",
            "w-screen h-screen",
            "bg-transparent p-4 flex-col"
          )}
        ></div>
      </div>
    </div>
  );
}
