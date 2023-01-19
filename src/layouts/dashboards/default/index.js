import { useRef, useState } from "react";
// @mui material components
import Grid from "@mui/material/Grid";
// import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
// import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
// import SalesTable from "examples/Tables/SalesTable";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
// import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import Globe from "examples/Globe";

// Soft UI Dashboard PRO React base styles
import typography from "assets/theme/base/typography";
import breakpoints from "assets/theme/base/breakpoints";

// Data
// import salesTableData from "layouts/dashboards/default/data/salesTableData";
import reportsBarChartData from "layouts/dashboards/default/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboards/default/data/gradientLineChartData";
// import AutomotiveMonitor from "layouts/dashboards/automotive/components/AutomotiveMonitor";

import { useDispatch, useSelector } from "react-redux";
import {
  dashboards,
  dashboardGraphs,
  fetchUsers,
  fetchTradie,
  getAllJobs,
} from "../../../redux/actions/action";
import { useEffect } from "react";
import MUITable from "./data/MUITable";
// MUI component
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import ThinBarChart from "examples/Charts/BarCharts/ThinBarChart";
// import thinBarChartData from "layouts/dashboards/smart-home/data/thinBarChartData";
import { Card } from "@mui/material";
import { Link } from "react-router-dom";

function Default() {
  const [filterGraph, setFilterGraph] = useState("");
  const [year, SetSelectYear] = useState("");

  const dispatch = useDispatch();
  const { dashboardData } = useSelector((state) => state.dashboardData);
  const { dashboardGraphData } = useSelector(
    (state) => state.dashboardGraphData
  );

  useEffect(() => {
    dispatch(dashboards());
    setTimeout(() => {
      dispatch(fetchUsers());
      dispatch(fetchTradie());
      dispatch(getAllJobs());
    }, 2000);
  }, []);
  //For graph data
  useEffect(() => {
    let currentyear = new Date().getFullYear();
    let data =
      year && filterGraph === ""
        ? "month=" + "" + "" + "&" + "year=" + "" + year
        : year && filterGraph
        ? "month=" + "" + filterGraph + "&" + "year=" + "" + year
        : "month=" + "" + filterGraph + "&" + "year=" + "" + currentyear;

    if (data) {
      dispatch(dashboardGraphs(data));
    } else {
      dispatch(dashboardGraphs());
    }
  }, [filterGraph, year]);

  const graphData = dashboardGraphData?.data;

  const dataDataLebel = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: {
      label: "jobs",
      data: [
        graphData?.jan,
        graphData?.fab,
        graphData?.mar,
        graphData?.apr,
        graphData?.may,
        graphData?.jun,
        graphData?.jul,
        graphData?.aug,
        graphData?.sep,
        graphData?.oct,
        graphData?.nov,
        graphData?.dec,
      ],
    },
  };
  const myRef = useRef(null);

  const executeScroll = () => myRef.current.scrollIntoView();

  const { values } = breakpoints;
  const { size } = typography;
  const { chart } = reportsBarChartData;

  const data =
    Object.keys(dashboardData).length > 0 ? dashboardData : "loading..";

  useEffect(() => {
    dispatch(dashboards());
  }, []);

  const items = [
    {
      icon: { color: "primary", component: "group" },
      label: "Total Jobs",
      progress: {
        content: dashboardData?.count ? (
          dashboardData?.count?.total_jobs
        ) : (
          <img
            src="http://www.odyssea.eu/data/img/pie-chart-blue-loading.gif"
            alt="avatar"
            width={80}
            height={60}
          />
        ),
        percentage: 60,
      },
    },
    {
      icon: { color: "info", component: "person" },
      label: "Total Users",
      progress: {
        content: dashboardData?.count ? (
          dashboardData?.count?.user
        ) : (
          <img
            src="http://www.odyssea.eu/data/img/pie-chart-blue-loading.gif"
            alt="avatar"
            width={80}
            height={60}
          />
        ),
        percentage: 50,
      },
    },
    {
      icon: { color: "warning", component: "engineering" },
      label: "Total Tradies",
      progress: {
        content: dashboardData?.count ? (
          dashboardData?.count?.tradie
        ) : (
          <img
            src="http://www.odyssea.eu/data/img/pie-chart-blue-loading.gif"
            alt="avatar"
            width={80}
            height={60}
          />
        ),
        percentage: 30,
      },
    },
    {
      icon: { color: "error", component: "category" },
      label: "Categories/Services",
      progress: {
        content: dashboardData?.count ? (
          dashboardData?.count?.services
        ) : (
          <img
            src="http://www.odyssea.eu/data/img/pie-chart-blue-loading.gif"
            alt="avatar"
            width={80}
            height={60}
          />
        ),
        percentage: 50,
      },
    },
  ];
  const newItems = [
    {
      icon: { color: "primary", component: "money" },
      label: "Total Free Tradie",
      progress: {
        content:
          dashboardData && dashboardData?.totalUnPaiduser ? (
            dashboardData?.totalUnPaiduser
          ) : (
            <img
              src="http://www.odyssea.eu/data/img/pie-chart-blue-loading.gif"
              alt="avatar"
              width={80}
              height={60}
            />
          ),
        percentage: 50,
      },
    },
    {
      icon: { color: "info", component: "paid" },
      label: "Total Paid Tradie",
      progress: {
        content:
          dashboardData && dashboardData?.totalPaiduser ? (
            dashboardData?.totalPaiduser
          ) : (
            <img
              src="http://www.odyssea.eu/data/img/pie-chart-blue-loading.gif"
              alt="avatar"
              width={80}
              height={60}
            />
          ),
        percentage: 50,
      },
    },
    {
      icon: { color: "warning", component: "paid" },
      label: "Total Earnings",
      progress: {
        content: dashboardData?.countResEarning ? (
          `
          $${Number(
            dashboardData?.countResEarning?.data[0]?.totalEarning
          ).toFixed(2)}`
        ) : (
          <img
            src="http://www.odyssea.eu/data/img/pie-chart-blue-loading.gif"
            alt="avatar"
            width={80}
            height={60}
          />
        ),
        percentage: 45,
      },
    },
    {
      icon: { color: "error", component: "paid" },
      label: "Current Month Earnings",
      progress: {
        content:
          dashboardData && dashboardData?.countResgetcurrentMonthEr ? (
            `$${
              dashboardData?.countResgetcurrentMonthEr ? (
                Number(dashboardData?.countResgetcurrentMonthEr).toFixed(2)
              ) : (
                <img
                  src="http://www.odyssea.eu/data/img/pie-chart-blue-loading.gif"
                  alt="avatar"
                  width={80}
                  height={60}
                />
              )
            }`
          ) : (
            <img
              src="http://www.odyssea.eu/data/img/pie-chart-blue-loading.gif"
              alt="avatar"
              width={80}
              height={60}
            />
          ),
        percentage: 50,
      },
    },
  ];
  const allUser = [
    {
      icon: { color: "primary", component: "android" },
      label: "Paid Android Tradie",
      progress: {
        content:
          dashboardData &&
          dashboardData?.getDrivedWiseData &&
          dashboardData?.getDrivedWiseData.data[0].androiduser ? (
            dashboardData?.getDrivedWiseData.data[0].androiduser
          ) : (
            <img
              src="http://www.odyssea.eu/data/img/pie-chart-blue-loading.gif"
              alt="avatar"
              width={80}
              height={60}
            />
          ),
        percentage: 50,
      },
    },
    {
      icon: { color: "info", component: "apple" },
      label: "Paid IOS Tradie",
      progress: {
        content:
          dashboardData &&
          dashboardData?.getDrivedWiseData &&
          dashboardData?.getDrivedWiseData.data[0].IsoUser ? (
            dashboardData?.getDrivedWiseData.data[0].IsoUser
          ) : (
            <img
              src="http://www.odyssea.eu/data/img/pie-chart-blue-loading.gif"
              alt="avatar"
              width={80}
              height={60}
            />
          ),
        percentage: 50,
      },
    },
    {
      icon: { color: "warning", component: "language" },
      label: "Paid Web Tradie",
      progress: {
        content:
          dashboardData &&
          dashboardData?.getDrivedWiseData &&
          dashboardData?.getDrivedWiseData.data[0].IsoUser ? (
            dashboardData?.getDrivedWiseData.data[0].webUser
          ) : (
            <img
              src="http://www.odyssea.eu/data/img/pie-chart-blue-loading.gif"
              alt="avatar"
              width={80}
              height={60}
            />
          ),
        percentage: 45,
      },
    },
    {
      icon: { color: "error", component: "paid" },
      label: "This week earnings",
      progress: {
        content:
          dashboardData && dashboardData?.getWeeData ? (
            Number(dashboardData?.getWeeData).toFixed(2)
          ) : (
            <img
              src="http://www.odyssea.eu/data/img/pie-chart-blue-loading.gif"
              alt="avatar"
              width={80}
              height={60}
            />
          ),
        percentage: 50,
      },
    },
  ];
  const CountryLabel = { Name: "Countries", Data: "Data" };
  const StateLabel = { Name: "States", Data: "Data" };
  const CityLabel = { Name: "Cities" };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <Grid container>
          <Grid item xs={12} lg={7}>
            {/* <SuiBox mb={3} p={1}>
              <SuiTypography
                variant={window.innerWidth < values.sm ? "h3" : "h2"}
                textTransform="capitalize"
                fontWeight="bold"
              >
                general statistics
              </SuiTypography>
            </SuiBox> */}

            <Grid container>
              <Grid item xs={12}>
                <Globe
                  display={{ xs: "none", md: "block" }}
                  position="absolute"
                  top="10%"
                  right={0}
                  mt={{ xs: -12, lg: 1 }}
                  mr={{ xs: 0, lg: 10 }}
                  canvasStyle={{ marginTop: "3rem" }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={5}>
                <SuiBox mb={2}>
                  {data ? (
                    <Link
                      to={{
                        pathname: "/backend/jobs",
                        state: "active",
                      }}
                    >
                      <MiniStatisticsCard
                        title={{ text: "Active Jobs", fontWeight: "bold" }}
                        count={data ? data?.count?.active : "loading.."}
                        // percentage={{ color: "success", text: "+55%" }}
                        icon={{ color: "warning", component: "work" }}
                      />
                    </Link>
                  ) : (
                    <MiniStatisticsCard
                      title={{ text: "Active Jobs", fontWeight: "bold" }}
                      count="loading.."
                      // percentage={{ color: "error", text: "-2%" }}
                      icon={{ color: "warning", component: "work" }}
                    />
                  )}
                </SuiBox>
                {data ? (
                  <Link
                    to={{
                      pathname: "/backend/jobs",
                      state: "cancel",
                    }}
                  >
                    <MiniStatisticsCard
                      title={{ text: "Canceled Jobs", fontWeight: "bold" }}
                      count={data ? data?.count?.cancle : "loading.."}
                      // percentage={{ color: "success", text: "+3%" }}
                      icon={{ color: "warning", component: "cancel" }}
                    />
                  </Link>
                ) : (
                  <MiniStatisticsCard
                    title={{ text: "Cancel Jobs", fontWeight: "bold" }}
                    count="loading.."
                    // percentage={{ color: "error", text: "-2%" }}
                    icon={{ color: "warning", component: "cancel" }}
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={5}>
                <SuiBox mb={2}>
                  {data ? (
                    <Link
                      to={{
                        pathname: "/backend/jobs",
                        state: "completed",
                      }}
                    >
                      <MiniStatisticsCard
                        title={{ text: "Completed Jobs", fontWeight: "bold" }}
                        count={data ? data?.count?.completed : "loading.."}
                        // percentage={{ color: "error", text: "-2%" }}
                        icon={{ color: "warning", component: "doneall" }}
                      />
                    </Link>
                  ) : (
                    <MiniStatisticsCard
                      title={{ text: "Completed Jobs", fontWeight: "bold" }}
                      count="loading.."
                      // percentage={{ color: "error", text: "-2%" }}
                      icon={{ color: "warning", component: "doneall" }}
                    />
                  )}
                </SuiBox>
                <SuiBox mb={2}>
                  {data ? (
                    <Link to="/backend/jobs">
                      <MiniStatisticsCard
                        title={{ text: "Pending Jobs", fontWeight: "bold" }}
                        count={data ? data?.count?.pending : "loading.."}
                        // percentage={{ color: "success", text: "+5%" }}
                        icon={{
                          color: "warning",
                          component: "pending",
                        }}
                      />
                    </Link>
                  ) : (
                    <MiniStatisticsCard
                      title={{ text: "Pending Jobs", fontWeight: "bold" }}
                      count="loading.."
                      // percentage={{ color: "error", text: "-2%" }}
                      icon={{ color: "warning", component: "doneall" }}
                    />
                  )}
                </SuiBox>
              </Grid>
              <Grid item xs={12} lg={12}>
                <ReportsBarChart
                  title="active users"
                  // description={
                  //   <>
                  //     (<strong>+23%</strong>) than last week
                  //   </>
                  // }
                  // chart={chart}
                  items={items}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <ReportsBarChart
                  title="active users"
                  // chart={chart}
                  items={newItems}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <ReportsBarChart
                  title="active users"
                  // chart={chart}
                  items={allUser}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={1} mt={2}>
            <Grid item xs={12} lg={4}>
              <SuiBox mb={3}>
                {/* <SalesTable title="Top 5 Countries" rows={salesTableData} /> */}
                <MUITable
                  label={CountryLabel}
                  tableData={data ? data?.top5country : "N/A"}
                />
              </SuiBox>
            </Grid>
            <Grid item xs={12} lg={4}>
              <SuiBox mb={3}>
                <MUITable
                  label={StateLabel}
                  tableData={data ? data?.top5state : "N/A"}
                />
              </SuiBox>
            </Grid>
            <Grid item xs={12} lg={4}>
              <SuiBox mb={3}>
                <MUITable
                  label={CityLabel}
                  tableData={data ? data?.top5city : "N/A"}
                />
              </SuiBox>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12} lg={5}>
              <SuiBox mb={3} ref={myRef}>
                <TableContainer component={Paper} style={{ height: "32rem" }}>
                  <Table size="small" aria-label="a dense table" stickyHeader>
                    <TableHead style={{ display: "contents" }}>
                      <TableRow>
                        <TableCell>Category</TableCell>
                        <TableCell align="right">Total Tradie</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data
                        ? data?.top10Services?.map((row, index) => (
                            <TableRow
                              key={index.id}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {row.name
                                  ? row.name?.charAt(0).toUpperCase() +
                                    row.name?.slice(1)
                                  : "N/A"}
                              </TableCell>
                              <TableCell align="right">
                                {row.tradie_count}
                              </TableCell>
                            </TableRow>
                          ))
                        : ""}
                    </TableBody>
                  </Table>
                </TableContainer>
              </SuiBox>
            </Grid>
            <Grid item xs={12} lg={7}>
              <ThinBarChart
                title="Job overview"
                chart={dataDataLebel}
                setFilterGraph={setFilterGraph}
                SetSelectYear={SetSelectYear}
              />
            </Grid>
          </Grid>
          {/* <Card>
            <iframe
              src="https://www.google.com/maps/embed"
              width={1000}
              height={450}
              style={{ border: 0 }}
              allowfullscreen
              loading="lazy"
            ></iframe>
          </Card> */}

          {/*  <Grid container spacing={3}>
           
            </Grid>
          <Grid item xs={12} lg={7}>
              <GradientLineChart
                title="Sales Overview"
                description={
                  <SuiBox display="flex" alignItems="center">
                    <SuiBox
                      fontSize={size.lg}
                      color="success"
                      mb={0.3}
                      mr={0.5}
                      lineHeight={0}
                    >
                      <Icon sx={{ fontWeight: "bold" }}>arrow_upward</Icon>
                    </SuiBox>
                    <SuiTypography
                      variant="button"
                      color="text"
                      fontWeight="medium"
                    >
                      4% more{" "}
                      <SuiTypography
                        variant="button"
                        color="text"
                        fontWeight="regular"
                      >
                        in 2021
                      </SuiTypography>
                    </SuiTypography>
                  </SuiBox>
                }
                chart={gradientLineChartData}
              />
            </Grid>
          </Grid>*/}
        </Grid>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Default;
