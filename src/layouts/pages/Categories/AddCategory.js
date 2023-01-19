import { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Card, Grid } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { useHistory } from "react-router-dom";
// Handling Form with Formik
import { Formik, Form } from "formik";
// Handling Form Validation with yup
import * as Yup from "yup";
// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

import { useSelector, useDispatch } from "react-redux";
import {
  categoryAdd,
  getSingleCategory,
  editService,
} from "redux/actions/action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const AddCategory = (props) => {
  const Id = props.match.params.id;
  const [editUser, setEditUser] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { categoriesAdd } = useSelector((state) => state.categoriesAdd);
  const { SingleCat } = useSelector((state) => state.SingleCat);

  useEffect(() => {
    if (Id) {
      dispatch(getSingleCategory(Id));
      setEditUser(true);
    }
  }, [Id]);
  const { data } = SingleCat;
  // console.log("SingleCat:", data);

  const initialValues = {
    name: "",
    status: "active",
    type: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    status: Yup.string().required("Status is required"),
    type: Yup.string().required("Type is required"),
  });
  const handleSubmit = (values) => {
    dispatch(categoryAdd(values));
  };
  const editSingle = (values) => {
    const Value = {
      name: values.name,
      status: values.status,
      type: values && values.type,
    };
    // console.log("Id :", data.id + "&&" + Value);
    dispatch(editService(data.id, Value));
  };

  const editValues = {
    id: data && data.id ? data.id : "",
    name: data && data.name ? data.name : "",
    status: data && data.status ? data.status : "",
    type: data && data.type ? data.type : "",
  };

  useEffect(() => {
    if (categoriesAdd) {
      if (categoriesAdd.status === 1) {
        toast.success(categoriesAdd.message, {
          position: "bottom-left",
          autoClose: 2000,
          size: "small",
        });
        history.push("/backend/categories");
      } else {
        toast.error(categoriesAdd.message, {
          position: "bottom-left",
          autoClose: 1000,
          size: "small",
        });
      }
    }
    setTimeout(() => {
      dispatch({ type: "CAT_ADD", payloade: "" });
    }, 1000);
    setTimeout(() => {
      dispatch({ type: "EDIT_CAT", payloade: "" });
    }, 1000);
  }, [categoriesAdd]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card sx={{ height: "100%" }} style={{ padding: "15px" }}>
        <Formik
          enableReinitialize="true"
          initialValues={editUser ? editValues : initialValues}
          onSubmit={Id ? editSingle : handleSubmit}
          validationSchema={validationSchema}
        >
          {(formik) => {
            return (
              <Form autoComplete="off">
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6} xl={4}>
                    <SuiBox>
                      <InputLabel
                        variant="standard"
                        style={{ fontSize: "15px" }}
                      >
                        Category Name
                      </InputLabel>
                      <SuiInput
                        type="text"
                        placeholder="Job Title"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        error={formik.errors.name && formik.touched.name}
                      />
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {" "}
                        {formik.errors.name && formik.touched.name ? (
                          <div>{formik.errors.name}</div>
                        ) : null}
                      </span>
                    </SuiBox>
                  </Grid>
                  <Grid item xs={12} md={6} xl={4}>
                    <SuiBox>
                      <InputLabel
                        variant="standard"
                        style={{ fontSize: "15px" }}
                      >
                        Status
                      </InputLabel>
                      <select
                        name="status"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.status}
                        error={formik.errors.status && formik.touched.status}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                      {/* <SuiInput
                        type="text"
                        placeholder="Status"
                        name="status"
                        onChange={formik.handleChange}
                        value={formik.values.status}
                        error={formik.errors.status && formik.touched.status}
                      /> */}
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {" "}
                        {formik.errors.status && formik.touched.status ? (
                          <div>{formik.errors.status}</div>
                        ) : null}
                      </span>
                    </SuiBox>
                  </Grid>
                  <Grid item xs={12} md={6} xl={4}>
                    <SuiBox>
                      <InputLabel
                        variant="standard"
                        style={{ fontSize: "15px" }}
                      >
                        Type
                      </InputLabel>
                      <select
                        name="type"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.type}
                        error={formik.errors.type && formik.touched.type}
                      >
                        <option value="">Select type</option>
                        <option value="main">Main</option>
                        <option value="other">Other</option>
                      </select>

                      <span style={{ color: "red", fontSize: "12px" }}>
                        {" "}
                        {formik.errors.type && formik.touched.type ? (
                          <div>{formik.errors.type}</div>
                        ) : null}
                      </span>
                    </SuiBox>
                  </Grid>
                </Grid>
                <br />
                <Grid item xs={12} md={2} xl={2}>
                  <SuiButton
                    variant="gradient"
                    color="warning"
                    fullWidth
                    type="submit"
                    // disable={isSubmitting}
                  >
                    {Id ? "Save Change" : "Add Category"}
                  </SuiButton>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Card>
    </DashboardLayout>
  );
};

export default AddCategory;
