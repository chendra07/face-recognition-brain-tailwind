import clsx from "clsx";
import React from "react";
import { icons } from "../assets";

type InputFormAttributes = {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
};

function Text({
  name,
  onChange,
  className,
  placeholder,
  required,
}: InputFormAttributes) {
  return (
    <input
      name={name}
      type="text"
      placeholder={placeholder}
      className={clsx("p-2 mx-8 my-2 rounded-md w-full", className)}
      onChange={onChange}
      required={required}
    />
  );
}

function Email({
  name,
  onChange,
  className,
  placeholder,
  required,
}: InputFormAttributes) {
  return (
    <input
      name={name}
      type="email"
      placeholder={placeholder}
      className={clsx("p-2 mx-8 my-2 rounded-md w-full", className)}
      onChange={onChange}
      required={required}
    />
  );
}

function Password({
  name,
  onChange,
  className,
  placeholder,
  required,
}: InputFormAttributes) {
  return (
    <input
      name={name}
      type="password"
      placeholder={placeholder}
      className={clsx("p-2 rounded-md flex-1", className)}
      onChange={onChange}
      required={required}
    />
  );
}

type FileInputAttributes = {
  children: string | JSX.Element;
  accept: string[];
  deleteElement?: JSX.Element | undefined;
  showDelete?: any | undefined;
};

function FileInput({
  name,
  onChange,
  children,
  accept,
  deleteElement,
  showDelete,
  className,
  required,
}: InputFormAttributes & FileInputAttributes) {
  return (
    <div className="flex items-center">
      <label
        className={clsx(
          "flex px-4 py-2 m-2 cursor-pointer rounded-md",
          "border-gray-200  bg-slate-500 text-gray-200",
          "dark:border-gray-200 dark:bg-gray-200 dark:text-slate-500",
          "hover:opacity-80",
          className
        )}
      >
        {children}
        <input
          type="file"
          className="hidden"
          name={name}
          accept={accept.join(", ")}
          draggable={true}
          max={1}
          onChange={onChange}
          required={required}
        />
      </label>
      {showDelete && deleteElement}
    </div>
  );
}

export default {
  Text,
  Email,
  Password,
  FileInput,
};
