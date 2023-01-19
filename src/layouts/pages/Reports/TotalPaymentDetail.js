import React, { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useDispatch, useSelector } from "react-redux";
import { totalPayment } from "redux/actions/action";
import MaterialTable from "material-table";
// MUI component
import { Card, IconButton, Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";

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

const TotalPaymentDetail = (props) => {
  const Id = props?.location.state?.Id;
  const dispatch = useDispatch();
  const sub_id = `subscription_id=${Id}`;

  useEffect(() => {
    if (Id) {
      dispatch(totalPayment(sub_id));
    }
  }, [Id]);

  const { total_payment_data } = useSelector(
    (state) => state.Subscription_List
  );
  // const reducer = (accumulator, curr) => accumulator + curr;

  let sum = () => {
    let total = 0;
    total_payment_data?.map((val) => {
      total += Number(val.amount);
    });
    return total;
  };

  // for (let i = 0; i < total_payment_data.length; i++) {
  //   sum += total_payment_data[i]?.amount;
  // }
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
            <input
              type="text"
              className="form-control searchBox"
              value={`Total amount received: $${sum().toFixed(2)}`}
              style={{
                margin: "10px 0px 5px 5px",
                position: "absolute",
                zIndex: 1,
                width: "16rem",
                fontSize: "15px",
              }}
              readOnly
            />
          </Grid>
        </Grid>
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
                  {rowData?.start_date.toString().length > 10
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
                  {rowData?.end_date.toString().length > 10
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

                  {rowData?.subscription_id?.substring(20)
                    ? "..."
                    : // <small
                      //   style={{
                      //     color: "#0012e2",
                      //     float: "right",
                      //     cursor: "pointer",
                      //   }}
                      //   onClick={() => modelForAddress(rowData.subscription_id)}
                      // >
                      //   Read More
                      // </small>
                      ""}
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
                    <VisibilityIcon style={{ color: "#f58222" }} title="View" />
                  </IconButton>
                </Link>
              ),
              sorting: false,
            },
          ]}
          data={total_payment_data}
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
      </Card>
    </DashboardLayout>
  );
};

export default TotalPaymentDetail;
