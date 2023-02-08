import React, { useState } from "react";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { toast } from "react-hot-toast";
import { Form, Input } from "antd";
import { useDebouncedCallback } from "use-debounce";

import { isPasswordValid } from "../../utils/passwordValidator";

import { Button, AdaptiveLoading } from "..";

const zodLoginInput = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type LoginInput = z.infer<typeof zodLoginInput>;

type LoginProps = {
  returnedValue: (input: LoginInput) => void;
  isLoading: boolean;
};

export default function Login({ isLoading, returnedValue }: LoginProps) {
  const [loginInput, setloginInput] = useState({
    email: "",
    password: "",
  });

  const handleSubmits = useDebouncedCallback((loginInput: object) => {
    const verifyZod = zodLoginInput.safeParse(loginInput);

    if (!verifyZod.success) {
      toast.error(`Invalid input (${fromZodError(verifyZod.error).message})`);
      return;
    }

    const verifiedLoginInput = loginInput as LoginInput;

    if (!isPasswordValid(verifiedLoginInput.password)) {
      toast.error(
        "Password must contain: 1 lowecase, 1 uppercase, 1 symbol, and 1 number"
      );
      return;
    }

    returnedValue(verifiedLoginInput);
  }, 500);

  return (
    <div className="flex-1 w-full">
      <Form
        name="loginForm"
        className="flex-1 px-4 pt-4"
        initialValues={{ remember: true }}
        onFinish={(loginInput: object) => handleSubmits(loginInput)}
        onFinishFailed={(error) => console.log("Error: ", error)}
        autoComplete="off"
      >
        <h1 className="text-slate-500 text-center text-5xl mb-8">Login</h1>
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
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item className="flex items-center justify-center">
          <Button.Primary type="submit">
            {isLoading ? <AdaptiveLoading isDark={false} /> : "Login"}
          </Button.Primary>
        </Form.Item>
      </Form>
    </div>
  );
}
