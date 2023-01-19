import React, { Fragment, useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Card, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { SingleUserAction } from "redux/actions/action";
import DummyProfile from "../../../assets/images/user.png";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import moment from "moment";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import "./tradie.css";
import { IconButton } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          style={{
            right: "15px",
            backgroundColor: "rgb(238, 139, 38)",
            color: "white",
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const ViewTradie = (props) => {
  const Id = props.match.params.id;
  const dispatch = useDispatch();
  const { singleUser } = useSelector((state) => state.singleUser);

  useEffect(() => {
    if (Id) {
      dispatch(SingleUserAction(Id));
    }
  }, [Id]);
  const { data } = singleUser;
  const singleUserData = data ? data[0] : "";

  const dateDOB = moment(singleUserData.dob).format("YYYY-MM-DD");

  const [models, Setmodel] = useState(false);
  const [imgpath, Setimagepath] = useState("");

  const [moredatas, Setmoredatas] = useState(false);
  const [moredata, Setmoredata] = useState("");

  const modelForFeed = (e) => {
    Setimagepath(e.target.src);
    Setmodel(true);
  };
  const handleClose = () => {
    Setmodel(false);
    Setimagepath("");
    Setmoredatas(false);
  };

  const readmores = (data) => {
    Setmoredatas(true);
    Setmoredata(data);
  };

  let cate =
    data && data.length > 0
      ? singleUserData.category_data.map((res) => {
          return res.name?.charAt(0).toUpperCase() + res.name?.slice(1);
        })
      : "";
  // console.log("CAte",cate.toString())

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        {data ? (
          <Fragment>
            <Grid container spacing={3} style={{ margin: "5px" }}>
              <Grid item xs={6} sm={4}>
                <div
                  style={{
                    width: "8rem",
                    height: "8rem",
                    alignItems: "center",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={
                      singleUserData.profile_pic
                        ? `https://api.tapatradie.com/profile/${Id}/` +
                          singleUserData.profile_pic
                        : DummyProfile
                    }
                    alt="avatar"
                    style={{ maxWidth: "100%" }}
                  />
                </div>
              </Grid>
              <Grid item xs={6} sm={6}>
                <h3 style={{ marginTop: "5vh" }}>
                  {singleUserData.full_name
                    ? singleUserData?.full_name?.charAt(0).toUpperCase() +
                      singleUserData?.full_name?.slice(1)
                    : "N/A"}
                </h3>
              </Grid>
            </Grid>
            <hr />
            <Grid container spacing={3} style={{ margin: "5px" }}>
              <Grid item xs={5} md={4} lg={4} sm={5}>
                <h5>Full Name:-</h5>
              </Grid>
              <Grid item xs={7} md={8} lg={8} sm={7}>
                <span style={{ fontSize: "15px", fontWeight: "normal" }}>
                  {singleUserData.full_name
                    ? singleUserData?.full_name?.charAt(0).toUpperCase() +
                      singleUserData?.full_name?.slice(1)
                    : "N/A"}
                </span>
              </Grid>
              <Grid item md={4} lg={4} xs={5} sm={5}>
                <h5>Email:</h5>
              </Grid>
              <Grid item xs={7} md={8} lg={8} sm={7}>
                {" "}
                <span style={{ fontSize: "15px", fontWeight: "normal" }}>
                  {singleUserData.email ? singleUserData?.email : "N/A"}
                </span>
              </Grid>
              <Grid item md={4} lg={4} xs={5} sm={5}>
                <h5>Mobile: </h5>
              </Grid>
              <Grid item md={6} md={8} lg={8} sm={7}>
                {" "}
                <span style={{ fontSize: "15px", fontWeight: "normal" }}>
                  {singleUserData?.country_code + "" + singleUserData?.mobile}
                </span>
              </Grid>
              <Grid item md={4} lg={4} xs={5} sm={5}>
                <h5>Gender: </h5>
              </Grid>
              <Grid item md={8} lg={8} xs={7} sm={7}>
                <span style={{ fontSize: "15px", fontWeight: "normal" }}>
                  {singleUserData.gender
                    ? singleUserData.gender.charAt(0).toUpperCase() +
                      singleUserData.gender.slice(1)
                    : "N/A"}
                </span>
              </Grid>
              <Grid item md={4} lg={4} xs={5} sm={5}>
                <h5>DOB: </h5>
              </Grid>
              <Grid item md={8} lg={8} xs={7} sm={7}>
                {" "}
                <span style={{ fontSize: "15px", fontWeight: "normal" }}>
                  {dateDOB ? dateDOB : "N/A"}
                </span>
              </Grid>
              <Grid item md={4} lg={4} xs={5} sm={5}>
                <h5>Country: </h5>
              </Grid>
              <Grid item md={8} lg={8} xs={7} sm={7}>
                {" "}
                <span style={{ fontSize: "15px", fontWeight: "normal" }}>
                  {singleUserData.country ? singleUserData.country : "N/A"}
                </span>
              </Grid>
              <Grid item md={4} lg={4} xs={5} sm={5}>
                <h5>City: </h5>
              </Grid>
              <Grid item md={8} lg={8} xs={7} sm={7}>
                {" "}
                <span style={{ fontSize: "15px", fontWeight: "normal" }}>
                  {singleUserData.city ? singleUserData.city : "N/A"}
                </span>
              </Grid>
              <Grid item md={4} lg={4} xs={5} sm={5}>
                <h5>Professional Experience : </h5>
              </Grid>
              <Grid item md={8} lg={8} xs={7} sm={7}>
                <span style={{ fontSize: "15px", fontWeight: "normal" }}>
                  {singleUserData.professional_experience
                    ? singleUserData.professional_experience
                    : "N/A"}
                </span>
              </Grid>
              {/* <Grid item md={6} lg={6} xs={6} sm={5}>
                <h5>Latitude: </h5>
              </Grid>
              <Grid item md={6} lg={6} xs={6} sm={5}>
                <span style={{ fontSize: "15px", fontWeight: "normal" }}>
                  {singleUserData.latitude ? singleUserData.latitude : "N/A"}
                </span>
              </Grid>
              <Grid item md={6} lg={6} xs={6} sm={5}>
                <h5>Longitude: </h5>
              </Grid>
              <Grid item md={6} lg={6} xs={6} sm={5}>
                {" "}
                <span style={{ fontSize: "15px", fontWeight: "normal" }}>
                  {singleUserData.longitude ? singleUserData.longitude : "N/A"}
                </span>
              </Grid> */}
              <Grid item md={4} lg={4} xs={5} sm={5}>
                <h5>Status: </h5>
              </Grid>
              <Grid item md={8} lg={8} xs={7} sm={7}>
                <span style={{ fontSize: "15px", fontWeight: "normal" }}>
                  {singleUserData.status
                    ? singleUserData.status?.charAt(0).toUpperCase() +
                      singleUserData?.status?.slice(1)
                    : "N/A"}
                </span>
              </Grid>
              <Grid item md={4} lg={4} xs={5} sm={5}>
                <h5>Category: </h5>
              </Grid>
              <Grid item md={4} lg={6} xs={12} sm={12}>
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: "normal",
                    marginRight: "50px",
                  }}
                  className="categoriess"
                >
                  {cate.toString()}
                  {/* {cate.toString().substring(70) ? (
                      <small
                        style={{
                          color: "#0012e2",
                          float: "right",
                          cursor: "pointer",
                        }}
                        onClick={() => readmores(cate.toString())}
                      >
                        Read More
                      </small>
                    ) : (
                      ""
                    )} */}
                </span>
              </Grid>
              {/* <Grid item md={6} lg={6} xs={6} sm={5}>
                <h5>Subscription Status: </h5>
              </Grid>
              <Grid item md={6} lg={6} xs={6} sm={5}>
                <span style={{ fontSize: "15px", fontWeight: "normal" }}>
                  {singleUserData.subscription_status
                    ? singleUserData.subscription_status
                    : "N/A"}
                </span>
              </Grid> */}
            </Grid>
            <hr />

            <Grid container spacing={3} style={{ margin: "5px" }}>
              <Grid item md={12} lg={12} xs={12} sm={12}>
                <h5>Business Details/Address </h5>
              </Grid>
              <Grid item md={4} lg={4} xs={5} sm={5}>
                <h5>Business Name : </h5>
              </Grid>
              <Grid item md={8} lg={8} xs={7} sm={7}>
                <span style={{ fontSize: "15px", fontWeight: "normal" }}>
                  {singleUserData.business_name
                    ? singleUserData.business_name
                    : "N/A"}
                </span>
              </Grid>
              <Grid item md={4} lg={4} xs={5} sm={5}>
                <h5>License Number : </h5>
              </Grid>
              <Grid item md={8} lg={8} xs={7} sm={7}>
                <span style={{ fontSize: "15px", fontWeight: "normal" }}>
                  {singleUserData.license_number
                    ? singleUserData.license_number
                    : "N/A"}
                </span>
              </Grid>
              <Grid item md={4} lg={4} xs={5} sm={5}>
                <h5>House/Flat Number : </h5>
              </Grid>
              <Grid item md={8} lg={8} xs={7} sm={7}>
                <span style={{ fontSize: "15px", fontWeight: "normal" }}>
                  {singleUserData?.business_Address[0]?.house_no
                    ? singleUserData.business_Address[0]?.house_no
                    : "N/A"}
                </span>
              </Grid>
              <Grid item md={4} lg={4} xs={5} sm={5}>
                <h5>Postcode/ Zipcode : </h5>
              </Grid>
              <Grid item md={8} lg={8} xs={7} sm={7}>
                <span style={{ fontSize: "15px", fontWeight: "normal" }}>
                  {singleUserData?.business_Address[0]?.pincode
                    ? singleUserData.business_Address[0]?.pincode
                    : "N/A"}
                </span>
              </Grid>
              <Grid item md={4} lg={4} xs={5} sm={5}>
                <h5>Country : </h5>
              </Grid>
              <Grid item md={8} lg={8} xs={7} sm={7}>
                <span style={{ fontSize: "15px", fontWeight: "normal" }}>
                  {singleUserData?.business_Address[0]?.country
                    ? singleUserData.business_Address[0]?.country
                    : "N/A"}
                </span>
              </Grid>
              <Grid item md={4} lg={4} xs={5} sm={5}>
                <h5>State : </h5>
              </Grid>
              <Grid item md={8} lg={8} xs={7} sm={7}>
                <span style={{ fontSize: "15px", fontWeight: "normal" }}>
                  {singleUserData?.business_Address[0]?.state
                    ? singleUserData.business_Address[0]?.state
                    : "N/A"}
                </span>
              </Grid>
              <Grid item md={4} lg={4} xs={5} sm={5}>
                <h5>City : </h5>
              </Grid>
              <Grid item md={8} lg={8} xs={7} sm={7}>
                <span style={{ fontSize: "15px", fontWeight: "normal" }}>
                  {singleUserData?.business_Address[0]?.city
                    ? singleUserData.business_Address[0]?.city
                    : "N/A"}
                </span>
              </Grid>
              <Grid item md={4} lg={4} xs={5} sm={5}>
                <h5>Street : </h5>
              </Grid>
              <Grid item md={8} lg={8} xs={7} sm={7}>
                <span style={{ fontSize: "15px", fontWeight: "normal" }}>
                  {singleUserData?.business_Address[0]?.street
                    ? singleUserData.business_Address[0]?.street
                    : "N/A"}
                </span>
              </Grid>
              <Grid item md={4} lg={4} xs={5} sm={5}>
                <h5>Working Radius : </h5>
              </Grid>
              <Grid item md={8} lg={8} xs={7} sm={7}>
                <span style={{ fontSize: "15px", fontWeight: "normal" }}>
                  {singleUserData?.working_radius
                    ? singleUserData.working_radius
                    : "N/A"}
                </span>
              </Grid>
            </Grid>
            <hr />
            <Grid container spacing={3} style={{ margin: "5px" }}>
              <Grid item xs={12} sm={12}>
                <h5>Work Photos </h5>
              </Grid>
              {singleUserData?.gallery?.map((val, i) => (
                <Grid item xs={16} sm={4} md={4} key={i}>
                  <img
                    src={
                      `https://api.tapatradie.com/gallery/${Id}/` + val.image
                    }
                    alt="image"
                    style={{ maxWidth: "80%", cursor: "pointer" }}
                    onClick={modelForFeed}
                  />
                </Grid>
              ))}
            </Grid>
          </Fragment>
        ) : (
          ""
        )}
      </Card>
      <Dialog
        open={models}
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
          Work Photos
        </BootstrapDialogTitle>

        <Card>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <img src={imgpath} alt="workimg" height="100%" width="100%" />
            </DialogContentText>
          </DialogContent>
        </Card>
      </Dialog>

      <Dialog
        open={moredatas}
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
          Category
        </BootstrapDialogTitle>

        <Card>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {moredata}
            </DialogContentText>
          </DialogContent>
        </Card>
      </Dialog>
    </DashboardLayout>
  );
};

export default ViewTradie;
