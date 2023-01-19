import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MaterialTable from "material-table";
// Mui Component
import { Card, IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

import { Link } from "react-router-dom";
import moment from "moment";
// redux hooks
import { useDispatch, useSelector } from "react-redux";
import { ratingReview, ratingDelete } from "redux/actions/action";
import StarRatings from "react-star-ratings";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          style={{
            backgroundColor: "rgb(238, 139, 38)",
            color: "white",
            marginLeft: "2px",
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const Rate = () => {
  const [showFeed, setShowFeed] = useState(false);
  const [reviewData, setReviewData] = useState();
  const dispatch = useDispatch();
  const { ratingList } = useSelector((state) => state.ratingList);
  const { ratingDelRes } = useSelector((state) => state.ratingDelRes);
  const { data } = ratingList;

  useEffect(() => {
    dispatch(ratingReview());
  }, [ratingDelRes]);

  const modelForFeed = (data) => {
    setReviewData(data);
    setShowFeed(true);
  };
  const handleClose = () => {
    setShowFeed(false);
  };

  const deleteRating = (id) => {
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
        dispatch(ratingDelete(id));
      }
    });
  };

  useEffect(() => {
    if (ratingDelRes) {
      if (ratingDelRes.status === 1) {
        toast.success("Deleted SuccessFully", {
          position: "bottom-left",
          autoClose: 2000,
          size: "small",
        });
      } else {
        toast.error(ratingDelRes.message, {
          position: "bottom-left",
          autoClose: 1000,
          size: "small",
        });
      }
    }
    setTimeout(() => {
      dispatch({ type: "RATING_DELETE", payloade: "" });
    }, 1000);
  }, [ratingDelRes]);

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
              { title: " Job Title", field: "title" },
              { title: " Job ID", field: "rid" },

              {
                title: "Ratings",
                render: (rowData) => (
                  <span style={{ whiteSpace: "nowrap" }}>
                    <StarRatings
                      rating={Math.round(Number(rowData.rating) * 10) / 10}
                      starRatedColor="orange"
                      numberOfStars={5}
                      name="rating"
                      starSpacing="1px"
                      starDimension="17px"
                    />
                  </span>
                ),
                sorting: false,
              },
              {
                title: "Reviews",
                field: "review",
                render: (rowData) => (
                  <>
                    <span style={{ whiteSpace: "nowrap" }}>
                      {rowData.review.substr(0, 20)}
                    </span>
                    <br />
                    {rowData.review.substring(20) ? (
                      <small
                        style={{
                          color: "#0012e2",
                          float: "right",
                          cursor: "pointer",
                        }}
                        onClick={() => modelForFeed(rowData.review)}
                      >
                        Read More
                      </small>
                    ) : (
                      ""
                    )}
                  </>
                ),
              },
              { title: " Tradie Name", field: "tradiName" },
              { title: " User Name", field: "userName" },
              { title: " Job Type", field: "service_type" },
              { title: "Job Status", field: "status" },

              {
                title: "Date",
                render: (rowData) => (
                  <span style={{ whiteSpace: "nowrap" }}>
                    {moment(rowData.created_on, "x").format(
                      "DD MMM YYYY hh:mm a"
                    )}
                  </span>
                ),
              },
              {
                title: "Action",
                render: (rowData) => (
                  <span style={{ whiteSpace: "nowrap" }}>
                    {rowData.tradiName ? (
                      <Link to={"/backend/view-Job/" + rowData.id}>
                        <IconButton title="View">
                          <VisibilityIcon
                            style={{ color: "#f58222" }}
                            title="View"
                          />
                        </IconButton>
                      </Link>
                    ) : (
                      <IconButton title="View">
                        <VisibilityIcon
                          style={{ color: "#f58222" }}
                          title="View"
                        />
                      </IconButton>
                    )}
                    <IconButton
                      onClick={() => deleteRating(rowData.rid)}
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
            {/* <CircularProgress color="secondary" /> */}
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
            Feedback
          </BootstrapDialogTitle>

          <Card>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                {reviewData}
              </DialogContentText>
            </DialogContent>
          </Card>
        </Dialog>
      </Card>
    </DashboardLayout>
  );
};

export default Rate;
