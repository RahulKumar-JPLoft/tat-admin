import React, { Fragment, useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Link } from "react-router-dom";
import MaterialTable from "material-table";
import { IconButton, Card } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Avatar from "@mui/material/Avatar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import DummyProfile from "../../../assets/images/user.png";
import StarRatings from "react-star-ratings";
import { useDispatch, useSelector } from "react-redux";
import { userHireTradie } from "redux/actions/action";
import moment from "moment";

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

const TotalHiring = (props) => {
  const Id = props.match.params.id;
  const [showAddress, setShowAddress] = useState(false);
  const [addressData, setAddressData] = useState();
  const dispatch = useDispatch();
  const { userHiring } = useSelector((state) => state.userHiring);

  useEffect(() => {
    if (Id) {
      dispatch(userHireTradie(Id));
    }
  }, [Id]);
  const { data } = userHiring;
  let tradieRating;
  for (let i = 0; i >= data?.length; i++) {
    tradieRating = data ? Math.round(Number(data[i].rating) * 10) / 10 : "";
  }
  const modelForAddress = (data) => {
    setAddressData(data);
    setShowAddress(true);
  };
  const handleClose = () => {
    setShowAddress(false);
  };
  // console.log("useHiring :", data);
  return (
    <Fragment>
      <DashboardLayout>
        <DashboardNavbar />
        {data && Object.keys(data).length ? (
          <MaterialTable
            title=""
            columns={[
              {
                title: "S.NO",
                // field: "id",
                render: (rowData) => rowData.tableData.id + 1,
              },
              { title: "Job Title", field: "title" },

              {
                title: "Image",
                // field: "image",
                render: (rowData) => (
                  <Avatar
                    alt="profile"
                    src={
                      rowData && rowData.profile_pic
                        ? `https://api.tapatradie.com/profile/${rowData.id}/` +
                          rowData.profile_pic
                        : DummyProfile
                    }
                  />
                ),
              },
              {
                title: "Tradie Name",
                field: "tradiName",
                render: (rowData) => (
                  <Link to={"/backend/view-tradie/" + rowData.tradiId}>
                    {rowData.tradiName}
                  </Link>
                ),
              },
              {
                title: "Rating",
                field: "rating",
                render: (rowData) => (
                  <span style={{ whiteSpace: "nowrap" }}>
                    <StarRatings
                      rating={tradieRating}
                      starRatedColor="orange"
                      numberOfStars={5}
                      name="rating"
                      starSpacing="1px"
                      starDimension="15px"
                    />
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
                field: "date",
                render: (rowData) =>
                  moment(rowData.date).format("YYYY-MM-DD HH:mm"),
              },
              {
                title: "Tradie Type ",
                field: "tradie_type",
              },
              {
                title: "Status",
                field: "user_status",
              },
              {
                title: "Action",
                render: (rowData) => (
                  <span style={{ whiteSpace: "nowrap" }}>
                    <Link to={"/backend/view-Job/" + rowData.id}>
                      <IconButton title="View">
                        <VisibilityIcon style={{ color: "#f58222" }} />
                      </IconButton>
                    </Link>
                    {/* <IconButton title="Delete">
                      <DeleteIcon style={{ color: "red" }} />
                    </IconButton> */}
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
      </DashboardLayout>
    </Fragment>
  );
};

export default TotalHiring;
