import React, { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Card, IconButton } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { TextField } from "@material-ui/core";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// Handling Form with Formik
import { Formik, Form } from "formik";
// Handling Form Validation with yup
import * as Yup from "yup";
// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../redux/actions/action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

toast.configure();

const Profile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { passwordChange } = useSelector((state) => state.passwordChange);
  const uid = localStorage.getItem("uid");
  const [showPassword, setShowPassword] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const initialValues = {
    uid: uid,
    oldpassword: "",
    newpassword: "",
    // confirm_password: "",
  };
  const validationSchema = Yup.object().shape({
    oldpassword: Yup.string().required("Current Password is required"),
    newpassword: Yup.string().required("New Password is required"),
    // confirm_password: Yup.string().required("Confirm Password is required"),
  });
  const handleSubmit = (values) => {
    dispatch(changePassword(values));
    // console.log(values);
  };
  useEffect(() => {
    if (passwordChange) {
      if (passwordChange.status === 1) {
        toast.success("Password changed", {
          position: "bottom-left",
          autoClose: 2000,
          size: "small",
        });
        history.push("/backend/dashboard");
      } else {
        toast.error(passwordChange.message, {
          position: "bottom-left",
          autoClose: 2000,
          size: "small",
        });
      }
    }
    setTimeout(() => {
      dispatch({ type: "CHANGE_PASSWORD", payloade: "" });
    }, 1000);
  }, [passwordChange]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card style={{ marginTop: "14px", padding: "15px" }}>
        <h5>Change Password</h5>
        <hr />
        <Formik
          enableReinitialize="true"
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {(formik) => {
            return (
              <Form autoComplete="off">
                <SuiBox mt={1}>
                  <Row>
                    <Col ls={2} md={2} sm={0} xs={0}></Col>

                    <Col md={5}>
                      <TextField
                        fullWidth
                        type={showPass ? "text" : "password"}
                        label="Current Password"
                        size="small"
                        name="oldpassword"
                        onChange={formik.handleChange}
                        value={formik.values.oldpassword}
                        error={
                          formik.errors.oldpassword &&
                          formik.touched.oldpassword
                        }
                        success={
                          formik.values.oldpassword.length > 0 &&
                          !formik.errors.oldpassword
                        }
                        InputProps={{
                          // <-- This is where the toggle button is added.
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPass(!showPass)}
                                onMouseDown={() => setShowPass(!showPass)}
                              >
                                {showPass ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />

                      <span style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.oldpassword &&
                        formik.touched.oldpassword ? (
                          <div>{formik.errors.oldpassword}</div>
                        ) : null}
                      </span>
                    </Col>
                  </Row>
                </SuiBox>

                <SuiBox mt={1}>
                  <Row>
                    <Col ls={2} md={2} sm={0} xs={0}></Col>

                    <Col md={5}>
                      <TextField
                        fullWidth
                        type={showPassword ? "text" : "password"}
                        label="New Password"
                        size="small"
                        name="newpassword"
                        onChange={formik.handleChange}
                        value={formik.values.newpassword}
                        error={
                          formik.errors.newpassword &&
                          formik.touched.newpassword
                        }
                        success={
                          formik.values.newpassword.length > 0 &&
                          !formik.errors.newpassword
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
                        {formik.errors.newpassword &&
                        formik.touched.newpassword ? (
                          <div>{formik.errors.newpassword}</div>
                        ) : null}
                      </span>
                    </Col>
                  </Row>
                </SuiBox>

                {/* <SuiBox mt={1}>
                  <Row>
                    <Col ls={2} md={2} sm={0} xs={0}></Col>
                    <Col md={2}>
                      <InputLabel
                        variant="standard"
                        style={{ fontSize: "15px", marginTop: "5px" }}
                      >
                        Confirm Password :
                      </InputLabel>
                    </Col>
                    <Col md={5}>
                      <SuiInput
                        type="text"
                        placeholder=" Confirm Password"
                        name="confirm_password"
                        onChange={formik.handleChange}
                        value={formik.values.confirm_password}
                        error={
                          formik.errors.confirm_password &&
                          formik.touched.confirm_password
                        }
                      />
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.confirm_password &&
                        formik.touched.confirm_password ? (
                          <div>{formik.errors.confirm_password}</div>
                        ) : null}
                      </span>
                    </Col>
                  </Row>
                </SuiBox> */}
                <SuiBox mt={1}>
                  <Row>
                    <Col ls={3} md={3} sm={0} xs={0}></Col>
                    <Col md={2}>
                      <SuiButton
                        variant="gradient"
                        color="warning"
                        fullWidth
                        type="submit"
                      >
                        Update
                      </SuiButton>
                    </Col>
                  </Row>
                </SuiBox>
              </Form>
            );
          }}
        </Formik>
      </Card>
    </DashboardLayout>
  );
};

export default Profile;
