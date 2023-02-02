import clsx from "clsx";
import React from "react";

type CardProps = {
  children: JSX.Element | string;
  className?: string;
};

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={clsx(
        `rounded-3xl p-4 shadow-lg`,
        "bg-gray-200 shadow-gray-500",
        "dark:shadow-none dark:bg-transparent dark:border-2 dark:border-solid dark:border-gray-200",
        className
      )}
    >
      {children}
    </div>
  );
}
