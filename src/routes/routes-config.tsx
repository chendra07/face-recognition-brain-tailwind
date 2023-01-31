import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, redirect } from "react-router-dom";

import { RootState } from "../redux/store";
import { TmpMain, PgLogin, PgHome } from "../pages";

function RouterConfig() {
  return (
    <Routes>
      <Route path="/" element={<PgLogin />} />
      <Route path="resource" element={<TmpMain />}>
        <Route path="home" element={<PgHome />} />
        <Route path="settings" element={<PgLogin />} />
      </Route>
      {/* <Route path="*" element={<p>404 not found</p>} /> */}
    </Routes>
  );
}

export default RouterConfig;
