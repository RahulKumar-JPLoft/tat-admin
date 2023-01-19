import React, { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MaterialTable from "material-table";
import Avatar from "@mui/material/Avatar";
import { Card, Grid, IconButton } from "@mui/material";
import DummyProfile from "../../../assets/images/user.png";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
// MUI Icon
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

import { useDispatch, useSelector } from "react-redux";
import { blogDataList, blogDel } from "../../../redux/actions/action";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
// Soft UI Dashboard PRO React components
import SuiButton from "components/SuiButton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

toast.configure();

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            float: "right",
            top: 0,
            padding: "5px",
            // color: (theme) => theme.palette.grey[500],
          }}
          style={{ backgroundColor: "rgb(238, 139, 38)", color: "white" }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};
const Blogs = () => {
  const [open, setOpen] = useState(false);
  const [blogDesc, setBlogDesc] = useState();
  const dispatch = useDispatch();
  const { blogList } = useSelector((state) => state.blogList);
  const { blogDelRes } = useSelector((state) => state.blogDelRes);

  useEffect(() => {
    dispatch(blogDataList());
  }, [blogDelRes]);
  const { data } = blogList;

  const openDesModel = (data) => {
    setBlogDesc(data);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const deleteBlogPost = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(blogDel(id));
      }
    });
  };
  useEffect(() => {
    if (blogDelRes) {
      if (blogDelRes.status === 1) {
        toast.success("Deleted SuccessFully", {
          position: "bottom-left",
          autoClose: 2000,
          size: "small",
        });
      } else {
        toast.error(blogDelRes.message, {
          position: "bottom-left",
          autoClose: 1000,
          size: "small",
        });
      }
    }
    setTimeout(() => {
      dispatch({ type: "BLOG_DEL", payloade: "" });
    }, 1000);
  }, [blogDelRes]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card style={{ marginTop: "14px" }}>
        <Grid item xs={6} sm={2}>
          <Link to="/backend/add-blog">
            <SuiButton
              variant="gradient"
              color="warning"
              style={{
                margin: "10px 0px 5px 5px",
                color: "white",
                borderRadius: "5px",
                position: "absolute",
                zIndex: 1,
                width: "110px",
              }}
              className="addNew"
              fullWidth
            >
              Add Blog
            </SuiButton>
          </Link>
        </Grid>
        {data ? (
          <MaterialTable
            title=""
            columns={[
              {
                title: "S.NO",
                // field: "id",
                render: (rowData) => rowData.tableData.id + 1,
              },
              {
                title: "Image",
                // field: "image",
                render: (rowData) => (
                  <Avatar
                    alt="profile"
                    src={
                      rowData && rowData.featured_img
                        ? rowData.featured_img
                        : DummyProfile
                    }
                  />
                  // src={
                  //   rowData && rowData.featured_img?
                  //   `https://api.tapatradie.com/profile/`+ rowData.featured_img:DummyProfile
                  // }
                ),
                sorting: false,
              },
              {
                title: "Title",
                field: "title",
              },
              {
                title: "Description",
                field: "description",
                render: (rowData) => (
                  <IconButton
                    title="View"
                    onClick={() => openDesModel(rowData.description)}
                  >
                    <VisibilityIcon style={{ color: "#f58222" }} title="View" />
                  </IconButton>
                ),
              },
              {
                title: "Created On",
                field: "created_on",
                render: (rowData) => (
                  <span style={{ whiteSpace: "nowrap" }}>
                    {moment(rowData.created_on, "x").format(
                      "DD MMM YYYY hh:mm a"
                    )}
                  </span>
                ),
              },
              {
                title: "Status",
                field: "status",
                // render: (rowData) => (
                //   <span style={{ whiteSpace: "nowrap" }}>
                //     {moment(rowData.created_on, "x").format(
                //       "DD MMM YYYY hh:mm a"
                //     )}
                //   </span>
                // ),
              },
              {
                title: "Action",
                render: (rowData) => (
                  <span style={{ whiteSpace: "nowrap" }}>
                    <IconButton title="Edit">
                      <Link to={"/backend/edit-blog/" + rowData.id}>
                        <EditIcon style={{ color: "gray" }} title="Edit" />
                      </Link>
                    </IconButton>
                    <IconButton
                      onClick={() => deleteBlogPost(rowData.id)}
                      title="Delete"
                    >
                      <DeleteIcon style={{ color: "red" }} title="Delete" />
                    </IconButton>
                  </span>
                ),
                sorting: false,
              },
            ]}
            data={data}
            options={{
              headerStyle: {
                textAlign: "center",
                border: "2px solid white",
                width: 0,
                fontSize: "14px",
                whiteSpace: "nowrap",
                flexDirection: "row",
                overflow: "hidden",
                textOverflow: "ellipsis",
                backgroundColor: " #ee8b26 ",
                color: "  white ",
              },
              cellStyle: {
                textAlign: "center",
                flexDirection: "row",
                overflow: "hidden",
                fontSize: "14px",
              },
              sorting: true,
              exportButton: true,
              exportAllData: true,
              debounceInterval: 700,
              padding: "dense",
            }}
          />
        ) : (
          <center>
            <img
              src="https://i.pinimg.com/originals/43/c7/a0/43c7a0928088b901910ab187816c8f65.gif"
              alt="avatar"
              width={100}
              height={100}
            />
          </center>
        )}
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          {/* <DialogTitle>{"Blog Description"}</DialogTitle> */}
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            Blog Description
          </BootstrapDialogTitle>
          <Card style={{ padding: "10px" }}>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                {parse(`${blogDesc}`)}
              </DialogContentText>
            </DialogContent>
          </Card>
        </Dialog>
      </Card>
    </DashboardLayout>
  );
};

export default Blogs;
