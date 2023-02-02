import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, redirect } from "react-router-dom";

import { RootState } from "../redux/store";
import { TmpMain, PgAuth, PgHome } from "../pages";

function RouterConfig() {
  return (
    <Routes>
      <Route path="/" element={<PgAuth />} />
      <Route path="resource" element={<TmpMain />}>
        <Route path="home" element={<PgHome />} />
      </Route>
      <Route path="*" element={<p>404 not found</p>} />
    </Routes>
  );
}

export default RouterConfig;
