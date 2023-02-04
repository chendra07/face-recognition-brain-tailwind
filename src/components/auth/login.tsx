import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

import { RootState } from "../../redux/store";
import Button from "../button";
import { isPasswordValid } from "../../utils/passwordValidator";
import AdaptiveLoading from "../loading";

const zodLoginInput = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type LoginInput = z.infer<typeof zodLoginInput>;

type LoginProps = {
  returnedValue: (input: LoginInput) => void;
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

    const verifyZod = zodLoginInput.safeParse(loginInput);

    if (!verifyZod.success) {
      toast.error(`Invalid input (${fromZodError(verifyZod.error).message})`);
      return;
    }

    if (!isPasswordValid(loginInput.password)) {
      toast.error(
        "Password must contain: 1 lowecase, 1 uppercase, 1 symbol, and 1 number"
      );
      return;
    }

    returnedValue(loginInput);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
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
          type="text"
          placeholder="Email"
          className="p-2 mx-8 my-2 rounded-md w-full"
          onChange={handleChange}
          required={true}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="p-2 mx-8 my-2 rounded-md w-full"
          onChange={handleChange}
          required={true}
        />
        <Button.Primary
          className="m-2"
          type="submit"
          isDisable={isLoading}
          action={() => {}}
        >
          {isLoading ? <AdaptiveLoading isDark={isDark} /> : "Login"}
        </Button.Primary>
      </form>
    </div>
  );
}
