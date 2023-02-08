import React from "react";
import { clsx } from "clsx";

type btnProps = {
  children: JSX.Element | string;
  action?: () => void;
  className?: string;
  isDisable?: boolean;
  type?: "button" | "submit" | "reset";
};

const disabledPreset = " disabled:opacity-75 disabled:cursor-not-allowed";

function Primary({
  action,
  children,
  className,
  isDisable = false,
  type = "button",
}: btnProps) {
  return (
    <button
      onClick={action}
      disabled={isDisable}
      type={type}
      className={clsx(
        className,
        "px-6 py-2 rounded-md transition-all cursor-pointer",
        "bg-slate-500 shadow-gray-500 shadow-md text-gray-200",
        // "dark:bg-gray-200 dark:shadow-gray-700 dark:text-slate-500",
        "enabled:hover:shadow-gray-700 enabled:hover:translate-y-[-3px] enabled:hover:shadow-lg",
        "enabled:active:translate-y-[3px] enabled:active:shadow-none",
        disabledPreset
      )}
    >
      {children}
    </button>
  );
}

function Outline({
  action,
  children,
  className,
  isDisable = false,
  type = "button",
}: btnProps) {
  return (
    <button
      onClick={action}
      disabled={isDisable}
      type={type}
      className={clsx(
        className,
        "m-2 px-6 rounded-md transition-all",
        "border-[2px] border-solid",
        "text-slate-500 border-slate-500",
        // "dark:text-gray-200 dark:border-gray-200",
        "enabled:hover:bg-slate-500 enabled:hover:text-gray-200",
        // "enabled:hover:dark:bg-gray-200 enabled:hover:dark:text-slate-500",
        "active:opacity-75 active:text-slate-500",
        disabledPreset
      )}
    >
      {children}
    </button>
  );
}

function Underline({
  action,
  children,
  className,
  isDisable = false,
  type = "button",
}: btnProps) {
  return (
    <button
      onClick={action}
      disabled={isDisable}
      type={type}
      className={clsx(
        "px-6 py-2 flex cursor-pointer",
        "border-b-2 border-x-0 border-t-0 border-solid",
        "text-slate-500 border-slate-500 bg-transparent",
        "enabled:hover:bg-slate-500 enabled:hover:text-gray-200",
        // "dark:text-gray-200 dark:border-gray-200",
        // "enabled:dark:hover:bg-gray-200 enabled:dark:hover:text-slate-500",
        "active:opacity-80",
        "transition-all",
        disabledPreset,
        className
      )}
    >
      {children}
    </button>
  );
}

function HoverBg({
  action,
  children,
  className,
  isDisable = false,
  type = "button",
}: btnProps) {
  return (
    <button
      onClick={action}
      disabled={isDisable}
      type={type}
      className={clsx(
        "px-6 bg-transparent cursor-pointer",
        "text-slate-500",
        "dark:text-gray-200",
        "enabled:hover:bg-slate-500 enabled:hover:text-gray-200",
        "enabled:dark:hover:bg-gray-200 enabled:dark:hover:text-slate-500",
        "active:opacity-80",
        "transition-all",
        disabledPreset,
        className
      )}
    >
      {children}
    </button>
  );
}

export default {
  Primary,
  Outline,
  Underline,
  HoverBg,
};
