import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MaterialTable from "material-table";
// import Avatar from "@mui/material/Avatar";
import { Card } from "@mui/material";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

import { useDispatch, useSelector } from "react-redux";
import { BannerList } from "../../../redux/actions/action";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IconButton, InputLabel, Grid } from "@mui/material";
import SuiButton from "components/SuiButton";
toast.configure();

const Banner = () => {
  const dispatch = useDispatch();
  const { bannerData } = useSelector((state) => state.bannerData);
  const [deleteJo, setDeleteJo] = useState(false);

  useEffect(() => {
    dispatch(BannerList());
  }, []);
  const { data } = bannerData;

  // const statusChange = (e, id) => {
  //   const data = e + "/" + id;
  //   Swal.fire({
  //     title: "Are you sure?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     cancelButtonText: "No",
  //     confirmButtonText: "Yes",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       dispatch(changeJobsStatus(data));
  //     }
  //   });

  //   setDeleteJo(false);
  // };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card style={{ marginTop: "14px" }}>
        {/* <Grid container spacing={2}>
          <Grid item xs={6} sm={2}>
            <Link to="/backend/add-banner">
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
                Add Banner
              </SuiButton>
            </Link>
          </Grid>
          </Grid> */}

        {data ? (
          <MaterialTable
            title=""
            columns={[
              {
                title: "S.No",
                // field: "id",
                render: (rowData) => rowData.tableData.id + 1,
              },
              { title: "Name", field: "name" },
              {
                title: "Image",
                field: "image",
                render: (rowData) => (
                  <img
                    src={"https://api.tapatradie.com/banner/" + rowData.image}
                    alt=""
                    style={{ width: "12em", height: "9rem" }}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://www.nicopress.com/media/images/800/0/404-not-found.png";
                    }}
                  />
                ),
                sorting: false,
              },
              {
                title: "Date",
                field: "created_on",
                render: (rowData) =>
                  moment(rowData.created_on, "x").format("DD MMM YYYY hh:mm a"),
              },
              {
                title: "Status",
                field: "status",
                sorting: false,
              },
              {
                title: "Action",
                render: (data) => (
                  <span style={{ whiteSpace: "nowrap" }}>
                    <Link to={"/backend/edit-banner"}>
                      {/* <Link to={"/backend/edit-banner/"}> */}

                      <IconButton title="Edit">
                        <EditIcon style={{ color: "#f58222" }} title="Edit" />
                      </IconButton>
                    </Link>
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

export default Banner;
