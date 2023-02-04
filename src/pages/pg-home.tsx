import React, { useEffect } from "react";

//redux
import { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";

//requests
import { httpGetDummyUnauthorized } from "../requests/user";
import { toast } from "react-hot-toast";
import Button from "../components/button";

export default function PgHome() {
  const dispatch = useDispatch();

  function runMe() {
    httpGetDummyUnauthorized().catch((error) => {
      toast.error(error.message);
    });
  }

  return (
    <div>
      <p>Home</p>
      <Button.Primary action={runMe}>Fetch</Button.Primary>
    </div>
  );
}
