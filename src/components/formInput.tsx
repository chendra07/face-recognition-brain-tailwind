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
  name: string;
  accept: string[];
  handleDeleteImage: () => void;
  deleteElement?: JSX.Element | undefined;
  showDelete?: any | undefined;
  className?: string;
  required?: boolean;
};

function FileInput({
  name,
  onChange,
  children,
  accept,
  handleDeleteImage,
  showDelete,
  className,
  required,
}: InputFormAttributes & FileInputAttributes) {
  return (
    <div className="flex items-center">
      <label
        className={clsx(
          "flex px-4 py-2 m-2 cursor-pointer rounded-md transition-all",
          "border-gray-200  bg-slate-500 text-gray-200",
          // "dark:border-gray-200 dark:bg-gray-200 dark:text-slate-500",
          "hover:opacity-80",
          className
        )}
      >
        {children}
        <input
          type="file"
          className="hidden"
          style={{ display: "none" }}
          name={name}
          accept={accept.join(", ")}
          draggable={true}
          max={1}
          onChange={onChange}
          required={required}
        />
      </label>
      {showDelete && (
        <span
          onClick={handleDeleteImage}
          className="material-icons text-red-600 cursor-pointer active:opacity-80"
        >
          delete_forever
        </span>
      )}
    </div>
  );
}

export default {
  Text,
  Email,
  Password,
  FileInput,
};
