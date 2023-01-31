import React from "react";
import { Outlet } from "react-router-dom";
import "./tmp-main.styles.css";

export default function TmpMain() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
