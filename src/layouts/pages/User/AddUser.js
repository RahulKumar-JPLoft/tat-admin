import { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useHistory } from "react-router-dom";
// Handling Form with Formik
import { Formik, Form, Field } from "formik";
// Handling Form Validation with yup
import * as Yup from "yup";
// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";
// import SuiSelect from "components/SuiSelect";

import { Grid } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";
// import Dropzone from "../../../layouts/Dropzone/Dropzone";
import InputLabel from "@mui/material/InputLabel";
import { Card } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  SingleUserAction,
  updateSingleUser,
  // fetchCountries,
} from "redux/actions/action";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
import "bootstrap/dist/css/bootstrap.min.css";

// Add or Edit User component
const AddUser = (props) => {
  const Id = props.match.params.id;
  const history = useHistory();
  // const [image, setImage] = useState([]);
  const [editUser, setEditUser] = useState(false);
  const dispatch = useDispatch();
  const { addUsers } = useSelector((state) => state.addUsers);
  const { singleUser } = useSelector((state) => state.singleUser);
  const { updateUserRes } = useSelector((state) => state.updateUserRes);

  useEffect(() => {
    if (Id) {
      dispatch(SingleUserAction(Id));
      setEditUser(true);
    }
  }, [Id]);

  const { data } = singleUser;
  const singleUserData = data ? data[0] : "";

  const dateDOB = moment(singleUserData.dob).format("YYYY-MM-DD");

  const initialValues = {
    name: "",
    mobile: "",
    email: "",
    // profile_image: "",
    country_code: "",
    gender: "",
    // dob: "",
    country: "",
    city: "",
    latitude: "",
    longitude: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required").min(4),
    country_code: Yup.string()
      .required("required")
      .matches(/^(\+?\d{1,3}|\d{1,4})$/, "Invailid"),
    mobile: Yup.string()
      .required("Mobile No. is required")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Phone number is not valid"
      )
      .min(9)
      .max(13),
    // .matches(/^[0-9]{10}$/, "Please Enter a Valid mobile Number "),
    email: Yup.string().required("Email is required").email(),

    gender: Yup.string().required("Gender  is required"),
    // dob: Yup.string().required("DOB  is required"),
    country: Yup.string().required("Country is required").matches(/^[a-zA-Z]*$/, "Country name is invalid"),
    city: Yup.string().required("City is required").matches(/^[a-zA-Z]*$/, "City name is invalid"),
    latitude: Yup.string().required("latitude is required"),
    longitude: Yup.string().required("longitude is required"),
  });
  const handleSubmit = (values) => {
    let formData = new FormData();
    formData.append("userId", "");
    formData.append("name", values.name);
    formData.append("mobile", values.mobile);
    formData.append("email", values.email);

    formData.append("gender", values.gender);
    // formData.append("dob", values.dob);
    formData.append("status", "active");
    formData.append("country", values.country);
    formData.append("city", values.city);
    formData.append("latitude", values.latitude);
    formData.append("longitude", values.longitude);
    formData.append("country_code", values.country_code);

    dispatch(addUser(formData));
  };

  // Edit Single User
  const editSingle = async (values) => {
    let formData = new FormData();
    formData.append("userId", values.id);
    formData.append("name", values.name);
    formData.append("mobile", values.mobile);
    formData.append("email", values.email);

    formData.append("country_code", values.country_code);
    formData.append("gender", values.gender);
    // formData.append("dob", values.dob);
    formData.append("country", values.country);
    formData.append("city", values.city);
    formData.append("latitude", values.latitude);
    formData.append("longitude", values.longitude);
    formData.append("status", "active");
    // formData.append(
    //   "profile_image",
    //   image[0] ? image[0] : singleUserData.profile_pic
    // );
    dispatch(updateSingleUser(formData));
  };

  // For Edit SingleUser default value
  const editValues = {
    id: singleUserData && singleUserData.id ? singleUserData.id : "",
    name:
      singleUserData && singleUserData.full_name
        ? singleUserData.full_name
        : "",
    mobile:
      singleUserData && singleUserData.mobile ? singleUserData.mobile : "",
    email: singleUserData && singleUserData.email ? singleUserData.email : "",

    country_code:
      singleUserData && singleUserData.country_code
        ? singleUserData.country_code
        : "",
    gender:
      singleUserData && singleUserData.gender ? singleUserData.gender : "",
    // dob: singleUserData && dateDOB ? dateDOB : "",
    // profile_image:
    //   singleUserData && singleUserData.profile_pic
    //     ? singleUserData.profile_pic
    //     : "",
    country:
      singleUserData && singleUserData.country ? singleUserData.country : "",
    city: singleUserData && singleUserData.city ? singleUserData.city : "",
    latitude:
      singleUserData && singleUserData.latitude ? singleUserData.latitude : "",
    longitude:
      singleUserData && singleUserData.longitude
        ? singleUserData.longitude
        : "",
    status:
      singleUserData && singleUserData.status ? singleUserData.status : "",
  };

  useEffect(() => {
    if (addUsers) {
      if (addUsers.status === 1) {
        history.push("/backend/user");
      } else {
        toast.error(addUsers.message, {
          position: "bottom-left",
          autoClose: 2000,
          size: "small",
        });
      }
    }
    setTimeout(() => {
      dispatch({ type: "ADDUSER", payloade: "" });
    }, 1000);
  }, [addUsers]);

  useEffect(() => {
    if (updateUserRes) {
      if (updateUserRes.status === 1) {
        history.push("/backend/user");
      } else {
        toast.error(updateUserRes.message, {
          position: "bottom-left",
          autoClose: 2000,
          size: "small",
        });
      }
    }
    setTimeout(() => {
      dispatch({ type: "UPDATESINGLEUSER", payloade: "" });
    }, 1000);
  }, [updateUserRes]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <hr />
      <Formik
        enableReinitialize="true"
        initialValues={editUser ? editValues : initialValues}
        onSubmit={Id ? editSingle : handleSubmit}
        validationSchema={validationSchema}
      >
        {(formik, isSubmitting) => {
          return (
            <Form autoComplete="off">
              <Card style={{ padding: "15px" }}>
                {/* <Grid item xs={12} sm={6}>
                  <Dropzone
                    acceptType="image/*"
                    files={image}
                    setFiles={setImage}
                    onChange={formik.handleChange}
                    imgSrc={
                      image && image.length
                        ? ""
                        : formik.values.profile_image
                        ? `https://api.tapatradie.com/profile/${Id}/` +
                          formik.values.profile_image
                        : ""
                    }
                    title="Upload Profile"
                    caption="Upload Image "
                  />
                </Grid> */}
                <br />
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={5}>
                    <SuiBox>
                      <InputLabel
                        variant="standard"
                        style={{ fontSize: "15px" }}
                      >
                        Full Name
                      </InputLabel>
                      <SuiInput
                        type="text"
                        placeholder="Name"
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        error={formik.errors.name && formik.touched.name}
                        success={
                          formik.values.name.length > 0 && !formik.errors.name
                        }
                      />
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {" "}
                        {formik.errors.name && formik.touched.name ? (
                          <div>{formik.errors.name}</div>
                        ) : null}
                      </span>
                    </SuiBox>
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <SuiBox>
                      <InputLabel
                        variant="standard"
                        style={{ fontSize: "15px" }}
                      >
                        Mobile
                      </InputLabel>
                      <Grid container spacing={1}>
                        <Grid item xs={3} sm={2}>
                          <SuiInput
                            type="text"
                            placeholder="61"
                            name="country_code"
                            onChange={formik.handleChange}
                            value={formik.values.country_code}
                            maxLength="3"
                            onBlur={formik.handleBlur}
                            error={
                              formik.errors.country_code &&
                              formik.touched.country_code
                            }
                            success={
                              formik.values.country_code.length > 0 &&
                              !formik.errors.country_code
                            }
                          />
                          <span style={{ color: "red", fontSize: "12px" }}>
                            {" "}
                            {formik.errors.country_code &&
                            formik.touched.country_code ? (
                              <div>{formik.errors.country_code}</div>
                            ) : null}
                          </span>
                        </Grid>
                        <Grid item xs={9} sm={8}>
                          <SuiInput
                            type="text"
                            placeholder="Mobile"
                            name="mobile"
                            onChange={formik.handleChange}
                            value={formik.values.mobile}
                            onBlur={formik.handleBlur}
                            error={
                              formik.errors.mobile && formik.touched.mobile
                            }
                            success={
                              formik.values.mobile.length > 0 &&
                              !formik.errors.mobile
                            }
                          />
                          <span style={{ color: "red", fontSize: "12px" }}>
                            {" "}
                            {formik.errors.mobile && formik.touched.mobile ? (
                              <div>{formik.errors.mobile}</div>
                            ) : null}
                          </span>
                        </Grid>
                      </Grid>
                    </SuiBox>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <SuiBox>
                      <InputLabel
                        variant="standard"
                        style={{ fontSize: "15px" }}
                      >
                        Email
                      </InputLabel>
                      <SuiInput
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        error={formik.errors.email && formik.touched.email}
                        success={
                          formik.values.email.length > 0 && !formik.errors.email
                        }
                      />
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {" "}
                        {formik.errors.email && formik.touched.email ? (
                          <div>{formik.errors.email}</div>
                        ) : null}
                      </span>
                    </SuiBox>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <FormControl component="fieldset">
                      <FormLabel
                        component="legend"
                        style={{ fontSize: "15px" }}
                      >
                        Gender
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-label="gender"
                        name="gender"
                        value={formik.values.gender}
                        onBlur={formik.handleBlur}
                      >
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          label="Male"
                          onChange={formik.handleChange}
                        />
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label="Female"
                          onChange={formik.handleChange}
                        />

                        <FormControlLabel
                          value="other"
                          control={<Radio />}
                          label="Other"
                          onChange={formik.handleChange}
                        />
                      </RadioGroup>
                    </FormControl>
                    <span style={{ color: "red", fontSize: "12px" }}>
                      {" "}
                      {formik.errors.gender && formik.touched.gender ? (
                        <div>{formik.errors.gender}</div>
                      ) : null}
                    </span>
                  </Grid>
                  {/* <Grid item xs={12} sm={4}>
                    <SuiBox>
                      <InputLabel
                        variant="standard"
                        style={{ fontSize: "15px" }}
                      >
                        DOB
                      </InputLabel>
                      <SuiInput
                        type="date"
                        placeholder="DOB"
                        name="dob"
                        onChange={formik.handleChange}
                        value={formik.values.dob}
                        onBlur={formik.handleBlur}
                        // max={moment(new Date()).format("MMM Do YY")}
                        max={moment().format("YYYY-MM-DD")}
                        error={formik.errors.dob && formik.touched.dob}
                        success={
                          formik.values.dob.length > 0 && !formik.errors.dob
                        }
                      />
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {" "}
                        {formik.errors.dob && formik.touched.dob ? (
                          <div>{formik.errors.dob}</div>
                        ) : null}
                      </span>
                    </SuiBox>
                  </Grid> */}
                  <Grid item xs={12} sm={4}>
                    <SuiBox>
                      <InputLabel
                        variant="standard"
                        style={{ fontSize: "15px" }}
                      >
                        Country
                      </InputLabel>
                      <SuiInput
                        type="text"
                        placeholder="Country"
                        name="country"
                        onChange={formik.handleChange}
                        value={formik.values.country}
                        error={formik.errors.country && formik.touched.country}
                        onBlur={formik.handleBlur}
                        success={
                          formik.values.country.length > 0 &&
                          !formik.errors.country
                        }
                      />

                      <span style={{ color: "red", fontSize: "12px" }}>
                        {" "}
                        {formik.errors.country && formik.touched.country ? (
                          <div>{formik.errors.country}</div>
                        ) : null}
                      </span>
                    </SuiBox>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <SuiBox>
                      <InputLabel
                        variant="standard"
                        style={{ fontSize: "15px" }}
                      >
                        City
                      </InputLabel>
                      <SuiInput
                        type="text"
                        placeholder="City"
                        name="city"
                        onChange={formik.handleChange}
                        value={formik.values.city}
                        onBlur={formik.handleBlur}
                        error={formik.errors.city && formik.touched.city}
                        success={
                          formik.values.city.length > 0 && !formik.errors.city
                        }
                      />
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {" "}
                        {formik.errors.city && formik.touched.city ? (
                          <div>{formik.errors.city}</div>
                        ) : null}
                      </span>
                    </SuiBox>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <SuiBox>
                      <InputLabel
                        variant="standard"
                        style={{ fontSize: "15px" }}
                      >
                        Latitude
                      </InputLabel>
                      <SuiInput
                        type="text"
                        placeholder="Latitude"
                        name="latitude"
                        onChange={formik.handleChange}
                        value={formik.values.latitude}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors.latitude && formik.touched.latitude
                        }
                        success={
                          formik.values.latitude.length > 0 &&
                          !formik.errors.latitude
                        }
                      />
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {" "}
                        {formik.errors.latitude && formik.touched.latitude ? (
                          <div>{formik.errors.latitude}</div>
                        ) : null}
                      </span>
                    </SuiBox>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <SuiBox>
                      <InputLabel
                        variant="standard"
                        style={{ fontSize: "15px" }}
                      >
                        Longitude
                      </InputLabel>
                      <SuiInput
                        type="text"
                        placeholder="Longitude"
                        name="longitude"
                        onChange={formik.handleChange}
                        value={formik.values.longitude}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors.longitude && formik.touched.longitude
                        }
                        success={
                          formik.values.longitude.length > 0 &&
                          !formik.errors.longitude
                        }
                      />
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {" "}
                        {formik.errors.longitude && formik.touched.longitude ? (
                          <div>{formik.errors.longitude}</div>
                        ) : null}
                      </span>
                    </SuiBox>
                  </Grid>
                  {Id ? (
                    <Grid item xs={12} sm={4}>
                      <InputLabel
                        variant="standard"
                        style={{ fontSize: "15px" }}
                      >
                        Status
                      </InputLabel>
                      <Field
                        as="select"
                        name="status"
                        className="form-control"
                        value={formik.values.status}
                      >
                        <option value="inactive">Inactive</option>
                        <option value="active">Active</option>
                      </Field>
                    </Grid>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={12} sm={2} mt={2}>
                  <SuiButton
                    variant="gradient"
                    color="warning"
                    fullWidth
                    type="submit"
                    disable={isSubmitting}
                  >
                    {Id ? "Save Change" : "Add User"}
                  </SuiButton>
                </Grid>
                <hr />
              </Card>
            </Form>
          );
        }}
      </Formik>
    </DashboardLayout>
  );
};

export default AddUser;
