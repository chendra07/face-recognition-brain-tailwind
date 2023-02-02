import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import Button from "../button";
import { icons } from "../../assets";
import { isPasswordValid } from "../../utils/passwordValidator";
import AdaptiveLoading from "../loading";

type LoginProps = {
  returnedValue: (input: { email: string; password: string }) => void;
  isLoading: boolean;
};

export default function Login({ returnedValue, isLoading }: LoginProps) {
  const [loginInput, setloginInput] = useState({
    email: "",
    password: "",
  });

  const { isDark } = useSelector((state: RootState) => state.theme);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (
      !(loginInput.password.length >= 8) ||
      !isPasswordValid(loginInput.password)
    ) {
      toast.error(
        "Password minimal charaters is 8 and contain: 1 lowecase, 1 uppercase, 1 symbol, and 1 number"
      );
      return;
    }
  }

  function handleChange(e: any) {
    const key = e.target.name;
    const value = e.target.value;
    setloginInput((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="flex-1 w-full">
      <h1 className="text-slate-500 dark:text-gray-200 text-center text-5xl m-2">
        Login
      </h1>
      <form
        className="flex-1 flex flex-col items-center"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="p-2 mx-8 my-2 rounded-md w-full"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          className="p-2 mx-8 my-2 rounded-md w-full"
          onChange={handleChange}
        />
        <Button.Primary isDisable={isLoading} action={() => {}}>
          {isLoading ? <AdaptiveLoading isDark={isDark} /> : "Login"}
        </Button.Primary>
      </form>
    </div>
  );
}
