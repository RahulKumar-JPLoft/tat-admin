import { Fragment, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Card, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { SingleUserAction } from "redux/actions/action";
import DummyProfile from "../../../assets/images/user.png"
import moment from "moment";

const ViewUser = (props) => {
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
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Card>
        {data ? (
          <Fragment>
            <Grid container spacing={2} style={{ margin: "5px" }}>
              <Grid item xs={12} sm={3}>
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
                        ?  `https://api.tapatradie.com/profile/${Id}/`+singleUserData.profile_pic
                        : DummyProfile
                    }
                    alt="avatar"
                    style={{ maxWidth: "100%" }}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <h3 style={{ marginTop: "5vh" }}>
                  {singleUserData.full_name
                    ? singleUserData.full_name.charAt(0).toUpperCase() +
                      singleUserData.full_name.slice(1)
                    : "N/A"}
                </h3>
              </Grid>
            </Grid>
            <hr />
            <Grid container spacing={2} style={{ margin: "5px" }}>
              <Grid item xs={5} md={4} lg={4} sm={5}>
                <h5>Full Name:</h5>
              </Grid>
              <Grid item xs={7} md={8} lg={8} sm={7}>
                <span style={{ fontSize: "15px", fontWeight: "normal" }}>
                  {singleUserData.full_name
                    ? singleUserData.full_name.charAt(0).toUpperCase() +
                      singleUserData.full_name.slice(1)
                    : "N/A"}
                </span>
              </Grid>

              <Grid item xs={5} md={4} lg={4} sm={5}>
                <h5>Email:</h5>
              </Grid>
              <Grid item xs={7} md={8} lg={8} sm={7}>
                {" "}
                <span style={{ fontSize: "15px", fontWeight: "normal" }}>
                  {singleUserData.email ? singleUserData.email : "N/A"}
                </span>
              </Grid>
              <Grid item xs={5} md={4} lg={4} sm={5}>
                <h5>Mobile: </h5>
              </Grid>
              <Grid item xs={7} md={8} lg={8} sm={7}>
                {" "}
                <span style={{ fontSize: "15px", fontWeight: "normal" }}>
                  {singleUserData?.country_code + " " + singleUserData?.mobile}
                </span>
              </Grid>
              <Grid item xs={5} md={4} lg={4} sm={5}>
                <h5>Gender: </h5>
              </Grid>
              <Grid item xs={7} md={8} lg={8} sm={7}>
                <span style={{ fontSize: "15px", fontWeight: "normal" }}>
                  {singleUserData.gender
                    ? singleUserData.gender.charAt(0).toUpperCase() +
                      singleUserData.gender.slice(1)
                    : "N/A"}
                </span>
              </Grid>
              <Grid item xs={5} md={4} lg={4} sm={5}>
                <h5>DOB: </h5>
              </Grid>
              <Grid item xs={7} md={8} lg={8} sm={7}>
                {" "}
                <span style={{ fontSize: "15px", fontWeight: "normal" }}>
                  {dateDOB ? dateDOB : "N/A"}
                </span>
              </Grid>
              <Grid item xs={5} md={4} lg={4} sm={5}>
                <h5>Country: </h5>
              </Grid>
              <Grid item xs={7} md={8} lg={8} sm={7}>
                {" "}
                <span style={{ fontSize: "15px", fontWeight: "normal" }}>
                  {singleUserData.country ? singleUserData.country : "N/A"}
                </span>
              </Grid>
              <Grid item xs={5} md={4} lg={4} sm={5}>
                <h5>City: </h5>
              </Grid>
              <Grid item xs={7} md={8} lg={8} sm={7}>
                {" "}
                <span style={{ fontSize: "15px", fontWeight: "normal" }}>
                  {singleUserData.city ? singleUserData.city : "N/A"}
                </span>
              </Grid>
              <Grid item xs={5} md={4} lg={4} sm={5}>
                <h5>Latitude: </h5>
              </Grid>
              <Grid item xs={7} md={8} lg={8} sm={7}>
                <span style={{ fontSize: "15px", fontWeight: "normal" }}>
                  {singleUserData.latitude ? singleUserData.latitude : "N/A"}
                </span>
              </Grid>
              <Grid item xs={5} md={4} lg={4} sm={5}>
                <h5>Longitude: </h5>
              </Grid>
              <Grid item xs={6} md={8} lg={8} sm={6}>
                {" "}
                <span style={{ fontSize: "15px", fontWeight: "normal" }}>
                  {singleUserData.longitude ? singleUserData.longitude : "N/A"}
                </span>
              </Grid>
              <Grid item xs={5} md={4} lg={4} sm={5}>
                <h5>Status: </h5>
              </Grid>
              <Grid item xs={7} md={8} lg={8} sm={7}>
                <span style={{ fontSize: "15px", fontWeight: "normal" }}>
                  {singleUserData.status
                    ? singleUserData.status.charAt(0).toUpperCase() +
                      singleUserData.status.slice(1)
                    : "N/A"}
                </span>
              </Grid>
            </Grid>
          </Fragment>
        ) : (
          ""
        )}
      </Card>
    </DashboardLayout>
  );
};

export default ViewUser;
