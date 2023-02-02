import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Card, Button } from "../components";
import Login from "../components/auth/login";
import Register from "../components/auth/register";
import { RootState } from "../redux/store";

export default function PgAuth() {
  const { isDark } = useSelector((state: RootState) => state.theme);
  const [isLogin, setisLogin] = useState(true);
  const [isLoading, setisLoading] = useState(false);

  return (
    <div className="flex flex-1 min-h-screen items-center justify-center">
      <div className="flex-1 max-w-[70rem] m-4">
        <Card>
          <div className="flex flex-1 flex-col items-center">
            {isLogin ? (
              <Login isLoading={isLoading} returnedValue={(loginInput) => {}} />
            ) : (
              <Register />
            )}
            <div className="p-4">
              <Button.Underline action={() => setisLogin((prev) => !prev)}>
                {isLogin ? "Register" : "Login"}
              </Button.Underline>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
