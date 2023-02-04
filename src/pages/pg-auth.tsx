import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//components
import { Card, Button } from "../components";
import Login from "../components/auth/login";
import Register from "../components/auth/register";

//redux
import { RootState } from "../redux/store";
import { addUser } from "../redux/slices/user.slice";

//request
import { httpPostLogin, httpPostRegister } from "../requests/auth";
import { toast } from "react-hot-toast";

export default function PgAuth() {
  const userProfile = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (userProfile) {
      navigate("/resource/home", { replace: false });
    }
  }, []);

  const dispatch = useDispatch();

  const [isLogin, setisLogin] = useState(true);
  const [isLoading, setisLoading] = useState(false);

  function handleLogin(loginInput: { email: string; password: string }) {
    setisLoading(true);
    httpPostLogin(loginInput)
      .then((loginResponse) => {
        dispatch(addUser(loginResponse));
      })
      .then((_) => {
        navigate("/resource/home", { replace: true });
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setisLoading(false);
      });
  }

  function handleRegister(regsiterInput: {
    image64?: string | undefined;
    email: string;
    name: string;
    password: string;
  }) {
    setisLoading(true);
    httpPostRegister(regsiterInput)
      .then((registerResponse) => {
        dispatch(addUser(registerResponse));
      })
      .then((_) => {
        navigate("/resource/home", { replace: true });
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setisLoading(false));
  }

  return (
    <div className="flex flex-1 min-h-screen items-center justify-center">
      <div className="flex-1 max-w-[70rem] m-4">
        <Card>
          <div className="flex flex-1 flex-col items-center">
            {isLogin ? (
              <Login isLoading={isLoading} returnedValue={handleLogin} />
            ) : (
              <Register isLoading={isLoading} returnedValue={handleRegister} />
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
