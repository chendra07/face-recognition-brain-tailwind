import React from "react";
import { useSelector } from "react-redux";
import { clsx } from "clsx";
import { RootState } from "../redux/store";

type btnProps = {
  children: JSX.Element | string;
  action: () => void;
  className?: string;
  isDisable?: boolean;
};

const disabledPreset = " disabled:opacity-75 disabled:cursor-not-allowed";

function Primary({ action, children, className, isDisable = false }: btnProps) {
  return (
    <button
      onClick={action}
      disabled={isDisable}
      className={clsx(
        className,
        "m-2 px-6 py-2 rounded-md transition-all",
        "bg-slate-500 shadow-gray-500 shadow-md text-gray-200",
        "dark:bg-gray-200 dark:shadow-gray-700 dark:text-slate-500",
        "enabled:hover:shadow-gray-700 enabled:hover:translate-y-[-3px] enabled:active:translate-y-[3px]  enabled:hover:shadow-lg enabled:active:shadow-none",
        disabledPreset
      )}
    >
      {children}
    </button>
  );
}

function Outline({ action, children, className, isDisable = false }: btnProps) {
  return (
    <button
      onClick={action}
      disabled={isDisable}
      className={clsx(
        className,
        "m-2 px-6 rounded-md transition-all",
        "border-[2px] border-solid",
        "text-slate-500 border-slate-500",
        "enabled:hover:bg-slate-500 enabled:hover:text-gray-200",
        "active:bg-transparent active:text-slate-500",
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
}: btnProps) {
  const { isDark } = useSelector((state: RootState) => state.theme);
  return (
    <button
      onClick={action}
      disabled={isDisable}
      className={clsx(
        "m-2 border-b-2 border-x-0 border-t-0 px-6",
        "border-solid",
        isDark
          ? [
              "text-gray-200 border-gray-200",
              "enabled:hover:bg-gray-200 enabled:hover:text-slate-500",
            ]
          : [
              "text-slate-500 border-slate-500",
              "enabled:hover:bg-slate-500 enabled:hover:text-gray-200",
            ],
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
};
