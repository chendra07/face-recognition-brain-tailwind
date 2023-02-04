import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

import { RootState } from "../../redux/store";
import { isPasswordValid } from "../../utils/passwordValidator";
import { AdaptiveLoading, Button } from "..";
import clsx from "clsx";
import { icons } from "../../assets";
import FormInput from "../formInput";

const zodRegisterInput = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  image64: z.string().optional(),
});

type RegisterInput = z.infer<typeof zodRegisterInput>;

type RegisterProps = {
  returnedValue: (input: RegisterInput) => void;
  isLoading: boolean;
};

export default function Register({ isLoading, returnedValue }: RegisterProps) {
  const [registerInput, setregisterInput] = useState<RegisterInput>({
    name: "",
    email: "",
    password: "",
    image64: undefined,
  });

  const [cPassword, setcPassword] = useState("");
  const [base64img, setbase64img] = useState({
    data: "",
    size: 0,
  });

  const { isDark } = useSelector((state: RootState) => state.theme);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const verifyZod = zodRegisterInput.safeParse(registerInput);

    if (!verifyZod.success) {
      toast.error(`Invalid input (${fromZodError(verifyZod.error).message})`);
      return;
    }

    if (registerInput.password !== cPassword) {
      toast.error("Password did not match");
      return;
    }

    if (!isPasswordValid(registerInput.password)) {
      toast.error(
        "Password must contain: 1 lowecase, 1 uppercase, 1 symbol, and 1 number"
      );
      return;
    }

    //max size: 4mb
    if (!(base64img.size <= 4000000)) {
      toast.error("max image size: 4mb");
      return;
    }

    returnedValue(registerInput);
  }

  function handleSubmitImage(e: React.ChangeEvent<HTMLInputElement>) {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files![0]);
    reader.onload = () => {
      const base64str = reader.result as unknown as string;

      setbase64img({
        data: base64str,
        size: e.target.files![0].size,
      });

      setregisterInput((prev) => ({
        ...prev,
        image64: base64str.split(",")[1],
      }));
    };
  }

  function handleDeleteImage() {
    if (registerInput.image64) {
      setregisterInput((prev) => ({ ...prev, image64: undefined }));
      setbase64img({
        data: "",
        size: 0,
      });
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const key = e.target.name;
    const value = e.target.value;
    setregisterInput((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="flex-1 w-full">
      <h1
        className={clsx(
          "text-center text-5xl m-2",
          "text-slate-500",
          "dark:text-gray-200"
        )}
      >
        Register
      </h1>
      <form
        className="flex-1 flex flex-col items-center"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div
          className={clsx(
            "p-1 m-2 h-[10rem] w-[10rem] flex rounded-full overflow-hidden",
            "bg-white"
          )}
        >
          <img
            src={base64img.data ? base64img.data : icons.person}
            alt="profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <FormInput.Text
          name="name"
          onChange={handleChange}
          placeholder="name"
          required
        />
        <FormInput.Email
          name="email"
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <div
          className={clsx(
            "flex w-full mx-8 my-2 gap-4 justify-between",
            "scr-500-less:flex-col"
          )}
        >
          <FormInput.Password
            name="password"
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <FormInput.Password
            name="cPassword"
            onChange={(e) => setcPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
        </div>
        <FormInput.FileInput
          accept={[".jpg", ".png", ".webp", ".jpeg"]}
          name="image64"
          onChange={handleSubmitImage}
          showDelete={base64img.data}
          deleteElement={
            <img
              src={icons.remove}
              alt="delete"
              onClick={handleDeleteImage}
              className="w-[2.5rem] h-[2.5rem] cursor-pointer active:opacity-80"
            />
          }
        >
          <>
            <img
              src={icons.image}
              alt="image"
              className="w-[2.5rem] h-[2.5rem] p-1"
            />
            <span>Upload Image</span>
          </>
        </FormInput.FileInput>
        <Button.Primary
          className="m-2"
          isDisable={isLoading}
          action={() => {}}
          type="submit"
        >
          {isLoading ? <AdaptiveLoading isDark={isDark} /> : "Register"}
        </Button.Primary>
      </form>
    </div>
  );
}
