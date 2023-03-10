/**
=========================================================
* Soft UI Dashboard PRO React - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

export default {
  chart: {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: { label: "Sales", data: [450, 200, 100, 220, 500, 100, 400, 230, 500] },
  },
  items: [
    {
      icon: { color: "primary", component: "group" },
      label: "Total Jobs",
      progress: { content: `"36K"`, percentage: 60 },
    },
    {
      icon: { color: "info", component: "person" },
      label: "Total Users",
      progress: { content: "2M", percentage: 90 },
    },
    {
      icon: { color: "warning", component: "engineering" },
      label: "Total Tradie",
      progress: { content: "$435", percentage: 30 },
    },
    {
      icon: { color: "error", component: "category" },
      label: "Category/Service",
      progress: { content: "43", percentage: 50 },
    },
  ],
};
