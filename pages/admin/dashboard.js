import React from "react";

// layout for page

import Admin from "layouts/Admin.js";
import HeaderStats from "components/Headers/HeaderStats";

export default function Dashboard() {
  return (
    <>
      <div className="px-4 md:px-10 mx-auto w-full">
        <HeaderStats />
      </div>
    </>
  );
}

Dashboard.layout = Admin;
