import React, { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Card, Grid, InputLabel } from "@mui/material";
import { useHistory } from "react-router-dom";
// Handling Form with Formik
import { Formik, Form, Field } from "formik";
// Handling Form Validation with yup
import * as Yup from "yup";
// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";
import Dropzone from "../../../layouts/Dropzone/Dropzone";
import { useDispatch, useSelector } from "react-redux";
import { blogAdd, singleBlog, blogEdit } from "../../../redux/actions/action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const AddBlog = (props) => {
  const Id = props.match.params.id;
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    if (Id) {
      dispatch(singleBlog(Id));
      setEditUser(true);
    }
  }, [Id]);
  const { blogAddRes } = useSelector((state) => state.blogAddRes);
  const { singleBlogD } = useSelector((state) => state.singleBlogD);
  const { data } = singleBlogD;

  // const [editorNewState, setEditorNewState] = useState();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [image, setImage] = useState([]);
  const [editUser, setEditUser] = useState(false);

  useEffect(() => {
    if (Id) {
      setTimeout(() => {
        setEditorState(
          EditorState.createWithContent(
            ContentState.createFromBlockArray(
              convertFromHTML(`${data?.description}`)
            )
          )
        );
      }, 1000);
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, [data]);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const initialValues = {
    title: "",
    featured: "",
    status: "active",
    featured_img: "",
    // description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required(" Title is required"),
    // description: Yup.string().required("Description is required"),
    featured: Yup.number().required("Featured is required"),
    status: Yup.string().required("Status is required"),
    // featured_img: Yup.string().required("Featured img is required"),
  });
  const handleSubmit = (values) => {
    if (image && image[0] && image[0].size < 2000000) {
      let formData = new FormData();
      formData.append("blogId", "");
      formData.append("title", values.title);
      formData.append(
        "description",
        draftToHtml(convertToRaw(editorState.getCurrentContent()))
      );
      formData.append("featured", values.featured);
      formData.append("status", values.status);
      formData.append("featured_img", image ? image[0] : "");

      dispatch(blogAdd(formData));
    } else if (image && image[0] == undefined) {
      toast.error("Please Select Image ", {
        position: "bottom-left",
        autoClose: 2000,
        size: "small",
      });
    } else {
      toast.error("Please Select Image With 2 Mb Size Only", {
        position: "bottom-left",
        autoClose: 2000,
        size: "small",
      });
    }
  };
  const editSingle = (values) => {
    let formData = new FormData();
    formData.append("blogId", data.id);
    formData.append("title", values.title);
    formData.append(
      "description",
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
    formData.append("featured", values.featured);
    formData.append("status", values.status);
    formData.append("featured_img", image ? image[0] : data.featured_img);

    dispatch(blogEdit(data.id, formData));
  };
  const editValues = {
    blogId: data && data.id ? data.id : "",
    title: data && data.title ? data.title : "",
    featured: data ? data.is_featured : "",
    featured_img: data && data.featured_img ? data.featured_img : "",
    status: data && data.status ? data.status : "",
  };

  useEffect(() => {
    if (blogAddRes) {
      if (blogAddRes.status === 1) {
        toast.success(blogAddRes.message, {
          position: "bottom-left",
          autoClose: 2000,
          size: "small",
        });
        history.push("/backend/blog");
      } else {
        toast.error(blogAddRes.message, {
          position: "bottom-left",
          autoClose: 1000,
          size: "small",
        });
      }
    }
    setTimeout(() => {
      dispatch({ type: "BLOG_ADD", payloade: "" });
    }, 1000);
    setTimeout(() => {
      dispatch({ type: "BLOG_EDIT", payloade: "" });
    }, 1000);
  }, [blogAddRes]);
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
                <Grid item xs={12} sm={12}>
                  <Dropzone
                    acceptType="image/*"
                    files={image}
                    setFiles={setImage}
                    onChange={formik.handleChange}
                    imgSrc={
                      image && image.length
                        ? ""
                        : formik.values.featured_img
                        ? formik.values.featured_img
                        : ""
                    }
                    name="featured_img"
                    title="Upload Image"
                    caption="Upload Image "
                  />
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6} xl={4}>
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
                        name="title"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        error={formik.errors.title && formik.touched.title}
                      />
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {" "}
                        {formik.errors.title && formik.touched.title ? (
                          <div>{formik.errors.title}</div>
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
                      {/* <SuiInput
                        type="text"
                        placeholder="Featured"
                        name="featured"
                        onChange={formik.handleChange}
                        value={formik.values.featured}
                        error={
                          formik.errors.featured && formik.touched.featured
                        }
                      /> */}
                      <Field
                        as="select"
                        name="featured"
                        className="form-select"
                        value={formik.values.featured}
                        onChange={formik.handleChange}
                      >
                        <option value="">Select</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                      </Field>
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
                  <Grid item xs={12} md={12} xl={12}>
                    <InputLabel variant="standard" style={{ fontSize: "15px" }}>
                      Description
                    </InputLabel>
                    {data ? (
                      <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={onEditorStateChange}
                        name="description"
                      />
                    ) : (
                      <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={onEditorStateChange}
                        name="description"
                      />
                    )}
                    <span style={{ color: "red", fontSize: "12px" }}>
                      {" "}
                      {formik.errors.description &&
                      formik.touched.description ? (
                        <div>{formik.errors.description}</div>
                      ) : null}
                    </span>
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
                    {Id ? "Save Change" : "Add Blog"}
                  </SuiButton>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Card>

      {/* <textarea
        disabled
        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        style={{ width: "100%", height: "100%" }}
      /> */}
    </DashboardLayout>
  );
};

export default AddBlog;
