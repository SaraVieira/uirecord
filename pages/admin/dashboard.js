import React from "react";

// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";

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
