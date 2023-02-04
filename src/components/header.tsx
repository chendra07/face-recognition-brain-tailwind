import React from "react";
import { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkTheme } from "../redux/slices/theme.slice";
import { icons, brainSmall } from "../assets";
import { Button } from "./";

export default function Header() {
  const { isDark } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();
  return (
    <div className="flex px-12 bg-gray-300 dark:bg-slate-700 min-h-[7vh] text-slate-500 dark:text-white">
      <div className="flex items-center mr-auto">
        <p>Smart Brain V2</p>
      </div>
      <div className="flex">
        <Button.hoverBg action={() => {}}>TEST</Button.hoverBg>
      </div>
    </div>
  );
}
