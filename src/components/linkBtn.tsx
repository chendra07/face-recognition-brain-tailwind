import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

type LinkProps = {
  children: JSX.Element | string;
  to: string;
  className?: string;
};

function HoverBg({ to, children, className }: LinkProps) {
  return (
    <Link
      to={to}
      className={clsx(
        "px-6 flex justify-center items-center bg-transparent",
        "text-slate-500",
        "dark:text-gray-200",
        "hover:bg-slate-500 hover:text-gray-200",
        "dark:hover:bg-gray-200 dark:hover:text-slate-500",
        "active:opacity-80",
        "transition-all",
        className
      )}
    >
      {children}
    </Link>
  );
}

function Primary({ to, children, className }: LinkProps) {
  return (
    <Link
      to={to}
      className={clsx(
        "px-6 py-2 rounded-md transition-all",
        "bg-slate-500 shadow-gray-500 shadow-md text-gray-200",
        "dark:bg-gray-200 dark:shadow-gray-700 dark:text-slate-500",
        "hover:shadow-gray-700 hover:translate-y-[-3px] hover:shadow-lg",
        "active:translate-y-[3px] active:shadow-none",
        className
      )}
    >
      {children}
    </Link>
  );
}

export default {
  HoverBg,
  Primary,
};
