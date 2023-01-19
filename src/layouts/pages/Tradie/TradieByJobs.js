import React, { Fragment, useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import MaterialTable from "material-table";
import { Card, IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import { useDispatch, useSelector } from "react-redux";
import { JobsByTradiess } from "redux/actions/action";
import moment from "moment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
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

const JobsByTradie = (props) => {
  const Id = props.match.params.id;
  const [showAddress, setShowAddress] = useState(false);
  const [addressData, setAddressData] = useState();

  const dispatch = useDispatch();
  const { jobsByTradieList } = useSelector((state) => state.jobsByTradieList);

  useEffect(() => {
    if (Id) {
      dispatch(JobsByTradiess(Id));
    }
  }, [Id]);
  const data = jobsByTradieList.data ? jobsByTradieList.data.data : null;

  const modelForAddress = (data) => {
    setAddressData(data);
    setShowAddress(true);
  };
  const handleClose = () => {
    setShowAddress(false);
  };

  return (
    <Fragment>
      <DashboardLayout>
        <DashboardNavbar />
        <Card style={{ marginTop: "9px" }}>
          {data && data !== null ? (
            <MaterialTable
              title=""
              columns={[
                {
                  title: "S.NO",
                  // field: "id",
                  render: (rowData) => rowData.tableData.id + 1,
                },
                // { title: "Category", field: "category" },
                { title: "Job Title", field: "title" },

                // {
                //   title: "Tradie Name",
                //   field: "full_name",
                // },
                {
                  title: "User Name",
                  field: "userfullname",
                  render: (rowData) => (
                    <span style={{ whiteSpace: "nowrap" }}>
                      {rowData.userfullname}{" "}
                    </span>
                  ),
                },

                {
                  title: "Mobile",
                  field: "mobile",
                  render: (rowData) => (
                    <span style={{ whiteSpace: "nowrap" }}>
                      {rowData.country_code + " " + rowData.mobile}
                    </span>
                  ),
                },

                {
                  title: "Job Location",
                  field: "address",
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
                          onClick={() => modelForAddress(rowData.address)}
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
                  field: "created_on",
                  render: (rowData) => (
                    <span style={{ whiteSpace: "nowrap" }}>
                      {moment(rowData.created_on, "x").format(
                        "DD MMM YYYY hh:mm a"
                      )}
                    </span>
                  ),
                },
                {
                  title: "Tradie Type ",
                  field: "tradie_type",
                },
                {
                  title: "Job Type ",
                  field: "type",
                },
                {
                  title: "Status",
                  field: "status",
                },
                {
                  title: "View",
                  render: (rowData) => (
                    <span style={{ whiteSpace: "nowrap" }}>
                      <Link to={"/backend/view-Job/" + rowData.id}>
                        <IconButton title="View">
                          <VisibilityIcon
                            style={{ color: "#f58222" }}
                            title="View"
                          />
                        </IconButton>
                      </Link>
                    </span>
                  ),
                  sorting: false,
                },
              ]}
              data={data}
              options={{
                headerStyle: {
                  textAlign: "center",
                  border: "2px solid white",
                  width: 0,
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                  flexDirection: "row",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  backgroundColor: " #ee8b26 ",
                  color: " white ",
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
          <Dialog
            open={showAddress}
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
    </Fragment>
  );
};

export default JobsByTradie;
