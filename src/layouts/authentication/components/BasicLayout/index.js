

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard PRO React example components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";

// Authentication layout components
import Footer from "layouts/authentication/components/Footer";

// Soft UI Dashboard PRO React page layout routes
import pageRoutes from "page.routes";

import brand from "assets/images/BrandIcon.svg";
import brandName from "assets/images/BrandNameWhite.svg";
import { Card } from "@mui/material";

function BasicLayout({ title, description, image, children }) {
  return (
    <PageLayout>
      {/* <DefaultNavbar
        routes={pageRoutes}
        action={{
          type: "external",
          route: "https://creative-tim.com/product/soft-ui-dashboard-pro-react",
          label: "buy now",
        }}
        transparent
        light
      /> */}
      <SuiBox
        width="calc(100% - 2rem)"
        minHeight="50vh"
        borderRadius="lg"
        mx={2}
        my={2}
        pt={6}
        pb={28}
        sx={{
          backgroundImage: ({
            functions: { linearGradient, rgba },
            palette: { gradients },
          }) =>
            image &&
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{ textAlign: "center" }}
        >
          <Grid item xs={10} lg={3}>
            <SuiBox mt={1}>
            <SuiBox
                component="img"
                src={brand}
                alt="Tap-Trade "
                width="2rem"
              />
              &nbsp;
            <SuiBox
                component="img"
                src={brandName}
                alt="Tap-Trade "
                width="12rem"
              />
            </SuiBox>
            <SuiBox >
              <SuiTypography variant="body2" color="white" fontWeight="regular">
                {description}
              </SuiTypography>
            </SuiBox>
          </Grid>
        </Grid>
      </SuiBox>
      <SuiBox
        mt={{ xs: -26, lg: -24 }}
        px={1}
        width="calc(100% - 2rem)"
        mx="auto"
      >
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            {children}
          </Grid>
        </Grid>
      </SuiBox>
      <Footer />
    </PageLayout>
  );
}

// Setting default values for the props of BasicLayout
BasicLayout.defaultProps = {
  title: "",
  description: "",
};

// Typechecking props for the BasicLayout
BasicLayout.propTypes = {
  title: PropTypes.string,
  // description: PropTypes.string,
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default BasicLayout;
