import React from "react";
import { Toaster } from "react-hot-toast";

export default function ToasterCfg() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        // Define default options
        duration: 5000,
        style: {
          background: "#363636",
          color: "#fff",
        },
      }}
    />
  );
}
