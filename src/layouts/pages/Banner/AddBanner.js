import React, { useEffect, useState } from 'react'
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useSelector, useDispatch } from "react-redux";
import {  BannerList , EditBanner } from "redux/actions/action"
import { useHistory } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";
import Dropzone from "../../../layouts/Dropzone/Dropzone";
import InputLabel from "@mui/material/InputLabel";
import SuiBox from "components/SuiBox";
import SuiInput from "components/SuiInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
import "bootstrap/dist/css/bootstrap.min.css";

import { Grid } from "@mui/material";

import SuiButton from "components/SuiButton";
import { Card } from "@mui/material";
// Handling Form with Formik
import { Formik, Form, Field } from "formik";
// Handling Form Validation with yup
import * as Yup from "yup";
function AddBanner(props) {
    const dispatch = useDispatch();
    const { updateBannerRes } = useSelector((state) => state.updateBannerRes);
    const history = useHistory();
    const [image, setImage] = useState([]);
    const [editUser, setEditUser] = useState(false);
    const id = props.match.params.id;
    const { bannerData } = useSelector(state => state.bannerData)


    const { data } = bannerData;
    const singleBannerData = data ? data[0] : "";


    console.log("S",singleBannerData)
    console.log("update",updateBannerRes)

    useEffect(() => {
        dispatch(BannerList())
    }, [])


    const initialValues = {
        id: singleBannerData && singleBannerData.id ? singleBannerData.id : "",
        name: singleBannerData && singleBannerData.name ? singleBannerData.name : "",
        number : singleBannerData && singleBannerData.number ? singleBannerData.number : "",
        status:singleBannerData && singleBannerData.status ? singleBannerData.status : "" ,
        image_link: singleBannerData && singleBannerData.image_link ? singleBannerData.image_link : "",
        image : singleBannerData && singleBannerData.image ? singleBannerData.image : ""
    }

    const handleSubmit = (values) => {
     
        if (image && image[0] === undefined) {
            toast.error("Please Select Image", {
                position: "bottom-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                size: "small",
            })
        }
        else {

            let formData = new FormData();
            formData.append("bannerId", values.id);
            formData.append("name", values.name);
            formData.append('status',values.status);
            formData.append('number',values.number);

            formData.append("image_link", values.image_link);
            formData.append("image", image ? image[0] : "");
            dispatch(EditBanner(formData));
            console.log("VAL",values)
           

        }
    }

    useEffect(() => {
        if (updateBannerRes) {
          if (updateBannerRes.status === 1) {
            toast.success(updateBannerRes.message, {
                position: "bottom-left",
                autoClose: 2000,
                size: "small",
              });
            history.push("/backend/banner");
          } else {
            toast.error(updateBannerRes.message, {
              position: "bottom-left",
              autoClose: 2000,
              size: "small",
            });
          }
        }
        setTimeout(() => {
          dispatch({ type: "UPDATE_BANNER", payloade: "" });
        }, 1000);
      }, [updateBannerRes]);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required").min(4),

    });
    return (
        <>
            <DashboardLayout>
                <DashboardNavbar />

                <hr />
                <Formik
                    enableReinitialize="true"
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    {(formik, isSubmitting) => {
                        return (
                            <Form autoComplete="off">
                                <Card style={{ padding: "15px" }}>

                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={5}>
                                            <SuiBox>
                                                <InputLabel
                                                    variant="standard"
                                                    style={{ fontSize: "15px" }}
                                                >
                                                    Title
                                                </InputLabel>
                                                <SuiInput
                                                    type="text"
                                                    placeholder="Title"
                                                    name="name"
                                                    onChange={formik.handleChange}
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
                                                    ) : null
                                                    }
                                                </span>
                                            </SuiBox>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Dropzone
                                                acceptType="image/*"
                                                files={image}
                                                setFiles={setImage}
                                                onChange={formik.handleChange}
                                                imgSrc={
                                                    image && image.length
                                                        ? ""
                                                        : formik.values.image
                                                            ? `https://api.tapatradie.com/banner/` +
                                                            formik.values.image
                                                            : ""
                                                }
                                                title="Upload Banner Photo"
                                                caption="Upload Image "
                                            />
                                        </Grid>
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
                                            // value={formik.values.status}
                                            >
                                                <option value="inactive">Inactive</option>
                                                <option value="active">Active</option>
                                            </Field>
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
                                            Update
                                        </SuiButton>
                                    </Grid>
                                    <hr />
                                </Card>
                            </Form>
                        );
                    }}
                </Formik>

            </DashboardLayout>
        </>
    )
}

export default AddBanner
