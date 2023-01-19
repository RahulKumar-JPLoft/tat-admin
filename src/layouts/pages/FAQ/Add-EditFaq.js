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
import { faqAdd, faqSingle, faqEdit, faqCategory } from "redux/actions/action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const AddFaq = (props) => {
  const Id = props.match.params.id;
  const [editUser, setEditUser] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { faqRes } = useSelector((state) => state.faqRes);
  const { faqS } = useSelector((state) => state.faqS);
  const { faqCat } = useSelector((state) => state.faqCat);

  useEffect(() => {
    dispatch(faqCategory());
  }, []);

  useEffect(() => {
    if (Id) {
      dispatch(faqSingle(Id));
      setEditUser(true);
    }
  }, [Id]);
  const { data } = faqS;
  const faqCatData = faqCat?.data;

  const initialValues = {
    faq_title: "",
    faq_description: "",
    faq_category: "",
    status: "active",
    faqId: "",
  };
  const validationSchema = Yup.object().shape({
    faq_title: Yup.string().required("Faq Title is required"),
    faq_description: Yup.string().required("Faq description is required"),
    faq_category: Yup.string().required("Faq category is required"),
    status: Yup.string().required("Status is required"),
  });
  const handleSubmit = (values) => {
    dispatch(faqAdd(values));
  };
  const editSingle = (values) => {
    //   console.log(values)
    dispatch(faqEdit(data.id, values));
  };

  const editValues = {
    faqId: data && data.id ? data.id : "",
    faq_title: data && data.faq_title ? data.faq_title : "",
    faq_description: data && data.faq_description ? data.faq_description : "",
    faq_category: data && data.faq_category ? data.faq_category : "",
    status: data && data.status ? data.status : "",
  };

  useEffect(() => {
    if (faqRes) {
      if (faqRes.status === 1) {
        toast.success(faqRes.message, {
          position: "bottom-left",
          autoClose: 2000,
          size: "small",
        });
        history.push("/backend/pages/faq");
      } else {
        toast.error(faqRes.message, {
          position: "bottom-left",
          autoClose: 1000,
          size: "small",
        });
      }
    }
    setTimeout(() => {
      dispatch({ type: "FAQ_ADD", payloade: "" });
    }, 1000);
    // setTimeout(() => {
    //   dispatch({ type: "EDIT_CAT", payloade: "" });
    // }, 1000);
  }, [faqRes]);

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
                        FAQ Title
                      </InputLabel>
                      <SuiInput
                        type="text"
                        placeholder="FAQ Title"
                        name="faq_title"
                        onChange={formik.handleChange}
                        value={formik.values.faq_title}
                        error={
                          formik.errors.faq_title && formik.touched.faq_title
                        }
                      />
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {" "}
                        {formik.errors.faq_title && formik.touched.faq_title ? (
                          <div>{formik.errors.faq_title}</div>
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
                        FAQ Description
                      </InputLabel>
                      <SuiInput
                        type="text"
                        placeholder="FAQ Description"
                        name="faq_description"
                        onChange={formik.handleChange}
                        value={formik.values.faq_description}
                        error={
                          formik.errors.faq_description &&
                          formik.touched.faq_description
                        }
                      />
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {" "}
                        {formik.errors.faq_description &&
                        formik.touched.faq_description ? (
                          <div>{formik.errors.faq_description}</div>
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
                        FAQ Category
                      </InputLabel> 
                     {/* <SuiInput
                        type="text"
                        placeholder="FAQ Category"
                        name="faq_category"
                        onChange={formik.handleChange}
                        value={formik.values.faq_category}
                        error={
                          formik.errors.faq_category &&
                          formik.touched.faq_category
                        }
                      />  */}
                       <select
                        className="form-select"
                        name="faq_category"
                        onChange={formik.handleChange}
                        value={formik.values.faq_category}
                        error={
                          formik.errors.faq_category &&
                          formik.touched.faq_category
                        }
                      > 
                        <option value="">Select FAQ Category</option> 
                         {faqCatData?.map((val, i) => (
                          <>
                            <option key={i.id} value={val.id}>
                              {val.category_name}
                            </option>
                          </>
                        ))}
                      </select> 
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {" "}
                        {formik.errors.faq_category &&
                        formik.touched.faq_category ? (
                          <div>{formik.errors.faq_category}</div>
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
                    {Id ? "Save Change" : "Add Faq"}
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

export default AddFaq;
