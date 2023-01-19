import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Link } from "react-router-dom";
// MUI component
import { Card, Grid } from "@mui/material";
import MaterialTable from "material-table";
import { IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import { getAllJobs, changeJobsStatus } from "redux/actions/action";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

//mui icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
// import DeleteIcon from "@mui/icons-material/Delete";

import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Css for add button
import "../pages.css";

toast.configure();

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// For model
const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 1, borderBottom: "2px solid grey" }} {...other}>
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

const Jobs = (props) => {
  let stateData = props.location.state;
  const [statusFil, setStatusF] = useState(stateData ? stateData : null);
  const [deleteJo, setDeleteJo] = useState(false);
  const [showFeed, setShowFeed] = useState(false);
  const [addressData, setAddress] = useState();
  const dispatch = useDispatch();
  const { allJobs } = useSelector((state) => state.allJobs);
  const { job_status } = useSelector((state) => state.job_status);
  // all job api action
  useEffect(() => {
    dispatch(getAllJobs());
  }, [job_status]);

  const { data } = allJobs;
  // function for status filter
  const statusFilter = () => {
    if (statusFil) {
      if (statusFil !== "all_job") {
        const dataF = data.filter((res) => res.status === statusFil);
        return dataF;
      } else if (statusFil === "all_job") {
        return data;
      }
    } else {
      return data;
    }
  };

  const statusChange = (e, id) => {
    const data = e + "/" + id;
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(changeJobsStatus(data));
      }
    });

    setDeleteJo(false);
  };

  const deleteJob = (data) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(changeJobsStatus(data));
        setDeleteJo(true);
      }
    });
  };

  useEffect(() => {
    if (job_status) {
      if (job_status.status === 1) {
        deleteJo
          ? Swal.fire("Job has been successfully deleted")
          : Swal.fire(job_status.message);
      }
    }
    setTimeout(() => {
      dispatch({ type: "JOBS_STATUS", payloade: "" });
    }, 1000);
  }, [job_status]);

  // useEffect(() => {
  //   if (userStatus) {
  //     if (userStatus.status === 1) {
  //       Swal.fire("Status Updated");
  //     }
  //   }
  //   setTimeout(() => {
  //     dispatch({ type: "USERSTATUSRES", payloade: "" });
  //   }, 1000);
  // }, [userStatus]);
  const modelForFeed = (data) => {
    setAddress(data);
    setShowFeed(true);
  };
  const handleClose = () => {
    setShowFeed(false);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card style={{ marginTop: "9px" }}>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6}>
            <select
              style={{
                margin: "10px 0px 5px 5px",
                borderRadius: "5px",
                position: "absolute",
                zIndex: 1,
                width: "145px",
              }}
              className="form-select addNew"
              value={statusFil}
              onChange={(e) => setStatusF(e.target.value)}
            >
              <option selected disabled>
                Select Status
              </option>
              <option value="all_job">All Jobs</option>
              <option value="active">Active</option>
              <option value="open">Open</option>
              <option value="cancel">Cancel</option>
              <option value="completed">Completed</option>
              {/* <option value="deleted">Deleted</option> */}
            </select>
          </Grid>
        </Grid>
        {data ? (
          <MaterialTable
            title=""
            columns={[
              {
                title: "S.NO",
                // field: "id",
                render: (rowData) => rowData.tableData.id + 1,
              },
              {
                title: "Job Title",
                field: "title",
                render: (rowData) => (rowData.title ? rowData.title : "N/A"),
              },
              {
                title: "Job ID",
                field: "title",
                render: (rowData) => (rowData.id ? rowData.id : "N/A"),
              },
              {
                title: "User Name",
                field: "userfullname",
                render: (rowData) =>
                  rowData.userfullname
                    ? rowData.userfullname.charAt(0).toUpperCase() +
                      rowData.userfullname.slice(1)
                    : "N/A",
              },

              {
                title: "Tradie Name",
                field: "full_name",
                render: (rowData) =>
                  rowData.full_name
                    ? rowData.full_name.charAt(0).toUpperCase() +
                      rowData.full_name.slice(1)
                    : "N/A",
              },
              {
                title: "Category",
                field: "tradie_type",
                render: (rowData) =>
                  rowData.tradie_type
                    ? rowData.tradie_type.charAt(0).toUpperCase() +
                      rowData.tradie_type.slice(1)
                    : "N/A",
              },
              {
                title: "Job Type",
                field: "service_type",
                render: (rowData) =>
                  rowData.service_type
                    ? rowData.service_type.charAt(0).toUpperCase() +
                      rowData.service_type.slice(1)
                    : "N/A",
              },
              {
                title: "Job Location ",
                field: "address",
                // render: (rowData) =>
                //   rowData.address ? rowData.address : "N/A",
                render: (rowData) => (
                  <>
                    <span style={{ whiteSpace: "nowrap" }}>
                      {rowData.address.substr(0, 20)}
                    </span>
                    <br />
                    {rowData.address.substring(20) ? (
                      <small
                        style={{
                          color: "#0012e2",
                          float: "right",
                          cursor: "pointer",
                        }}
                        onClick={() => modelForFeed(rowData.address)}
                      >
                        Read More
                      </small>
                    ) : (
                      ""
                    )}
                  </>
                ),
              },
              {
                title: "Date ",
                field: "date",
                render: (rowData) =>
                  rowData.date ? (
                    <span style={{ whiteSpace: "nowrap" }}>
                      {" "}
                      {moment(rowData.date).format("DD MMM YYYY") +
                        " " +
                        rowData.time}
                    </span>
                  ) : (
                    "N/A"
                  ),
              },
              {
                title: " Job Status ",
                field: "status",
                render: (rowData) => (
                  <select
                    value={rowData.status}
                    className="form-select"
                    onChange={(e) => statusChange(e.target.value, rowData.id)}
                    style={{ width: "130px" }}
                  >
                    <option value="active">Active</option>
                    <option value="open">Open</option>
                    <option value="completed">Completed</option>
                    <option value="cancel">Cancel</option>
                    {/* <option value="deleted">Deleted</option> */}
                  </select>
                ),
              },

              {
                title: "Action",
                render: (rowData) => (
                  <span style={{ whiteSpace: "nowrap" }}>
                    <IconButton title="View">
                      <Link to={"/backend/view-Job/" + rowData.id}>
                        <VisibilityIcon
                          style={{ color: "#f58222" }}
                          title="View"
                        />
                      </Link>
                    </IconButton>

                    {/* <IconButton
                      title="Delete"
                      onClick={() => deleteJob("deleted/" + rowData.id)}
                    >
                      <DeleteIcon style={{ color: "red" }} title="Delete" />
                    </IconButton> */}
                  </span>
                ),
                sorting: false,
              },
            ]}
            data={statusFilter()}
            options={{
              headerStyle: {
                textAlign: "center",

                width: 0,
                fontSize: "14px",
                whiteSpace: "nowrap",
                border: "2px solid white",
                flexDirection: "row",
                overflow: "hidden",
                textOverflow: "ellipsis",

                backgroundColor: " #ee8b26 ",

                color: "white ",
              },
              cellStyle: {
                textAlign: "center",
                flexDirection: "row",
                overflow: "hidden",
                fontSize: "14px",
              },
              sorting: true,
              exportButton: true,
              exportAllData: true,
              debounceInterval: 700,
              padding: "dense",
              pageSize: 10,
            }}
          />
        ) : (
          <center>
            {/* <CircularProgress color="secondary" /> */}
            <img
              src="https://i.pinimg.com/originals/43/c7/a0/43c7a0928088b901910ab187816c8f65.gif"
              alt="avatar"
              width={100}
              height={100}
            />
          </center>
        )}
        <Dialog
          open={showFeed}
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
            Address
          </BootstrapDialogTitle>

          <Card>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                {addressData}
              </DialogContentText>
            </DialogContent>
          </Card>
        </Dialog>
      </Card>
    </DashboardLayout>
  );
};

export default Jobs;
