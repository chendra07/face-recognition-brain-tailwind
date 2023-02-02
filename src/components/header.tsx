import React from "react";
import { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkTheme } from "../redux/slices/theme.slice";

export default function Header() {
  const { isDark } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();
  return (
    <div className="flex bg-slate-700 min-h-[5vh] px-12 py-4 text-white">
      <div className="flex mr-auto">
        <p>Poyo</p>
      </div>
      <div className="flex">
        <button onClick={() => dispatch(toggleDarkTheme())}>
          {isDark ? "light" : "dark"}
        </button>
      </div>
    </div>
  );
}
