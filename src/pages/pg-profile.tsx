import React from "react";
import { Card } from "../components";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { icons } from "../assets";
import clsx from "clsx";
import { LinkBtn, FormInput } from "../components";
import ChangeProfile from "../components/profile/changeProfile";

export default function PgProfile() {
  const currentUser = useSelector((state: RootState) => state.user);
  return (
    <div className="flex flex-wrap gap-12 justify-around min-h-[60vh]">
      <Card className="flex flex-1 flex-col items-center">
        <>
          <img
            className={clsx(
              "w-[10rem] h-[10rem] m-4 rounded-full object-cover overflow-hidden",
              "bg-white"
            )}
            src={currentUser?.image || icons.person}
            alt="image_profile"
          />
          <h1 className="text-4xl p-2 m-2 text-slate-500 dark:text-gray-200">
            {currentUser?.name || "Undefined"}
          </h1>
          <h1 className="text-4xl p-2 m-2 text-slate-500 dark:text-gray-200">
            {currentUser?.email || "Undefined"}
          </h1>
          <h1 className="text-4xl p-2 m-2 text-slate-500 dark:text-gray-200">{`User Id: ${
            currentUser?.userid || "Undefined"
          }`}</h1>

          <LinkBtn.Primary className="mt-12 mb-4" to="/resource/history">
            <div className="flex">
              <span className="material-icons mr-2">history</span>
              <p>History</p>
            </div>
          </LinkBtn.Primary>
        </>
      </Card>
      <Card className="flex-[3]">
        <ChangeProfile />
      </Card>
    </div>
  );
}
