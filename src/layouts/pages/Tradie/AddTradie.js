import { useEffect, useState } from "react";
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
// MUI Component
import { Grid, Checkbox, FormGroup } from "@mui/material";
import Select from "react-select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import { Card } from "@mui/material";

// import Dropzone from "../../../layouts/Dropzone/Dropzone";
// redux hooks
import { useDispatch, useSelector } from "react-redux";
// redux action function
import {
  addTradie,
  SingleUserAction,
  updateTradie,
  categoryList,
} from "redux/actions/action";
import { toast } from "react-toastify";
import moment from "moment";
// import LocationAutocomplete from "./AutoCompleteSearch";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
toast.configure();

// Add or Edit User component
const AddTradie = (props) => {
  const Id = props.match.params.id;

  const history = useHistory();
  const [image, setImage] = useState([]);
  const [editUser, setEditUser] = useState(false);
  const [selectData, setSelectData] = useState();
  const dispatch = useDispatch();
  const { addTradieRes } = useSelector((state) => state.addTradieRes);
  const { singleUser } = useSelector((state) => state.singleUser);
  const { editTradieRes } = useSelector((state) => state.editTradieRes);
  const { categoriesList } = useSelector((state) => state.categoriesList);
  // const [searchFormData, setSearchFormData] = useState({
  //   searchQuery: "",
  //   latitude: "",
  //   longitude: "",
  //   locationAdress: "",
  // });

  useEffect(() => {
    setTimeout(() => {
      dispatch(categoryList());
    }, 2000);
  }, []);
  const catData = categoriesList?.data;

  useEffect(() => {
    if (Id) {
      dispatch(SingleUserAction(Id));
      setEditUser(true);
    }
  }, [Id]);
  const { data } = singleUser;
  const singleUserData = data ? data[0] : "";
 
  // const dateDOB = moment(singleUserData.dob).format("YYYY-MM-DD");

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
    professional_experience: "",
    website_link: "",
    business_name: "",
    license_number: "",
    // category: [],
    house_number: "",
    business_postcode: "",
    business_country: "",
    business_state: "",
    business_city: "",
    working_radius: "0",
    street: "",
    service_type: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
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
    country_code: Yup.string()
      .required("Country Code is required")
      .matches(/^(\+?\d{1,3}|\d{1,4})$/, "Invailid"),
    gender: Yup.string().required("Gender  is required"),
    // dob: Yup.string().required("DOB  is required"),
    country: Yup.string()
      .required("Country is required")
      .matches(/^[a-zA-Z]*$/, "Country name is invalid"),
    city: Yup.string()
      .required("City is required")
      .matches(/^[a-zA-Z]*$/, "City name is invalid"),
    professional_experience: Yup.string().required(
      "Professional Experience is required"
    ),
    website_link: Yup.string().required("Website Link  is required").min(5),
    business_name: Yup.string().required("Business Name  is required"),

    // category: Yup.string().required("Category is required"),
    house_number: Yup.string().required("House/Flat Number is required"),
    business_postcode: Yup.string().required("Postcode/Zipcode is required"),
    business_country: Yup.string()
      .required("Country is required")
      .matches(/^[a-zA-Z]*$/, "Business country is invalid"),
    business_state: Yup.string()
      .required("State is required")
      .matches(/^[a-zA-Z]*$/, "Business state is invalid"),
    business_city: Yup.string()
      .required("City is required")
      .matches(/^[a-zA-Z]*$/, "Business city is invalid"),
    working_radius: Yup.string().required("Working Radius is required"),
    street: Yup.string().required("Street is required"),
  });
  // Category Options
  const SelectOption = catData?.map((val) => {
    return { value: val.id, label: val.name };
  });
  // Category Onchange
  const handleSelect = (e) => {
    const dataId = e?.map((res) => res.value);
    setSelectData(dataId);
  };

  // Add Tradie
  const handleSubmit = (values) => {
    // if (image && image[0] && image[0].size < 512000) {
    let formData = new FormData();
    formData.append("userId", "");
    formData.append("name", values.name);
    formData.append("mobile", values.mobile);
    formData.append("email", values.email);
    // formData.append("profile_image", image ? image[0] : "");
    formData.append("gender", values.gender);
    // formData.append("dob", values.dob);
    formData.append("status", "active");
    formData.append("country", values.country);
    formData.append("city", values.city);
    formData.append("country_code", values.country_code);
    formData.append("professional_experience", values.professional_experience);
    formData.append("website_link", values.website_link);
    formData.append("business_name", values.business_name);
    formData.append("license_number", values.license_number);
    formData.append("house_number", values.house_number);
    formData.append("business_postcode", values.business_postcode);
    formData.append("business_country", values.business_country);
    formData.append("business_state", values.business_state);
    formData.append("business_city", values.business_city);
    formData.append("working_radius", values.working_radius);
    formData.append("street", values.street);
    formData.append("service_type", values.service_type);
    formData.append("latitude", "26.850262");
    formData.append("longitude", "75.761726");
    formData.append("category", selectData);

    dispatch(addTradie(formData));
    // }
    // else {
    image[0]
      ? toast.error("Image Shoulde be less then 500Kb", {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          size: "small",
        })
      : "";
    // }
  };

  // Edit  Tradie
  const editSingle = async (values) => {
    // console.log("values", values);

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
    formData.append("professional_experience", values.professional_experience);
    formData.append("website_link", values.website_link);
    formData.append("business_name", values.business_name);
    formData.append("license_number", values.license_number);
    formData.append("house_number", values.house_number);
    formData.append("business_postcode", values.business_postcode);
    formData.append("business_country", values.business_country);
    formData.append("business_state", values.business_state);
    formData.append("business_city", values.business_city);
    formData.append("working_radius", values.working_radius);
    formData.append("street", values.street);
    formData.append("service_type", values.service_type);
    formData.append("status", values.status);
    formData.append("latitude", "26.850262");
    formData.append("longitude", "75.761726");
    // formData.append(
    //   "profile_image",
    //   image[0] ? image[0] : singleUserData.profile_image
    // );
    dispatch(updateTradie(formData));
  };

  // For Edit Tradie default value
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
    status:
      singleUserData && singleUserData.status ? singleUserData.status : "",
    service_type:
      singleUserData && singleUserData.service_type
        ? singleUserData.service_type
        : "",
    professional_experience:
      singleUserData && singleUserData.professional_experience
        ? singleUserData.professional_experience
        : "",
    website_link:
      singleUserData && singleUserData.website_link
        ? singleUserData.website_link
        : "",
    business_name:
      singleUserData && singleUserData.business_name
        ? singleUserData.business_name
        : "",
    license_number:
      singleUserData && singleUserData.license_number
        ? singleUserData.license_number
        : "",
    house_number:
      singleUserData && singleUserData?.business_Address[0]?.house_no
        ? singleUserData?.business_Address[0]?.house_no
        : "",
    business_postcode:
      singleUserData && singleUserData.business_Address[0]?.pincode
        ? singleUserData.business_Address[0]?.pincode
        : "",
    business_country:
      singleUserData && singleUserData.business_Address[0]?.country
        ? singleUserData.business_Address[0]?.country
        : "",
    business_state:
      singleUserData && singleUserData.business_Address[0]?.state
        ? singleUserData.business_Address[0]?.state
        : "",
    business_city:
      singleUserData && singleUserData.business_Address[0]?.city
        ? singleUserData.business_Address[0]?.city
        : "",
    working_radius:
      singleUserData && singleUserData.working_radius
        ? singleUserData.working_radius
        : "",
    street:
      singleUserData && singleUserData.business_Address[0]?.street
        ? singleUserData.business_Address[0]?.street
        : "",
  };
  // useEffect(() => {
  //   setTimeout(() => {

  //   const Catdata = singleUserData?.category_data?.map((val) => {
  //     return { value: val.id, label: val.name };
  //   });
  //   console.log("Data :", Catdata);
  //   setSelectData(Catdata);
  //   // console.log("Category",{ value: val.id })
  // }, 2000);
  // }, []);

  useEffect(() => {
    if (addTradieRes) {
      if (addTradieRes.status === 1) {
        toast.success("Successfully Added", {
          position: "bottom-left",
          autoClose: 2000,
          size: "small",
        });
        history.push("/backend/tradie");
      } else {
        toast.error(addTradieRes.message, {
          position: "bottom-left",
          autoClose: 2000,
          size: "small",
        });
      }
    }
    setTimeout(() => {
      dispatch({ type: "ADD_TRADIE", payloade: "" });
    }, 1000);
  }, [addTradieRes]);

  useEffect(() => {
    if (editTradieRes) {
      if (editTradieRes.status === 1) {
        toast.success("Successfully Updated", {
          position: "bottom-left",
          autoClose: 2000,
          size: "small",
        });
        history.push("/backend/tradie");
      } else {
        toast.error(editTradieRes.message, {
          position: "bottom-left",
          autoClose: 2000,
          size: "small",
        });
      }
    }
    setTimeout(() => {
      dispatch({ type: "EDIT_TRADIE", payloade: "" });
    }, 1000);
  }, [editTradieRes]);
  // const customStyles = {
  //   option: (provided, state) => ({
  //     ...provided,
  //     borderBottom: '1px dotted pink',
  //     color: state.isSelected ? 'red' : 'blue',

  //   }),
  //   control: () => ({
  //     // none of react-select's styles are passed to <Control />

  //   }),
  //   singleValue: (provided, state) => {
  //     const opacity = state.isDisabled ? 0.5 : 1;
  //     const transition = 'opacity 300ms';

  //     return { ...provided, opacity, transition };
  //   }
  // }

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
                {/* <Grid item xs={12} sm={12}>
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
                        Name
                      </InputLabel>
                      <SuiInput
                        type="text"
                        placeholder="Name"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        onBlur={formik.handleBlur}
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
                            onBlur={formik.handleBlur}
                          />
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
                        error={formik.errors.email && formik.touched.email}
                        onBlur={formik.handleBlur}
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
                        onBlur={formik.handleBlur}
                        error={formik.errors.country && formik.touched.country}
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
                        Professional Experience
                      </InputLabel>
                      <SuiInput
                        type="text"
                        placeholder="Professional Experience"
                        name="professional_experience"
                        onChange={formik.handleChange}
                        value={formik.values.professional_experience}
                        error={
                          formik.errors.professional_experience &&
                          formik.touched.professional_experience
                        }
                        onBlur={formik.handleBlur}
                        success={
                          formik.values.professional_experience.length > 0 &&
                          !formik.errors.professional_experience
                        }
                      />
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {" "}
                        {formik.errors.professional_experience &&
                        formik.touched.professional_experience ? (
                          <div>{formik.errors.professional_experience}</div>
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
                        Website Link
                      </InputLabel>
                      <SuiInput
                        type="text"
                        placeholder="Website Link "
                        name="website_link"
                        onChange={formik.handleChange}
                        value={formik.values.website_link}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors.website_link &&
                          formik.touched.website_link
                        }
                        success={
                          formik.values.website_link.length > 0 &&
                          !formik.errors.website_link
                        }
                      />
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {" "}
                        {formik.errors.website_link &&
                        formik.touched.website_link ? (
                          <div>{formik.errors.website_link}</div>
                        ) : null}
                      </span>
                    </SuiBox>
                  </Grid>

                  {Id ? (
                    ""
                  ) : (
                    <Grid item xs={12} sm={12} md={4}>
                      <InputLabel
                        variant="standard"
                        style={{ fontSize: "15px" }}
                      >
                        Category
                      </InputLabel>
                      <Select
                        // value={selectData}

                        onChange={
                          handleSelect
                          // setSelectData({ id: e.value, name: e })
                        }
                        isMulti
                        name="category"
                        options={SelectOption}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        size="small"
                        placeholder="Select Category"
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} sm={4}>
                    <FormControl component="fieldset">
                      <FormLabel
                        component="legend"
                        style={{ fontSize: "15px" }}
                      >
                        Service Type
                      </FormLabel>
                      <FormGroup aria-label="position" row>
                        <FormControlLabel
                          control={
                            <Checkbox
                              value="residential"
                              name="service_type"
                              checked={
                                formik.values.service_type.includes(
                                  "residential"
                                )
                                  ? true
                                  : false
                              }
                              onChange={formik.handleChange}
                            />
                          }
                          label="Residential"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              value="commercial"
                              name="service_type"
                              checked={
                                formik.values.service_type.includes(
                                  "commercial"
                                )
                                  ? true
                                  : false
                              }
                              onChange={formik.handleChange}
                            />
                          }
                          label="Commercial"
                        />
                      </FormGroup>
                      {/* <RadioGroup
                        row
                        aria-label="service_type"
                        name="service_type"
                        value={formik.values.service_type}
                      >
                        <FormControlLabel
                          value="residential"
                          control={<Radio />}
                          label="Residential"
                          onChange={formik.handleChange}
                        />
                        <FormControlLabel
                          value="commercial"
                          control={<Radio />}
                          label="Commercial"
                          onChange={formik.handleChange}
                        />
                      </RadioGroup> */}
                    </FormControl>
                    <span style={{ color: "red", fontSize: "12px" }}>
                      {" "}
                      {formik.errors.service_type &&
                      formik.touched.service_type ? (
                        <div>{formik.errors.service_type}</div>
                      ) : null}
                    </span>
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
                        className="form-select"
                        value={formik.values.status}
                        onChange={formik.handleChange}
                      >
                        <option value="inactive">Inactive</option>
                        <option value="active">Active</option>
                      </Field>
                    </Grid>
                  ) : (
                    ""
                  )}
                </Grid>
                <hr />
                <h4>Business Details/Address</h4>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <SuiBox>
                      <InputLabel
                        variant="standard"
                        style={{ fontSize: "15px" }}
                      >
                        Business Name
                      </InputLabel>
                      <SuiInput
                        type="text"
                        placeholder="Business Name "
                        name="business_name"
                        onChange={formik.handleChange}
                        value={formik.values.business_name}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors.business_name &&
                          formik.touched.business_name
                        }
                        success={
                          formik.values.business_name.length > 0 &&
                          !formik.errors.business_name
                        }
                      />
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {" "}
                        {formik.errors.business_name &&
                        formik.touched.business_name ? (
                          <div>{formik.errors.business_name}</div>
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
                        License Number
                      </InputLabel>
                      <SuiInput
                        type="text"
                        placeholder="License Number "
                        name="license_number"
                        onChange={formik.handleChange}
                        value={formik.values.license_number}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors.license_number &&
                          formik.touched.license_number
                        }
                        success={
                          formik.values.license_number.length > 0 &&
                          !formik.errors.license_number
                        }
                      />
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {" "}
                        {formik.errors.license_number &&
                        formik.touched.license_number ? (
                          <div>{formik.errors.license_number}</div>
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
                        House/Flat Number
                      </InputLabel>
                      <SuiInput
                        type="text"
                        placeholder="House/Flat Number"
                        name="house_number"
                        onChange={formik.handleChange}
                        value={formik.values.house_number}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors.house_number &&
                          formik.touched.house_number
                        }
                        success={
                          formik.values.house_number.length > 0 &&
                          !formik.errors.house_number
                        }
                      />
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {" "}
                        {formik.errors.house_number &&
                        formik.touched.house_number ? (
                          <div>{formik.errors.house_number}</div>
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
                        Postcode/ Zipcode
                      </InputLabel>
                      <SuiInput
                        type="text"
                        placeholder="Postcode/ Zipcode"
                        name="business_postcode"
                        onChange={formik.handleChange}
                        value={formik.values.business_postcode}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors.business_postcode &&
                          formik.touched.business_postcode
                        }
                        success={
                          formik.values.business_postcode.length > 0 &&
                          !formik.errors.business_postcode
                        }
                      />
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {" "}
                        {formik.errors.business_postcode &&
                        formik.touched.business_postcode ? (
                          <div>{formik.errors.business_postcode}</div>
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
                        Country
                      </InputLabel>
                      <SuiInput
                        type="text"
                        placeholder="Country"
                        name="business_country"
                        onChange={formik.handleChange}
                        value={formik.values.business_country}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors.business_country &&
                          formik.touched.business_country
                        }
                        success={
                          formik.values.business_country.length > 0 &&
                          !formik.errors.business_country
                        }
                      />
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {" "}
                        {formik.errors.business_country &&
                        formik.touched.business_country ? (
                          <div>{formik.errors.business_country}</div>
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
                        State
                      </InputLabel>
                      <SuiInput
                        type="text"
                        placeholder="State"
                        name="business_state"
                        onChange={formik.handleChange}
                        value={formik.values.business_state}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors.business_state &&
                          formik.touched.business_state
                        }
                        success={
                          formik.values.business_state.length > 0 &&
                          !formik.errors.business_state
                        }
                      />
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {" "}
                        {formik.errors.business_state &&
                        formik.touched.business_state ? (
                          <div>{formik.errors.business_state}</div>
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
                        name="business_city"
                        onChange={formik.handleChange}
                        value={formik.values.business_city}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors.business_city &&
                          formik.touched.business_city
                        }
                        success={
                          formik.values.business_city.length > 0 &&
                          !formik.errors.business_city
                        }
                      />
                      {/* <LocationAutocomplete
                        state={searchFormData}
                        setStateFunction={setSearchFormData}
                      /> */}
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {" "}
                        {formik.errors.business_city &&
                        formik.touched.business_city ? (
                          <div>{formik.errors.business_city}</div>
                        ) : null}
                      </span>
                    </SuiBox>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <SuiBox>
                      <InputLabel
                        variant="standard"
                        style={{
                          fontSize: "15px",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <p>Working Radius</p>
                        <p>{`${formik.values.working_radius}Km`}</p>
                      </InputLabel>

                      <SuiInput
                        type="range"
                        placeholder="Set Working Radius"
                        name="working_radius"
                        onChange={formik.handleChange}
                        value={formik.values.working_radius}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors.working_radius &&
                          formik.touched.working_radius
                        }
                        success={
                          formik.values.working_radius.length > 0 &&
                          !formik.errors.working_radius
                        }
                      />
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {" "}
                        {formik.errors.working_radius &&
                        formik.touched.working_radius ? (
                          <div>{formik.errors.working_radius}</div>
                        ) : null}
                      </span>
                    </SuiBox>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <SuiBox>
                      <InputLabel
                        variant="standard"
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        Street
                      </InputLabel>

                      <SuiInput
                        type="text"
                        placeholder="Street"
                        name="street"
                        onChange={formik.handleChange}
                        value={formik.values.street}
                        error={formik.errors.street && formik.touched.street}
                        onBlur={formik.handleBlur}
                        success={
                          formik.values.street.length > 0 &&
                          !formik.errors.street
                        }
                      />
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {" "}
                        {formik.errors.street && formik.touched.street ? (
                          <div>{formik.errors.street}</div>
                        ) : null}
                      </span>
                    </SuiBox>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={2} mt={2}>
                  <SuiButton
                    variant="gradient"
                    color="warning"
                    fullWidth
                    type="submit"
                    disable={isSubmitting}
                  >
                    {Id ? "Save Change" : "Add Tradie"}
                  </SuiButton>
                </Grid>
              </Card>
            </Form>
          );
        }}
      </Formik>
    </DashboardLayout>
  );
};

export default AddTradie;
