import React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MaterialTable from "material-table";
// Mui Component
import { Card, Grid, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import SuiButton from "components/SuiButton";

const Notification = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card style={{ marginTop: "14px" }}>
        <Grid item xs={6} sm={2}>
          <Link to="/backend/setting/add-notification">
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
        {/* {data ? ( */}
        <MaterialTable
          title=""
          columns={[
            {
              title: "S.No",
              render: (rowData) => rowData.tableData.id + 1,
            },
            { title: "Title", field: "title" },
            { title: "To", field: "to" },
            { title: "Description", field: "description" },
            {
              title: "Created Date",
              field: "created_at",
              render: (rowData) =>
                moment(rowData.created_at).format("DD MMM YYYY hh:mm a"),
            },
          ]}
          // data={data}
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
            sorting: false,
            exportButton: true,
            exportAllData: true,
            debounceInterval: 700,
            padding: "dense",
          }}
        />
        {/* ) : (
          <center>
            <img
              src="https://i.pinimg.com/originals/43/c7/a0/43c7a0928088b901910ab187816c8f65.gif"
              alt="avatar"
              width={100}
              height={100}
            />
          </center>
        )} */}
      </Card>
    </DashboardLayout>
  );
};

export default Notification;
