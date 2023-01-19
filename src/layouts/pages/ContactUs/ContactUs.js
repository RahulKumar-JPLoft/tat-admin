import React, { useEffect,useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MaterialTable from "material-table";
import { Card, IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";

import "react-toastify/dist/ReactToastify.css";
import Slide from "@mui/material/Slide";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  contactus,
  contactusDel,
  contactUsStatus,
} from "../../../redux/actions/action";
import Swal from "sweetalert2";

toast.configure();
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// For model
const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 1, borderBottom: "2px solid grey" }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            float: "right",
            top: 0,
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


const ContactUs = () => {
  const dispatch = useDispatch();
  const { contactUsList } = useSelector((state) => state.contactUsList);
  const { contactUsDel } = useSelector((state) => state.contactUsDel);
  const { contactUsSts } = useSelector((state) => state.contactUsSts);
  const [showFeed, setShowFeed] = useState(false);
  const [addressData, setAddress] = useState();

  const modelForFeed = (data) => {
    setAddress(data);
    setShowFeed(true);
  };
  const handleClose = () => {
    setShowFeed(false);
    setAddress();

  };


  useEffect(() => {
    dispatch(contactus());
  }, [contactUsDel, contactUsSts]);

  const { data } = contactUsList;

  const deleteContactUs = (id) => {
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
        dispatch(contactusDel(id));
      }
    });
  };

  useEffect(() => {
    if (contactUsDel) {
      if (contactUsDel.status === 1) {
        toast.success("Deleted Successfully", {
          position: "bottom-left",
          autoClose: 2000,
          size: "small",
        });
      } else {
        toast.error(contactUsDel.message, {
          position: "bottom-left",
          autoClose: 1000,
          size: "small",
        });
      }
    }
    setTimeout(() => {
      dispatch({ type: "CONTACT_US_DEL", payloade: "" });
    }, 1000);
  }, [contactUsDel]);

  const statusChange = (e, id) => {
    const data = e + "/" + id;
    dispatch(contactUsStatus(data));

  };

  useEffect(() => {
    if (contactUsSts) {
      if (contactUsSts.status === 1) {
        Swal.fire("Status Updated");
      }
    }
    setTimeout(() => {
      dispatch({ type: "CONTACT_US_STATUS", payloade: "" });
    }, 1000);
  }, [contactUsSts]);


  
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card style={{ marginTop: "14px" }}>
        {data ? (
          <MaterialTable
            title=""
            columns={[
              {
                title: "S.No",
                // field: "id",
                render: (rowData) => rowData.tableData.id + 1,
              },
              { title: "Name", field: "full_name" },
              { title: "Email", field: "email" },
             

              {
                title: "Message", field: "message",
                // render: (rowData) =>
                //   rowData.address ? rowData.address : "N/A",
                render: (rowData) => (
                  <>
                    <span style={{ whiteSpace: "nowrap" }}>
                      {rowData.message.substr(0, 20)}
                    </span>
                    <br />
                    {rowData.message.substring(20) ? (
                      <small
                        style={{
                          color: "#0012e2",
                          float: "right",
                          cursor: "pointer",
                        }}
                        onClick={() => modelForFeed(rowData.message)}
                      >
                        Read More
                      </small>
                    ) : (
                      ""
                    )}
                  </>
                ),
              },
              
              {
                title: "Date",
                render: (rowData) =>
                  moment(rowData.created_on, "x").format("DD MMM YYYY hh:mm a"),
              },
              // {
              //   title: "Status",
              //   field: "status",
              //   render: (rowData) => (
              //     <select
              //       className="form-select"
              //       style={{ width: "115px" }}
              //       value={rowData.status}
              //       onChange={(e) => statusChange(e.target.value, rowData.id)}
              //     >
              //       <option value="pending">Pending</option>
              //       <option value="resolved">Resolved</option>
              //     </select>
              //   ),
              // },

              {
                title: "Action ",
                render: (rowData) => (
                  <IconButton
                    onClick={() => deleteContactUs(rowData.id)}
                    title="Delete"
                  >
                    <DeleteIcon style={{ color: "red" }} title="Delete" />
                  </IconButton>
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
          open={showFeed}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
          maxWidth="xs"
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            Message
          </BootstrapDialogTitle>

          <Card>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                {addressData}
              </DialogContentText>
            </DialogContent>
          </Card>
        </Dialog>
      </Card>
    </DashboardLayout>
  );
};

export default ContactUs;
