import { useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MaterialTable from "material-table";
import { Card, Grid, IconButton } from "@mui/material";
// MUI Icon
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { tradieTv, TradieTvDelete } from "../../../redux/actions/action";
import moment from "moment";
import SuiButton from "components/SuiButton";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const TradieTv = () => {
  const dispatch = useDispatch();
  const { TradieTvData } = useSelector((state) => state.TradieTvData);
  const { TradieTvDelRes } = useSelector((state) => state.TradieTvDelRes);

  useEffect(() => {
    dispatch(tradieTv());
  }, [TradieTvDelRes]);
  const { data } = TradieTvData;

  const deleteTradieTv = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(TradieTvDelete(id));
      }
    });
  };
  useEffect(() => {
    if (TradieTvDelRes) {
      if (TradieTvDelRes.status === 1) {
        toast.success("Deleted SuccessFully", {
          position: "bottom-left",
          autoClose: 2000,
          size: "small",
        });
      } else {
        toast.error(TradieTvDelRes.message, {
          position: "bottom-left",
          autoClose: 1000,
          size: "small",
        });
      }
    }
    setTimeout(() => {
      dispatch({ type: "DELETE_TRADIE_TV", payloade: "" });
    }, 1000);
  }, [TradieTvDelRes]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card style={{ marginTop: "14px" }}>
        <Grid item xs={6} sm={2}>
          <Link to="/backend/add-tradieTv">
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
              Add New
            </SuiButton>
          </Link>
        </Grid>
        {data ? (
          <MaterialTable
            title=""
            columns={[
              {
                title: "S.No",
                // field: "id",
                render: (rowData) => rowData.tableData.id + 1,
              },
              { title: "Video Title", field: "video_title" },
              {
                title: "Video Link",
                field: "video_link",
                render: (rowData) => (
                  <iframe
                    src={rowData.video_link}
                    title="Video"
                    allowFullScreen
                    frameborder="0"
                    webkitallowfullscreen
                    mozallowfullscreen
                  ></iframe>
                ),
              },
              { title: "Category", field: "categoryId" },
              { title: "Featured", field: "is_featured" },

              {
                title: "Date",
                field: "created_on",
                render: (rowData) => (
                  <span style={{ whiteSpace: "nowrap" }}>
                    {moment(rowData.created_on, "x").format(
                      "DD MMM YYYY hh:mm a"
                    )}
                  </span>
                ),
              },
              { title: "Status", field: "status", sorting: false },
              {
                title: "Action ",
                render: (rowData) => (
                  <span style={{ whiteSpace: "nowrap" }}>
                    <IconButton title="Edit">
                      <Link to={"/backend/edit-tradieTv/" + rowData.id}>
                        <EditIcon style={{ color: "gray" }} title="Edit" />
                      </Link>
                    </IconButton>

                    <IconButton
                      onClick={() => deleteTradieTv(rowData.id)}
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
      </Card>
    </DashboardLayout>
  );
};

export default TradieTv;
