import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MaterialTable from "material-table";
// MUI component
import { Card, IconButton, InputLabel, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { SUPPORTlist } from "redux/actions/action";
import moment from "moment";

const Support = () => {
  const dispatch = useDispatch();
  const { Support_List } = useSelector((state) => state.Support_List);
  const { loading } = useSelector((state) => state.loading);
  const [SearchSelect, setSearchSelect] = useState();
  const [searchBox, setSearchBox] = useState();

  useEffect(() => {
    if (searchBox) {
      let url = `${SearchSelect}=${searchBox}`;
      dispatch(SUPPORTlist(url));
    } else {
      dispatch(SUPPORTlist());
    }
  }, [SearchSelect, searchBox]);

  

  const filterFunc = (e) => {
    setSearchSelect(e.target.value);
    setSearchBox("");
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card style={{ marginTop: "14px" }}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={2} md={2} ml={2}>
            {/* <InputLabel style={{fontSize:"12px"}}>Select</InputLabel> */}
            <select className="form-control searchSelect" onChange={filterFunc}>
              <option value="allUser">All</option>
              <option value="name">Name</option>
              <option value="category">Category</option>
              <option value="user_type">User Type</option>
            </select>
          </Grid>
          {SearchSelect && SearchSelect == "name" ? (
            <Grid item xs={6} sm={4} md={4}>
              <input
                type="text"
                className="form-control searchBox"
                placeholder={`Search by ${
                  SearchSelect.charAt(0).toUpperCase() + SearchSelect.slice(1)
                }`}
                // value={searchBox}
                style={{
                  margin: "10px 0px 5px 5px",
                  position: "absolute",
                  zIndex: 1,
                  width: "13rem",
                }}
                onChange={(e) => setSearchBox(e.target.value.toLowerCase())}
              />
            </Grid>
          ) : (
            ""
          )}
          {SearchSelect && SearchSelect === "category" ? (
            <Grid item xs={6} sm={4} md={4}>
              <select
                className="form-control "
                style={{
                  margin: "10px 0px 5px 5px",
                  position: "absolute",
                  zIndex: 1,
                  width: "13rem",
                }}
                value={searchBox}
                onChange={(e) => setSearchBox(e.target.value)}
              >
                <option value="">Search By Category</option>
                <option value="General">General</option>
                <option value="Technical">Technical</option>
                <option value="Other">Other</option>
              </select>
            </Grid>
          ) : (
            ""
          )}
          {SearchSelect && SearchSelect === "user_type" ? (
            <Grid item xs={6} sm={4} md={4}>
              <select
                className="form-control "
                style={{
                  margin: "10px 0px 5px 5px",
                  position: "absolute",
                  zIndex: 1,
                  width: "13rem",
                }}
                onChange={(e) => setSearchBox(e.target.value)}
              >
                <option value="">Search By User Type</option>
                <option value="provider">Provider</option>
                <option value="user">User</option>
                {/* <option value="Other">Other</option> */}
              </select>
            </Grid>
          ) : (
            ""
          )}
        </Grid>
        {loading ? (
          <MaterialTable
            title=""
            columns={[
              {
                title: "S.NO",
                render: (rowData) => rowData.tableData.id + 1,
              },

              {
                title: "Name",
                field: "full_name",
                render: (rowData) => (
                  <span style={{ whiteSpace: "nowrap" }}>
                    {rowData.full_name
                      ? rowData.full_name.charAt(0).toUpperCase() +
                        rowData.full_name.slice(1)
                      : "N/A"}
                  </span>
                ),
              },

              {
                title: "User Type",
                field: "access",
                render: (rowData) => (
                  <span style={{ whiteSpace: "nowrap" }}>
                    {rowData.access
                      ? rowData.access.charAt(0).toUpperCase() +
                        rowData.access.slice(1)
                      : "N/A"}
                  </span>
                ),
              },
              {
                title: "Category",
                field: "category",
              },
              {
                title: "Message",
                field: "message",
              },
              {
                title: "Date",
                field: "created_at",
                render: (rowData) => (
                  <span style={{ whiteSpace: "nowrap" }}>
                    {rowData?.created_at
                      ? moment(rowData?.created_at, "x").format(
                          "DD MMM YYYY hh:mm a"
                        )
                      : "N/A"}
                  </span>
                ),
              },
            ]}
            data={Support_List}
            options={{
              headerStyle: {
                textAlign: "center",
                border: "2px solid white",
                // borderBottom: "1px solid black",
                width: 0,
                fontSize: "14px",
                whiteSpace: "nowrap",
                // textAlign: 'left',
                flexDirection: "row",
                overflow: "hidden",
                textOverflow: "ellipsis",
                // backgroundColor: theme.palette.primary.table
                backgroundColor: " #ee8b26 ",
                // fontWeight: "bold",
                color: "  white ",
              },
              cellStyle: {
                textAlign: "center",
                flexDirection: "row",
                overflow: "hidden",
                padding: 5,
                paddingLeft: 2,
                fontSize: "14px",
              },
              exportButton: true,
              exportAllData: true,
              search: false,
              // search: SearchSelect && SearchSelect !== "allUser" ? true : false,
              sorting: true,
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

export default Support;
