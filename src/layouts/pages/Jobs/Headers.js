/**
=========================================================
* Soft UI Dashboard PRO React - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
// import SuiAvatar from "components/SuiAvatar";

import StarRatings from "react-star-ratings";

function Headers({ JobTitle, Rating }) {
  return (
    <Card id="profile">
      <SuiBox p={2}>
        <Grid container spacing={3} alignItems="center">
          {/* <Grid item>
            <img
              src="https://www.thebalancecareers.com/thmb/97YDlnd1x-Xsx3JQ3mj0_MqLkLk=/1941x1456/smart/filters:no_upscale()/GettyImages-169270299-5bb6887c46e0fb002696522e.jpg"
              alt="profile-image"
              variant="rounded"
              size="xl"
              shadow="sm"
              style={{
                width: "5rem",
                height: "5rem",
                borderRadius: "50%",
              }}
            />
          </Grid> */}
          <Grid item>
            <SuiBox height="100%" mt={0.5} lineHeight={1}>
              <SuiTypography variant="p" fontWeight="medium" fontSize="13px">
                Job Title: &nbsp;
                {JobTitle.charAt(0).toUpperCase() + JobTitle.slice(1)}
              </SuiTypography>
              {/* <SuiTypography variant="button" color="text" fontWeight="medium">
                CEO / Co-Founder
              </SuiTypography> */}
            </SuiBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{ ml: "auto" }}>
            <SuiBox
              display="flex"
              justifyContent={{ md: "flex-end" }}
              alignItems="center"
              lineHeight={1}
            >
              <SuiTypography
                variant="caption"
                fontWeight="medium"
                fontSize="13px"
              >
                Ratings:&nbsp;
                {Rating ? (
                  <StarRatings
                    rating={Math.round(Number(Rating) * 10) / 10}
                    starRatedColor="orange"
                    numberOfStars={5}
                    name="rating"
                    starSpacing="1px"
                    starDimension="15px"
                  />
                ) : (
                  <StarRatings
                    rating={0}
                    starRatedColor="orange"
                    numberOfStars={5}
                    name="rating"
                    starSpacing="1px"
                    starDimension="15px"
                  />
                )}
              </SuiTypography>
            </SuiBox>
          </Grid>
        </Grid>
      </SuiBox>
    </Card>
  );
}

export default Headers;
