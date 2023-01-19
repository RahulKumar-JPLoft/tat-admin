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

import { useState, useEffect } from "react";

// react-router-dom components
import { Redirect, useHistory } from "react-router-dom";

// @mui material components
import { Card, IconButton } from "@mui/material";
import { TextField } from "@material-ui/core";
import Switch from "@mui/material/Switch";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
// import Socials from "layouts/authentication/components/Socials";
// import Separator from "layouts/authentication/components/Separator";

// Handling Form with Formik
import { Formik, Form } from "formik";
// Handling Form Validation with yup
import * as Yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// Images
// import curved9 from "assets/images/curved-images/curved9.jpg";
import bannerSignIn from "assets/images/bannerSignIn.png";
// Importing toastify module
import { toast } from "react-toastify";

// Import toastify css file
import "react-toastify/dist/ReactToastify.css";

// toast-configuration method,
// it is compulsory method.
toast.configure();

import { useDispatch, useSelector } from "react-redux";
import { authSignIn } from "redux/actions/action";
import { InputAdornment } from "@mui/material";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const dispatch = useDispatch();
  // Login Response
  const { response } = useSelector((state) => state.response);
  const data = response?.data;
  const history = useHistory();

  localStorage.setItem("uid", data?.data?.id);
  const tokenTap = localStorage.getItem("TapToken");
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  useEffect(() => {
    if (tokenTap) {
      history.push("/backend/dashboard");
    }
  }, [tokenTap]);
  // console.log(rememberMe)

  const initialValues = {
    identity: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    identity: Yup.string().required("Email is required").email(),
    password: Yup.string().required("Password is required").min(5),
  });
  const handleSubmit = (values) => {
    dispatch(authSignIn(values));
  };
  useEffect(() => {
    if (data) {
      if (data.status === 1) {
        localStorage.setItem("TapToken", true);
        toast.success("Login Successfully", {
          autoClose: 2000,
          size: "small",
        });
        history.push("/dashboard");
      } else {
        toast.error(data.message, {
          autoClose: 2000,
          size: "small",
        });
        <Redirect to="/" />;
      }
    }
    setTimeout(() => {
      dispatch({ type: "AUTHRESPONSE", payloade: "" });
    }, 1000);
  }, [response]);

  return (
    <BasicLayout title="Admin Panel" image={bannerSignIn}>
      <Card style={{ marginTop: "-100px" }}>
        <SuiBox p={3} textAlign="center">
          <SuiTypography variant="h5" fontWeight="medium">
            Sign in
          </SuiTypography>
          {/* <SuiTypography color="red" variant="h5" fontWeight="medium">
            Welcome Admin!
          </SuiTypography> */}
        </SuiBox>
        <SuiBox textAlign="center">
          <p style={{ color: "#f68e1f", fontWeight: "bold" }}>Welcome Admin!</p>
        </SuiBox>
        <SuiBox p={3}>
          <Formik
            enableReinitialize="true"
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {(formik, isSubmitting) => {
              return (
                <Form autoComplete="off">
                  <SuiBox mb={2}>
                    <TextField
                      fullWidth
                      type="email"
                      label="Email"
                      name="identity"
                      onChange={formik.handleChange}
                      value={formik.values.identity}
                      error={formik.errors.identity && formik.touched.identity}
                    />
                    <span style={{ color: "red", fontSize: "12px" }}>
                      {" "}
                      {formik.errors.identity && formik.touched.identity ? (
                        <div>{formik.errors.identity}</div>
                      ) : null}
                    </span>
                  </SuiBox>
                  <SuiBox mb={2}>
                    <TextField
                      fullWidth
                      type={showPassword ? "text" : "password"}
                      label="Password"
                      size="small"
                      name="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      error={formik.errors.password && formik.touched.password}
                      success={
                        formik.values.password.length > 0 &&
                        !formik.errors.password
                      }
                      InputProps={{
                        // <-- This is where the toggle button is added.
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <span style={{ color: "red", fontSize: "12px" }}>
                      {" "}
                      {formik.errors.password && formik.touched.password ? (
                        <div>{formik.errors.password}</div>
                      ) : null}
                    </span>
                  </SuiBox>
                  {/* <SuiBox display="flex" alignItems="center">
                    <Switch
                      checked={rememberMe}
                      onChange={handleSetRememberMe}
                    />
                    <SuiTypography
                      variant="button"
                      fontWeight="regular"
                      onClick={handleSetRememberMe}
                      sx={{ cursor: "pointer", userSelect: "none" }}
                    >
                      &nbsp;&nbsp;Remember me
                    </SuiTypography>
                  </SuiBox> */}
                  <SuiBox mt={4} mb={1}>
                    <SuiButton
                      variant="gradient"
                      color="info"
                      fullWidth
                      type="submit"
                      disable={isSubmitting}
                    >
                      sign in
                    </SuiButton>
                  </SuiBox>
                </Form>
              );
            }}
          </Formik>
        </SuiBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
