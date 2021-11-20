import React from "react";

import Sidebar from "components/Sidebar/Sidebar.js";

export default function Admin({ children }) {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">{children}</div>
    </>
  );
}
