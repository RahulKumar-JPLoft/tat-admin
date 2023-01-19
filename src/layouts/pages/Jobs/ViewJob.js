import React, { useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
// MUI component
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getSingleJobs } from "../../../redux/actions/action";
import moment from "moment";
import Headers from "./Headers";

const ViewJob = (props) => {
  const Id = props.match.params.id;

  const dispatch = useDispatch();
  const { singleJobs } = useSelector((state) => state.singleJobs);

  useEffect(() => {
    if (Id) {
      dispatch(getSingleJobs(Id));
    }
  }, [Id]);

  const { data } = singleJobs;

  //   const dateCre= data.providerAddress.created_on
  //   const createdDate = moment(dateCre).format("YYYY-MM-DD ")

  //   console.log(createdDate)
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {data && data !== null ? (
        <Headers JobTitle={data.data.title} Rating={data?.data?.rating} />
      ) : (
        ""
      )}
      <SuiBox mt={2} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} xl={4}>
            {data && data !== null ? (
              <ProfileInfoCard
                title="Jobs Description"
                info={{
                  jobTitle: data.data.title
                    ? data?.data?.title?.charAt(0).toUpperCase() +
                      data?.data?.title?.slice(1)
                    : "N/A",
                  jobDetails: data?.data?.detail ? data?.data?.detail : "N/A",
                  tradieType: data.data.tradie_type
                    ? data?.data?.tradie_type?.charAt(0).toUpperCase() +
                      data?.data?.tradie_type?.slice(1)
                    : "N/A",
                  serviceType: data?.data?.service_type
                    ? data?.data?.service_type
                    : "N/A",
                  status: data?.data?.status ? data?.data?.status : "N/A",
                  date: data.data?.date
                    ? moment(data?.data?.date).format("DD MMM YYYY")
                    : "N/A",
                  time: data.data.time ? data?.data?.time : "N/A",
                  feedback: data?.data?.review ? data?.data?.review : "N/A",
                  dispute: data?.data?.dispute === 0 ? "No" : "Yes",
                  disputeReason: data?.data?.dispute_resion
                    ? data?.data?.dispute_resion
                    : "N/A",
                }}
              />
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            {data && data !== null && data.providerAddress ? (
              <ProfileInfoCard
                title="Tradie Details"
                info={{
                  tradieName: data?.data?.jobs
                    ? data?.data?.jobs[0]?.full_name?.charAt(0).toUpperCase() +
                      data?.data?.jobs[0]?.full_name?.slice(1)
                    : "N/A",
                  email: data?.data?.jobs[0]?.email
                    ? data?.data?.jobs[0]?.email
                    : "N/A",
                  mobile: data?.data?.jobs[0]?.mobile
                    ? data?.data?.jobs[0]?.mobile
                    : "N/A",
                  city: data?.providerAddress?.city
                    ? data?.providerAddress?.city
                    : "N/A",
                  state: data?.providerAddress?.state
                    ? data?.providerAddress?.state
                    : "N/A",
                  country: data?.providerAddress?.country
                    ? data?.providerAddress?.country
                    : "N/A",
                  latitude: data?.providerAddress?.latitude
                    ? data?.providerAddress?.latitude
                    : "N/A",
                  longitude: data?.providerAddress?.longitude
                    ? data?.providerAddress?.longitude
                    : "N/A",
                  // location_name: data.providerAddress.location_name
                  //   ? data.providerAddress.location_name
                  //   : "N/A",
                  status: data?.providerAddress?.status
                    ? data?.providerAddress?.status
                    : "N/A",
                  status: data?.providerAddress?.status
                    ? data?.providerAddress?.status
                    : "N/A",
                  created_on: data?.providerAddress?.created_on
                    ? moment(data?.providerAddress?.created_on, "x").format(
                        "DD MMM YYYY hh:mm a"
                      )
                    : "N/A",
                  address: data?.providerAddress?.address
                    ? data?.providerAddress?.address
                    : "N/A",
                }}
              />
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            {data && data !== null ? (
              <ProfileInfoCard
                title="User Details"
                info={{
                  username: data?.data?.full_name
                    ? data?.data?.full_name?.charAt(0).toUpperCase() +
                      data?.data?.full_name?.slice(1)
                    : "N/A",
                  email: data.data.email ? data?.data?.email : "N/A",
                  mobile: data?.data?.mobile ? data?.data?.mobile : "N/A",
                  city: data?.userAddress?.city ? data?.userAddress?.city : "N/A",
                  state: data?.userAddress?.state
                    ? data?.userAddress?.state
                    : "N/A",
                  country: data?.userAddress?.country
                    ? data?.userAddress?.country
                    : "N/A",
                  latitude: data?.userAddress?.latitude
                    ? data?.userAddress?.latitude
                    : "N/A",
                  longitude: data?.userAddress?.longitude
                    ? data?.userAddress?.longitude
                    : "N/A",
                  // location_name: data.userAddress.location_name
                  //   ? data.userAddress.location_name
                  //   : "N/A",
                  status: data?.userAddress?.status
                    ? data?.userAddress?.status
                    : "N/A",
                  status: data?.userAddress?.status
                    ? data?.userAddress?.status
                    : "N/A",
                  created_on: data?.userAddress?.created_on
                    ? moment(data?.userAddress?.created_on, "x").format(
                        "DD MMM YYYY hh:mm a"
                      )
                    : "N/A",
                  address: data?.userAddress?.address
                    ? data?.userAddress?.address
                    : "N/A",
                }}
              />
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </SuiBox>
    </DashboardLayout>
  );
};

export default ViewJob;
