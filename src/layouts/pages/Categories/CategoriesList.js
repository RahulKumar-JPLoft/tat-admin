import React, { useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Link } from "react-router-dom";
import MaterialTable from "material-table";
// Mui component
import { Card, Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { IconButton } from "@mui/material";
//mui icons
// import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";
// redux hooks
import { useDispatch, useSelector } from "react-redux";
import {
  categoryList,
  deleteService,
  serviceStatus,
} from "redux/actions/action";
// Soft UI Dashboard PRO React components
import SuiButton from "components/SuiButton";
// Css for add button
import "../pages.css";
import Swal from "sweetalert2";
import moment from "moment";

const CategoriesList = () => {
  const dispatch = useDispatch();
  const { categoriesList } = useSelector((state) => state.categoriesList);
  const { categorieseDel } = useSelector((state) => state.categorieseDel);
  const { serviceStatusRes } = useSelector((state) => state.serviceStatusRes);

  useEffect(() => {
    dispatch(categoryList());
  }, [serviceStatusRes, categorieseDel]);

  const { data } = categoriesList;
  const deleteCategory = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteService(id));
      }
    });
  };

  useEffect(() => {
    if (categorieseDel) {
      if (categorieseDel.status === 1) {
        Swal.fire("Deleted!", "User has been deleted.", "success");
      } else if (categorieseDel.status === 0) {
        Swal.fire({ icon: "error", text: categorieseDel.message });
      }
    }
    setTimeout(() => {
      dispatch({ type: "CAT_DEL", payloade: "" });
    }, 1000);
  }, [categorieseDel]);

  const ChnageStatus = (id, status) => {
    const statusChange = status === "active" ? "inactive" : "active";
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(serviceStatus(id, statusChange));
      }
    });
  };
  useEffect(() => {
    if (serviceStatusRes) {
      if (serviceStatusRes.status === 0) {
        Swal.fire(serviceStatusRes.message);
      }
    }
    setTimeout(() => {
      dispatch({ type: "STATUS_CAT", payloade: "" });
    }, 1000);
  }, [serviceStatusRes]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card style={{ marginTop: "14px" }}>
        <Grid item xs={6} sm={2}>
          <Link to="/backend/add-Category">
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
                title: "S.NO",
                // field: "id",
                render: (rowData) => rowData.tableData.id + 1,
              },
              {
                title: "Category Name",
                field: "name",
                render: (rowData) =>
                  rowData.type
                    ? rowData.name?.charAt(0).toUpperCase() +
                      rowData?.name?.slice(1)
                    : "N/A",
              },
              {
                title: " Tradies Count",
                field: "tradie_count",
                render: (rowData) =>
                  rowData.tradie_count > 0 ? (
                    <Link to={"/backend/tradies-by-category/" + rowData.id}>
                      {rowData.tradie_count ? rowData.tradie_count : "N/A"}
                    </Link>
                  ) : rowData.tradie_count ? (
                    rowData.tradie_count
                  ) : (
                    "N/A"
                  ),
              },

              {
                title: "Type",
                field: "type",
                render: (rowData) =>
                  rowData.type
                    ? rowData.type?.charAt(0).toUpperCase() +
                      rowData?.type?.slice(1)
                    : "N/A",
              },
              {
                title: "Jobs Count",
                field: "totalJobs",
                render: (rowData) =>
                  rowData.totalJobs > 0 ? (
                    <Link to={"/backend/job-by-category/" + rowData.id}>
                      {rowData.totalJobs ? rowData.totalJobs : "N/A"}
                    </Link>
                  ) : rowData.totalJobs ? (
                    rowData.totalJobs
                  ) : (
                    "N/A"
                  ),
              },
              {
                title: "Created On ",
                field: "created_on",
                render: (rowData) =>
                  rowData.created_on ? (
                    <span style={{ whiteSpace: "nowrap" }}>
                      {" "}
                      {moment(rowData.created_on, "x").format(
                        "DD MMM YYYY hh:mm a"
                      )}
                    </span>
                  ) : (
                    "N/A"
                  ),
              },
              {
                title: "Status",
                field: "status",
                render: (rowData) =>
                  rowData.status?.charAt(0).toUpperCase() +
                  rowData?.status?.slice(1),
              },
             

              {
                title: "Action",
                render: (rowData) => (
                  <span style={{ whiteSpace: "nowrap" }}>
                    <Link to={"/backend/edit-category/" + rowData.id}>
                      <IconButton title="Edit">
                        <EditIcon style={{ color: "gray" }} title="Edit" />
                      </IconButton>
                    </Link>
                    <IconButton
                      title="Delete"
                      onClick={() => deleteCategory(rowData.id)}
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
                textAlign: "left",
                flexDirection: "row",
                overflow: "hidden",
                textOverflow: "ellipsis",
                backgroundColor: " #ee8b26 ",
                color: " white ",
              },
              cellStyle: {
                textAlign: "left",
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
      </Card>
    </DashboardLayout>
  );
};

export default CategoriesList;
