import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MaterialTable from "material-table";
// MUI component
import { Card, IconButton, TextField, Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { Subscriptionlist } from "redux/actions/action";
import moment from "moment";
import { Link } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// For model
const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, borderBottom: "2px solid grey" }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            float: "right",
            top: 0,
            // color: (theme) => theme.palette.grey[500],
          }}
          style={{ backgroundColor: "rgb(238, 139, 38)", color: "white" }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const Subscription = () => {
  const dispatch = useDispatch();
  const { Subscription_List } = useSelector((state) => state.Subscription_List);
  const { sub_loading } = useSelector((state) => state.loading);
  const [SearchSelect, setSearchSelect] = useState();
  const [searchBox, setSearchBox] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    let url;
    if (searchBox) {
      url = `${SearchSelect}=${searchBox}`;
    }
    dispatch(Subscriptionlist(url));

    if (SearchSelect == "date") {
      if (startDate && endDate) {
        let urls = `start_date=${moment(startDate).format(
          "x"
        )}&&end_date=${moment(endDate).format("x")}`;
        dispatch(Subscriptionlist(urls));
      }
    }
  }, [SearchSelect, searchBox, startDate, endDate]);

  //   console.log("Subscription_List :", Subscription_List);
  //   console.log("sub_loading :", sub_loading);

  const filterFunc = (e) => {
    setSearchSelect(e.target.value);
    setSearchBox("");
  };
  const [showSubsId, setShowSubsId] = useState(false);
  const [subsIdData, setSubsIdData] = useState();
  const modelForAddress = (data) => {
    setSubsIdData(data);
    setShowSubsId(true);
  };
  const handleClose = () => {
    setShowSubsId(false);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card style={{ marginTop: "14px" }}>
        <Grid container spacing={2}>
          <Grid item xs={5} sm={2} md={2} ml={2}>
            <select className="form-control searchSelect" onChange={filterFunc}>
              <option value="allUser">All</option>
              <option value="name">Name</option>
              <option value="date">Date</option>
            </select>
          </Grid>
          {SearchSelect && SearchSelect == "name" ? (
            <Grid item xs={6} sm={4} md={4}>
              <input
                type="text"
                className="form-control searchBox"
                placeholder={`Search by ${
                  SearchSelect.charAt(0).toUpperCase() + SearchSelect.slice(1)
                }`}
                // value={searchBox}
                style={{
                  margin: "10px 0px 5px 5px",
                  position: "absolute",
                  zIndex: 1,
                  width: "13rem",
                }}
                onChange={(e) => setSearchBox(e.target.value.toLowerCase())}
              />
            </Grid>
          ) : (
            ""
          )}

          {SearchSelect && SearchSelect === "date" ? (
            <>
              <Grid item xs={4} sm={4} md={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    views={["day"]}
                    label="Start Date"
                    value={startDate}
                    onChange={(e) => setStartDate(e)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        helperText={null}
                        style={{
                          margin: "10px 0px 5px 5px",
                          position: "absolute",
                          zIndex: 1,
                          // width: "13rem",
                        }}
                        size="small"
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={4} sm={4} md={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    views={["day"]}
                    label="End Date"
                    value={endDate}
                    onChange={(e) => setEndDate(e)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        helperText={null}
                        size="small"
                        style={{
                          margin: "10px 0px 5px 5px",
                          position: "absolute",
                          zIndex: 1,
                          // width: "13rem",
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </>
          ) : (
            ""
          )}
        </Grid>
        {sub_loading ? (
          <MaterialTable
            title=""
            columns={[
              {
                title: "S.NO",
                render: (rowData) => rowData.tableData.id + 1,
              },

              {
                title: "Name",
                field: "full_name",
                render: (rowData) => (
                  <span style={{ whiteSpace: "nowrap" }}>
                    {rowData.full_name
                      ? rowData.full_name.charAt(0).toUpperCase() +
                        rowData.full_name.slice(1)
                      : "N/A"}
                  </span>
                ),
              },

              {
                title: "Amount",
                field: "amount",
                render: (rowData) =>
                  rowData?.amount ? `$ ${rowData.amount}` : "",
              },
              {
                title: "Start Date",
                field: "start_date",
                render: (rowData) => (
                  <span style={{ whiteSpace: "nowrap" }}>
                    {rowData?.android_customer_id
                      ? moment(rowData?.start_date, "x").format(
                          "DD MMM YYYY hh:mm a"
                        )
                      : rowData?.ios_customer_id
                      ? moment(rowData?.start_date, "x").format(
                          "DD MMM YYYY hh:mm a"
                        )
                      : rowData?.start_date.toString().length > 10
                      ? moment(rowData?.start_date, "x").format(
                          "DD MMM YYYY hh:mm a"
                        )
                      : moment(rowData?.start_date * 1000).format(
                          "DD MMM YYYY hh:mm a"
                        )}
                  </span>
                ),
              },
              {
                title: "End Date",
                field: "end_date",
                render: (rowData) => (
                  <span style={{ whiteSpace: "nowrap" }}>
                    {/* you can right only one condition for all 
                     rowData?.end_date.toString().length > 10
                        ? moment(rowData?.end_date, "x").format(
                            "DD MMM YYYY hh:mm a"
                          )
                        : moment(rowData?.end_date * 1000).format(
                            "DD MMM YYYY hh:mm a"
                          )  */}
                    {rowData?.android_customer_id
                      ? rowData?.end_date.toString().length > 10
                        ? moment(rowData?.end_date, "x").format(
                            "DD MMM YYYY hh:mm a"
                          )
                        : moment(rowData?.end_date * 1000).format(
                            "DD MMM YYYY hh:mm a"
                          )
                      : rowData?.ios_customer_id
                      ? moment(rowData?.end_date, "x").format(
                          "DD MMM YYYY hh:mm a"
                        )
                      : rowData?.end_date.toString().length > 10
                      ? moment(rowData?.end_date, "x").format(
                          "DD MMM YYYY hh:mm a"
                        )
                      : moment(rowData?.end_date * 1000).format(
                          "DD MMM YYYY hh:mm a"
                        )}
                  </span>
                ),
              },
              {
                title: "Plan Id",
                field: "plan_id",
              },
              {
                title: "Subscription Id",
                field: "subscription_id",
                render: (rowData) => (
                  <>
                    <span style={{ whiteSpace: "nowrap", textAlign: "left" }}>
                      {rowData?.subscription_id?.substr(0, 20)}
                    </span>
                    {rowData?.subscription_id?.substring(20) ? "..." : ""}{" "}
                    <br />
                    <Link
                      to={{
                        pathname: "/backend/total-payment",
                        state: {
                          Id: rowData?.subscription_id,
                        },
                      }}
                    >
                      <small
                        style={{
                          color: "#0012e2",
                          float: "right",
                          cursor: "pointer",
                        }}
                        // onClick={() => modelForAddress(rowData.subscription_id)}
                      >
                        View all payments
                      </small>{" "}
                    </Link>
                  </>
                ),
              },
              {
                title: "Status",
                field: "status",
                render: (rowData) =>
                  rowData.status?.charAt(0).toUpperCase() +
                  rowData.status?.slice(1),
              },
              {
                title: "View",
                render: (rowData) => (
                  <Link
                    to={{
                      pathname: "/backend/subscription-details",
                      state: { rowData },
                    }}
                  >
                    <IconButton title="View">
                      <VisibilityIcon
                        style={{ color: "#f58222" }}
                        title="View"
                      />
                    </IconButton>
                  </Link>
                ),
                sorting: false,
              },
            ]}
            data={Subscription_List}
            options={{
              headerStyle: {
                // textAlign: "center",
                border: "2px solid #e6e4e4",
                // borderBottom: "1px solid black",
                width: 0,
                fontSize: "14px",
                whiteSpace: "nowrap",
                // textAlign: 'left',
                flexDirection: "row",
                overflow: "hidden",
                textOverflow: "ellipsis",
                // backgroundColor: theme.palette.primary.table
                backgroundColor: " #ee8b26 ",
                // fontWeight: "bold",
                color: "  white ",
              },
              cellStyle: {
                // textAlign: "center",
                borderRight: "2px solid #e6e4e4",
                flexDirection: "row",
                overflow: "hidden",
                padding: 5,
                paddingLeft: 2,
                fontSize: "14px",
              },
              exportButton: true,
              exportAllData: true,
              search: false,
              // search: SearchSelect && SearchSelect !== "allUser" ? true : false,
              sorting: true,
              debounceInterval: 700,
              padding: "dense",
            }}
          />
        ) : (
          <center>
            <img
              src="https://i.pinimg.com/originals/43/c7/a0/43c7a0928088b901910ab187816c8f65.gif"
              alt="avatar"
              width={100}
              height={100}
            />
          </center>
        )}
      </Card>
      <Dialog
        open={showSubsId}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="xs"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Subscription Id
        </BootstrapDialogTitle>

        <Card>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {subsIdData}
            </DialogContentText>
          </DialogContent>
        </Card>
      </Dialog>
    </DashboardLayout>
  );
};

export default Subscription;
