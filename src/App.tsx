import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./redux/store";
import RouterConfig from "./routes/routes-config";
import { toggleDarkTheme } from "./redux/slices/theme.slice";
import { ParticleBackground, ToasterCfg } from "./components";
import { icons } from "./assets";
import clsx from "clsx";

export default function App() {
  const { isDark } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();
  return (
    <div
      className={`min-h-screen relative transition-all ${
        isDark ? "dark bg-slate-500" : "bg-gray-100"
      }`}
    >
      <ToasterCfg />
      <ParticleBackground isDarkMode={isDark} />
      <div className="relative">
        <RouterConfig />
      </div>
      <div
        className={clsx(
          "fixed bottom-10 right-10 w-[6rem] h-[6rem] rounded-full p-5",
          "bg-slate-500",
          "dark:bg-gray-100",
          "hover:cursor-pointer"
        )}
        onClick={() => dispatch(toggleDarkTheme())}
      >
        <img
          src={isDark ? icons.sun : icons.moon}
          alt="dark mode"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
