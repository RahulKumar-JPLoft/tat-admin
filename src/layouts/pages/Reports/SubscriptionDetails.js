import React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Card, Grid } from "@mui/material";
import moment from "moment";

const SubscriptionDetails = (props) => {
  const subscriptionData = props?.location.state?.rowData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card style={{ margin: "5px" }}>
        <Grid container spacing={3} style={{ margin: "5px" }}>
          <Grid item xs={5} md={4} lg={4} sm={5}>
            <h6>Tradie Name:</h6>
          </Grid>
          <Grid item xs={7} md={8} lg={8} sm={7}>
            <span style={{ fontSize: "15px", fontWeight: "normal" }}>
              {subscriptionData?.full_name
                ? subscriptionData?.full_name?.charAt(0).toUpperCase() +
                  subscriptionData?.full_name?.slice(1)
                : "N/A"}
            </span>
          </Grid>
          <Grid item xs={5} md={4} lg={4} sm={5}>
            <h6>Plan Price:</h6>
          </Grid>
          <Grid item xs={7} md={8} lg={8} sm={7}>
            <span style={{ fontSize: "15px", fontWeight: "normal" }}>
              {subscriptionData?.amount
                ? `$ ${subscriptionData?.amount}`
                : "N/A"}
            </span>
          </Grid>
          <Grid item xs={5} md={4} lg={4} sm={5}>
            <h6>Plan Name:</h6>
          </Grid>
          <Grid item xs={7} md={8} lg={8} sm={7}>
            <span style={{ fontSize: "15px", fontWeight: "normal" }}>
              {subscriptionData?.plandescription
                ? subscriptionData?.plandescription
                : "N/A"}
            </span>
          </Grid>
          <Grid item xs={5} md={4} lg={4} sm={5}>
            <h6>Plan Id:</h6>
          </Grid>
          <Grid item xs={7} md={8} lg={8} sm={7}>
            <span style={{ fontSize: "15px", fontWeight: "normal" }}>
              {subscriptionData?.plan_id ? subscriptionData?.plan_id : "N/A"}
            </span>
          </Grid>
          <Grid item xs={5} md={4} lg={4} sm={5}>
            <h6>Payment Status:</h6>
          </Grid>
          <Grid item xs={7} md={8} lg={8} sm={7}>
            <span style={{ fontSize: "15px", fontWeight: "normal" }}>
              {subscriptionData?.payment_status
                ? subscriptionData?.payment_status?.charAt(0).toUpperCase() +
                  subscriptionData?.payment_status?.slice(1)
                : "N/A"}
            </span>
          </Grid>

          <Grid item xs={5} md={4} lg={4} sm={5}>
            <h6>Subscription Id:</h6>
          </Grid>
          <Grid item xs={5} md={7} lg={7} sm={5}>
            <span style={{ fontSize: "15px", fontWeight: "normal" }}>
              {subscriptionData?.subscription_id
                ? subscriptionData?.subscription_id
                : "N/A"}
            </span>
          </Grid>
          <Grid item xs={5} md={4} lg={4} sm={5}>
            <h6>Order Id:</h6>
          </Grid>
          <Grid item xs={7} md={8} lg={8} sm={7}>
            <span style={{ fontSize: "15px", fontWeight: "normal" }}>
              {subscriptionData?.order_id ? subscriptionData?.order_id : "N/A"}
            </span>
          </Grid>
          <Grid item xs={5} md={4} lg={4} sm={5}>
            <h6>Stripe Id:</h6>
          </Grid>
          <Grid item xs={7} md={8} lg={8} sm={7}>
            <span style={{ fontSize: "15px", fontWeight: "normal" }}>
              {subscriptionData?.stripe_id
                ? subscriptionData?.stripe_id
                : "N/A"}
            </span>
          </Grid>
          <Grid item xs={5} md={4} lg={4} sm={5}>
            <h6>Start Date:</h6>
          </Grid>
          <Grid item xs={7} md={8} lg={8} sm={7}>
            <span style={{ fontSize: "15px", fontWeight: "normal" }}>
              {subscriptionData?.start_date
                ? subscriptionData?.start_date.toString().length > 10
                  ? moment(subscriptionData?.start_date, "x").format(
                      "DD MMM YYYY hh:mm a"
                    )
                  : moment(subscriptionData?.start_date * 1000).format(
                      "DD MMM YYYY hh:mm a"
                    )
                : "N/A"}
            </span>
          </Grid>
          <Grid item xs={5} md={4} lg={4} sm={5}>
            <h6>End Date:</h6>
          </Grid>
          <Grid item xs={7} md={8} lg={8} sm={7}>
            <span style={{ fontSize: "15px", fontWeight: "normal" }}>
              {subscriptionData?.end_date
                ? subscriptionData?.end_date.toString().length > 10
                  ? moment(subscriptionData?.end_date, "x").format(
                      "DD MMM YYYY hh:mm a"
                    )
                  : moment(subscriptionData?.end_date * 1000).format(
                      "DD MMM YYYY hh:mm a"
                    )
                : "N/A"}
            </span>
          </Grid>
          <Grid item xs={5} md={4} lg={4} sm={5}>
            <h6>Status</h6>
          </Grid>
          <Grid item xs={7} md={8} lg={8} sm={7}>
            <span style={{ fontSize: "15px", fontWeight: "normal" }}>
              {subscriptionData?.status
                ? subscriptionData.status?.charAt(0).toUpperCase() +
                  subscriptionData.status?.slice(1)
                : "N/A"}
            </span>
          </Grid>
          <Grid item xs={5} md={4} lg={4} sm={5}>
            <h6>Event:</h6>
          </Grid>
          <Grid item xs={7} md={8} lg={8} sm={7}>
            <span style={{ fontSize: "15px", fontWeight: "normal" }}>
              {subscriptionData?.event ? subscriptionData?.event : "N/A"}
            </span>
          </Grid>
        </Grid>
      </Card>
    </DashboardLayout>
  );
};

export default SubscriptionDetails;
