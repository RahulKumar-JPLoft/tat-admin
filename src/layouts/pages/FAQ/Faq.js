import React, { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Link, useHistory } from "react-router-dom";
import MaterialTable from "material-table";
import { Card, IconButton, Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import { useDispatch, useSelector } from "react-redux";
import { faqAction, faqDelete } from "../../../redux/actions/action";
// MUI Icon
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
// Soft UI Dashboard PRO React components
import SuiButton from "components/SuiButton";
import Swal from "sweetalert2";
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
            color: (theme) => theme.palette.grey[500],
          }}
          style={{ backgroundColor: "rgb(238, 139, 38)", color: "white" }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const Faq = () => {
  const [open, setOpen] = useState(false);
  const [faqDesc, setFaqDesc] = useState();

  const dispatch = useDispatch();
  const { faqData } = useSelector((state) => state.faqData);
  const { faqDelRes } = useSelector((state) => state.faqDelRes);

  useEffect(() => {
    dispatch(faqAction());
  }, [faqDelRes]);

  const { data } = faqData;

  const openDesModel = (data) => {
    setFaqDesc(data);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const deleteFaqData = (id) => {
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
        dispatch(faqDelete(id));
      }
    });
  };
  useEffect(() => {
    if (faqDelRes) {
      if (faqDelRes.status === 1) {
        toast.success("Deleted SuccessFully", {
          position: "bottom-left",
          autoClose: 2000,
          size: "small",
        });
      } else {
        toast.error(faqDelRes.message, {
          position: "bottom-left",
          autoClose: 1000,
          size: "small",
        });
      }
    }
    setTimeout(() => {
      dispatch({ type: "FAQ_DELETE", payloade: "" });
    }, 1000);
  }, [faqDelRes]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card style={{ marginTop: "14px" }}>
        <Grid item xs={6} sm={2}>
          <Link to="/backend/add-FAQ">
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
              Add FAQ
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
                title: "FAQ Title",
                field: "faq_title",
                // render: (rowData) =>
                //    rowData.title ? rowData.full_name : "N/A",
              },
              // {
              //   title: "FAQ Category",
              //   field: "faq_category",
              // },
              {
                title: "FAQ Description",
                field: "faq_description",
                render: (rowData) => (
                  <IconButton
                    title="View"
                    onClick={() => openDesModel(rowData.faq_description)}
                  >
                    <VisibilityIcon style={{ color: "#f58222" }} title="View" />
                  </IconButton>
                ),
                sorting: false,
              },
              // {
              //   title: "Category name",
              //   field: "category_name",
              //   render: (rowData) => (
              //     <span style={{ whiteSpace: "nowrap" }}>
              //       {rowData.category_name}
              //     </span>
              //   ),
              // },
              {
                title: "Created on",
                field: "created_on",
                render: (rowData) =>
                  moment(rowData.created_on, "x").format("DD MMM YYYY hh:mm a"),
              },
              {
                title: "Status",
                field: "status",
              },
              {
                title: "Action",
                render: (rowData) => (
                  <span style={{ whiteSpace: "nowrap" }}>
                    <IconButton title="Edit">
                      <Link to={"/backend/edit-faq/" + rowData.id}>
                        <EditIcon style={{ color: "gray" }} title="Edit" />
                      </Link>
                    </IconButton>
                    <IconButton
                      onClick={() => deleteFaqData(rowData.id)}
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
                ft: 2,
                fontSize: "14px",
              },
              exportButton: true,
              sorting: true,
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
          // onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            Faq Description
          </BootstrapDialogTitle>
          <Card>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                {faqDesc}
              </DialogContentText>
            </DialogContent>
          </Card>
        </Dialog>
      </Card>
    </DashboardLayout>
  );
};

export default Faq;
