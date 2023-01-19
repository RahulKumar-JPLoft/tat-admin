import React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// @mui material components
import { Grid, Card, InputLabel } from "@mui/material";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";
// Handling Form with Formik
import { Formik, Form } from "formik";
// Handling Form Validation with yup
import * as Yup from "yup";

const Notification = () => {
  const initialValues = {
    choose: "",
    title: "",
    description: "",
  };
  const validationSchema = Yup.object().shape({
    choose: Yup.string().required("required"),
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required").max(40,"Max 40 words"),
  });
  const handleSubmit = (values) => {
    // dispatch(TradieTvAdd(values));
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox mt={6} mb={3}>
        <Card style={{ padding: "15px" }}>
          <h5>Manage Notifications</h5>
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
                  <Grid container spacing={2} mt={1}>
                    <Grid item xs={12} md={2}>
                      <select
                        className="form-select"
                        name="choose"
                        onChange={formik.handleChange}
                        value={formik.values.choose}
                      >
                        <option selected={true} value="">
                          To
                        </option>
                        <option value="to_all">To All</option>
                        <option value="users">Users</option>
                        <option value="tradies">Tradies</option>
                      </select>
                      <small style={{ color: "red" }}>
                        {formik.errors.choose && formik.touched.choose ? (
                          <div>{formik.errors.choose}</div>
                        ) : null}
                      </small>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <SuiBox>
                        <SuiInput
                          type="text"
                          placeholder="Title"
                          name="title"
                          onChange={formik.handleChange}
                          value={formik.values.title}
                          error={formik.errors.title && formik.touched.title}
                        />
                        <small style={{ color: "red" }}>
                          {formik.errors.title && formik.touched.title ? (
                            <div>{formik.errors.title}</div>
                          ) : null}
                        </small>
                      </SuiBox>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <SuiBox>
                        <SuiInput
                          type="text"
                          placeholder="Description"
                          name="description"
                          onChange={formik.handleChange}
                          value={formik.values.description}
                          error={
                            formik.errors.description &&
                            formik.touched.description
                          }
                        />
                        <small style={{ color: "red" }}>
                          {formik.errors.description &&
                          formik.touched.description ? (
                            <div>{formik.errors.description}</div>
                          ) : null}
                        </small>
                      </SuiBox>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={0} sm={0} md={2}>
                      {" "}
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <SuiBox mt={2}>
                        <SuiButton
                          variant="gradient"
                          color="warning"
                          fullWidth
                          type="submit"
                        >
                          Send
                        </SuiButton>
                      </SuiBox>
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </Card>
      </SuiBox>
    </DashboardLayout>
  );
};

export default Notification;
