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

// Handling Form with Formik
import { Formik, Form } from "formik";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

import { useDispatch, useSelector } from "react-redux";
import { privacyList, pagesUpdate } from "../../../redux/actions/action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, Grid, InputLabel } from "@mui/material";
import Swal from "sweetalert2";

toast.configure();

const PrivacyPolicy = () => {
  const dispatch = useDispatch();
  const { PolicyList } = useSelector((state) => state.PolicyList);
  const { aboutusRes } = useSelector((state) => state.aboutusRes);
  const { data } = PolicyList;
  useEffect(() => {
    dispatch(privacyList());
  }, [aboutusRes]);
  const [editorState, setEditorState] = useState();

  useEffect(() => {
    setTimeout(() => {
      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(
            convertFromHTML(`${data ? data.content : "<p>N/A</p>"}`)
          )
        )
      );
    }, 1000);
  }, [data]);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const initialValues = {
    id: data ? data.id : 1,
    title: data ? data.title : "N/A",
    status: "active",
    slug: "privacypolicy",
  };

  const handleSubmit = (values) => {
    const data = {
      content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      slug: "privacypolicy",
    };
    dispatch(pagesUpdate(data));
  };

  useEffect(() => {
    if (aboutusRes) {
      if (aboutusRes.status === 1) {
        Swal.fire(aboutusRes.message);
      }
    }
    setTimeout(() => {
      dispatch({ type: "ABOUT_US_UPDATE", payloade: "" });
    }, 1000);
  }, [aboutusRes]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card sx={{ height: "100%" }} style={{ padding: "15px" }}>
        <Formik
          enableReinitialize="true"
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {(formik) => {
            return (
              <Form autoComplete="off">
                <Grid container spacing={3}>
                  <Grid item xs={12} md={12} xl={12}>
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
                        readOnly
                      />
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {" "}
                        {formik.errors.title && formik.touched.title ? (
                          <div>{formik.errors.title}</div>
                        ) : null}
                      </span>
                    </SuiBox>
                  </Grid>

                  <Grid item xs={12} md={12} xl={12}>
                    <InputLabel variant="standard" style={{ fontSize: "15px" }}>
                      Description
                    </InputLabel>
                    <Editor
                      editorState={editorState}
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClassName"
                      onEditorStateChange={onEditorStateChange}
                      name="description"
                    />

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
                    Update
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

export default PrivacyPolicy;
