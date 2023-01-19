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
  TradieTvAdd,
  tradieTvSingle,
  TradieTvEdit,
  categoryList,
} from "redux/actions/action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const AddTradieTv = (props) => {
  const Id = props.match.params.id;
  const [editUser, setEditUser] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { TradieTvRes } = useSelector((state) => state.TradieTvRes);
  const { TradieTvSin } = useSelector((state) => state.TradieTvSin);
  const { categoriesList } = useSelector((state) => state.categoriesList);

  useEffect(() => {
    if (Id) {
      dispatch(tradieTvSingle(Id));
      setEditUser(true);
    }
  }, [Id]);

  useEffect(() => {
    dispatch(categoryList());
  }, []);

  const CategoryData = categoriesList?.data;
  const { data } = TradieTvSin;

  const initialValues = {
    video_title: "",
    video_link: "",
    featured: "",
    categoryId: "",
    status: "active",
    tvId: "",
  };
  const validationSchema = Yup.object().shape({
    video_title: Yup.string().required("Video Title is required"),
    video_link: Yup.string().required("Video Link is required"),
    featured: Yup.number().required("Featured is required"),
    categoryId: Yup.number().required("Category is required"),
    status: Yup.string().required("Status is required"),
  });
  const handleSubmit = (values) => {
    console.log("Value :", values);
    dispatch(TradieTvAdd(values));
  };
  const editSingle = (values) => {
    dispatch(TradieTvEdit(data.id, values));
  };

  const editValues = {
    tvId: data && data.id ? data.id : "",
    video_title: data && data.video_title ? data.video_title : "",
    video_link: data && data.video_link ? data.video_link : "",
    categoryId: data && data.categoryId ? data.categoryId : "",
    featured: data && data.is_featured ? data.is_featured : "",
    status: data && data.status ? data.status : "",
  };

  useEffect(() => {
    if (TradieTvRes) {
      if (TradieTvRes.status === 1) {
        toast.success(TradieTvRes.message, {
          position: "bottom-left",
          autoClose: 2000,
          size: "small",
        });
        history.push("/backend/Tradie-TV");
      } else {
        toast.error(TradieTvRes.message, {
          position: "bottom-left",
          autoClose: 1000,
          size: "small",
        });
      }
    }
    setTimeout(() => {
      dispatch({ type: "ADD_TRADIE_TV", payloade: "" });
    }, 1000);
    setTimeout(() => {
      dispatch({ type: "EDIT_TRADIE_TV", payloade: "" });
    }, 1000);
  }, [TradieTvRes]);

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
                        Video Title
                      </InputLabel>
                      <SuiInput
                        type="text"
                        placeholder="Video title"
                        name="video_title"
                        onChange={formik.handleChange}
                        value={formik.values.video_title}
                        error={
                          formik.errors.video_title &&
                          formik.touched.video_title
                        }
                      />
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {formik.errors.video_title &&
                        formik.touched.video_title ? (
                          <div>{formik.errors.video_title}</div>
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
                        Video Link
                      </InputLabel>
                      <SuiInput
                        type="text"
                        placeholder="Only embedded video link"
                        name="video_link"
                        onChange={formik.handleChange}
                        value={formik.values.video_link}
                        error={
                          formik.errors.video_link && formik.touched.video_link
                        }
                      />
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {" "}
                        {formik.errors.video_link &&
                        formik.touched.video_link ? (
                          <div>{formik.errors.video_link}</div>
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
                        Category
                      </InputLabel>
                      <select
                        name="categoryId"
                        onChange={formik.handleChange}
                        value={formik.values.categoryId}
                        className="form-select"
                      >
                        <option value="">Select Category</option>
                        {CategoryData?.map((res, i) => (
                          <option value={res.id} key={i}>
                            {res.name}
                          </option>
                        ))}
                      </select>
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {" "}
                        {formik.errors.categoryId &&
                        formik.touched.categoryId ? (
                          <div>{formik.errors.categoryId}</div>
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
                        Featured
                      </InputLabel>
                      <SuiInput
                        type="text"
                        placeholder="featured(Number)"
                        name="featured"
                        onChange={formik.handleChange}
                        value={formik.values.featured}
                        error={
                          formik.errors.featured && formik.touched.featured
                        }
                      />
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {" "}
                        {formik.errors.featured && formik.touched.featured ? (
                          <div>{formik.errors.featured}</div>
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

                      <span style={{ color: "red", fontSize: "12px" }}>
                        {" "}
                        {formik.errors.status && formik.touched.status ? (
                          <div>{formik.errors.status}</div>
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
                    {Id ? "Save Change" : "Add Tradie Tv"}
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

export default AddTradieTv;
