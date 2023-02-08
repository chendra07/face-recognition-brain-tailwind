import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { TmpMain, PgAuth, PgHome, PgHistory } from "../pages";

function RouterConfig() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" />} />
      <Route path="/auth" element={<PgAuth />} />
      <Route path="resource" element={<TmpMain />}>
        <Route path="home" element={<PgHome />} />
        {/* <Route path="profile" element={<PgProfile />} /> */}
        <Route path="history" element={<PgHistory />} />
      </Route>
      <Route path="*" element={<p>404 not found</p>} />
    </Routes>
  );
}

export default RouterConfig;
