import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { TextField } from "@material-ui/core";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useEffect, useState } from "react";
import bannerSignIn from "assets/images/bannerSignIn.png";

// Handling Form with Formik
import { Formik, Form } from "formik";
// Handling Form Validation with yup
import * as Yup from "yup";
import { styles } from "layouts/pages/Styles/Login.module";

import { LoginFunction } from "api";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

function Login() {
  const token = Cookies.get("tapSetingToken");
  let history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    if (token) {
      history.push("/backend/thgnpolndsftfluhfb");
    }
  }, [token]);

  const initialValues = {
    password: "",
  };
  const validationSchema = Yup.object().shape({
    password: Yup.string().required("Password is required").min(5),
  });
  const handleSubmit = async (values) => {
    const response = await LoginFunction(values);

    if (response.status === 1) {
      Cookies.set("tapSetingToken", response.token);
      toast.success(response.message, {
        autoClose: 2000,
        size: "small",
      });
      setTimeout(() => {
        history.push("/backend/thgnpolndsftfluhfb");
      }, 1500);
    } else {
      toast.error(response.message, {
        autoClose: 2000,
        size: "small",
      });
    }
  };
  return (
    <div style={{ padding: 2, height: "100%" }}>
      <Box style={styles.imageBox}>
        <img src={bannerSignIn} alt="" style={styles.loginImage} />
      </Box>

      <Grid container spacing={1} justifyContent="center">
        <Grid item xs={11} sm={9} md={3} lg={3} xl={3}>
          <Card style={styles.card}>
            <Box p={3} textAlign="center">
              <Typography variant="h5" fontWeight="medium">
                Sign in
              </Typography>
            </Box>

            <Box p={3}>
              <Formik
                enableReinitialize="true"
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                {(formik, isSubmitting) => {
                  return (
                    <Form autoComplete="off">
                      <Box mb={2}>
                        <TextField
                          fullWidth
                          type={showPassword ? "text" : "password"}
                          label="Password"
                          size="small"
                          name="password"
                          onChange={formik.handleChange}
                          value={formik.values.password}
                          error={
                            formik.errors.password && formik.touched.password
                          }
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
                                    <VisibilityIcon />
                                  ) : (
                                    <VisibilityOffIcon />
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
                      </Box>

                      <Box mt={4} mb={1}>
                        <Button
                          style={styles.signInButton}
                          variant="gradient"
                          color="info"
                          fullWidth
                          type="submit"
                          disable={isSubmitting}
                        >
                          SIGN IN
                        </Button>
                      </Box>
                    </Form>
                  );
                }}
              </Formik>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;
