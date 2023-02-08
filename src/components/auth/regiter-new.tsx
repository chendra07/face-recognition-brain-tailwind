import React, { useState } from "react";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { toast } from "react-hot-toast";
import { Form, Input, Upload, message } from "antd";
import { useDebouncedCallback } from "use-debounce";
import clsx from "clsx";

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import FormItem from "antd/es/form/FormItem";

import { isPasswordValid } from "../../utils/passwordValidator";

import { Button, AdaptiveLoading, FormInput } from "..";
import { icons } from "../../assets";

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

  function handleSubmit(e: Object) {
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
      <Form
        name="registerForm"
        className="flex-1 flex flex-col px-4 pt-4"
        initialValues={{ remember: true }}
        onFinish={(registerInput: object) => handleSubmit(registerInput)}
        onFinishFailed={(error) => console.log("Error: ", error)}
        autoComplete="off"
      >
        <h1 className="text-slate-500 text-center text-5xl mb-8">Register</h1>
        <div
          className={clsx(
            "mb-8 h-[10rem] w-[10rem] flex rounded-full overflow-hidden self-center",
            "bg-white"
          )}
        >
          <img
            src={base64img.data ? base64img.data : icons.person}
            alt="profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input name="name" placeholder="Name" onChange={handleChange} />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input your email!",
            },
          ]}
        >
          <Input name="email" placeholder="Email" onChange={handleChange} />
        </Form.Item>

        <div className="flex flex-1 flex-wrap w-full gap-4">
          <Form.Item
            className="flex-1 min-w-[100px]"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            className="flex-1 min-w-[100px]"
            name="cPassword"
            rules={[
              {
                required: true,
                message: "Please input your confirm password!",
              },
            ]}
          >
            <Input.Password
              name="cPassword"
              placeholder="Confirm Password"
              onChange={(e) => {
                setcPassword(e.target.value);
              }}
            />
          </Form.Item>
        </div>

        <FormItem className="self-center">
          <FormInput.FileInput
            accept={[".jpg", ".png", ".webp", ".jpeg"]}
            name="image64"
            onChange={handleSubmitImage}
            showDelete={base64img.data}
            handleDeleteImage={handleDeleteImage}
          >
            <>
              <span className="material-icons">image</span>
              <span className="font-medium">Upload Image</span>
            </>
          </FormInput.FileInput>
        </FormItem>

        <Form.Item className="self-center">
          <Button.Primary type="submit">
            {isLoading ? <AdaptiveLoading isDark={false} /> : "Register"}
          </Button.Primary>
        </Form.Item>
      </Form>
    </div>
  );
}
