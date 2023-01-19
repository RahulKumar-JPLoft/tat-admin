import { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// Css for add button
import "../pages.css";
import { useDispatch, useSelector } from "react-redux";
import DummyProfile from "../../../assets/images/user.png";
import {
  // fetchUsers,
  deleteUser,
  changeUserStatus,
} from "../../../redux/actions/action";
import { Link } from "react-router-dom";
import MaterialTable from "material-table";
// MUI component
import { Card, IconButton, InputLabel, Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
// import CircularProgress from "@mui/material/CircularProgress";

// MUI Icon
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// import DoneIcon from "@mui/icons-material/Done";
// import CancelIcon from "@mui/icons-material/Cancel";
import Swal from "sweetalert2";

// Soft UI Dashboard PRO React components
// import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import moment from "moment";

const User = () => {
  const [SearchSelect, setSearchSelect] = useState();
  const [searchBox, setSearchBox] = useState();
  const [tableData, setTableData] = useState([]);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { deleteUserRes } = useSelector((state) => state.deleteUserRes);
  const { userStatus } = useSelector((state) => state.userStatus);
  const [reFeatch, setRefeatch] = useState(null);
  // useEffect(() => {
  //   dispatch(fetchUsers());
  // }, [deleteUserRes, userStatus]);
  // const { data } = user;

  const deleteUserID = (id) => {
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
        dispatch(deleteUser(id));
      }
    });
  };
  useEffect(() => {
    if (deleteUserRes) {
      if (deleteUserRes.status === 1) {
        Swal.fire("Deleted!", "User has been deleted.", "success");
      }
    }
    setTimeout(() => {
      dispatch({ type: "DELETEUSER", payloade: "" });
    }, 1000);
  }, [deleteUserRes]);
  const ChangeStatus = (id, status) => {
    const newStatus = status === "active" ? "inactive" : "active";
    const data = { status: newStatus, userId: id };
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
        dispatch(changeUserStatus(data));
      }
    });
  };

  useEffect(() => {
    if (userStatus) {
      if (userStatus.status === 1) {
        Swal.fire("Status Updated");
      }
    }
    setTimeout(() => {
      dispatch({ type: "USERSTATUSRES", payloade: "" });
    }, 1000);
  }, [userStatus]);
  const filterFunc = (e) => {
    setSearchSelect(e.target.value);
    setSearchBox("");
  };
  useEffect(() => {
    if (deleteUserRes) {
      setRefeatch(deleteUserRes);
    } else if (userStatus) {
      setRefeatch(userStatus);
    }
  }, [deleteUserRes, userStatus]);

  useEffect(() => {
    const callapi = async () => {
      let url = "http://3.109.98.222:3349/backend/v2/users/user?";
      if (searchBox) {
        url += `${SearchSelect}=${searchBox}`;
      }
      // url += "&page=" + (query.page + 1);
      // url += "&per_page=" + query.pageSize;
      try {
        await fetch(url)
          .then((response) => response.json())
          .then((result) => {
            setTableData(result.data);
            setLoader(true);
          });
      } catch (e) {
        console.log(e);
      }
      if (SearchSelect === "allUser") {
        setSearchBox("");
      }
    };
    callapi();
  }, [SearchSelect, searchBox, reFeatch]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card style={{ marginTop: "14px" }}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={2}>
            <Link to="/backend/add-user">
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
                Add User
              </SuiButton>
            </Link>
          </Grid>

          <Grid item xs={6} sm={2} md={2}>
            {/* <InputLabel style={{fontSize:"12px"}}>Select</InputLabel> */}
            <select className="form-control searchSelect" onChange={filterFunc}>
              <option value="allUser">All Users</option>
              <option value="name">Name</option>
              <option value="mobile">Mobile</option>
              <option value="email">Email</option>
              {/* <option value="device_type">Device Type</option> */}
            </select>
          </Grid>
          {SearchSelect && SearchSelect !== "allUser" ? (
            <Grid item xs={6} sm={4} md={4}>
              <input
                type="text"
                className="form-control searchBox"
                placeholder={`Search by ${
                  SearchSelect.charAt(0).toUpperCase() + SearchSelect.slice(1)
                }`}
                value={searchBox}
                style={{
                  margin: "10px 0px 5px 5px",
                  position: "absolute",
                  zIndex: 1,
                  width: "13rem",
                }}
                onChange={(e) => setSearchBox(e.target.value)}
              />
            </Grid>
          ) : (
            ""
          )}
          {/* {SearchSelect && SearchSelect == "device_type" ? (
            <Grid item xs={6} sm={3} md={3}>
              <select
                className="form-select typeSelect"
                onChange={(e) => {
                  setSearchBox(e.target.value);
                }}
                style={{
                  margin: "10px 5px 5px 5px",
                  position: "absolute",
                  zIndex: 1,
                  width: "10rem",
                }}
              >
                <option value="">Select Type</option>
                <option value="3">Web</option>
                <option value="1">Android</option>
                <option value="2">IOS</option>
              </select>
            </Grid>
          ) : (
            ""
          )} */}
        </Grid>

        {/* {
 tableData && tableData.length>0 ? ( */}

        {loader ? (
          <MaterialTable
            title=""
            columns={[
              {
                title: "S.NO",
                render: (rowData) => rowData.tableData.id + 1,
              },
              {
                title: "Image",
                // field: "profile_pic",
                render: (rowData) => (
                  <center>
                    <Avatar
                      alt="profile"
                      src={
                        rowData && rowData.profile_pic
                          ? `https://api.tapatradie.com/profile/${rowData.id}/` +
                            rowData.profile_pic
                          : DummyProfile
                      }
                    />
                  </center>
                ),
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
                title: "Email",
                field: "email",
                render: (rowData) => (rowData.email ? rowData.email : "N/A"),
              },
              {
                title: "Mobile",
                field: "mobile",
                type: "numeric",
                render: (rowData) => (
                  <span style={{ whiteSpace: "nowrap" }}>
                    {rowData
                      ? rowData.country_code + " " + rowData.mobile
                      : "N/A"}
                  </span>
                ),
              },
              {
                title: "Total Hirings",
                field: "totalJobs",
                render: (rowData) =>
                  rowData.totalJobs > 0 ? (
                    <Link to={"/backend/total-hiring/" + rowData.id}>
                      {rowData.totalJobs}
                    </Link>
                  ) : (
                    rowData.totalJobs
                  ),
              },
              {
                title: "Created date",
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
                render: (rowData) =>
                  rowData?.status?.charAt(0).toUpperCase() +
                  rowData?.status?.slice(1),
              },
              {
                title: "Action",
                render: (rowData) => (
                  <span style={{ whiteSpace: "nowrap" }}>
                    <Link to={"/backend/view-user/" + rowData.id}>
                      <IconButton title="View">
                        <VisibilityIcon
                          style={{ color: "#f58222" }}
                          title="View"
                        />
                      </IconButton>
                    </Link>
                    <IconButton title="Edit">
                      <Link to={"/backend/edit-user/" + rowData.id}>
                        <EditIcon style={{ color: "gray" }} title="Edit" />
                      </Link>
                    </IconButton>
                    <IconButton
                      onClick={() => deleteUserID(rowData.id)}
                      title="Delete"
                    >
                      <DeleteIcon style={{ color: "red" }} title="Delete" />
                    </IconButton>
                  </span>
                ),
                sorting: false,
              },
            ]}
            data={tableData}
            // data={(query) =>
            //   new Promise((resolve, reject) => {
            //     let url = "http://3.109.98.222:3349/backend/v2/users/user?";
            //     if (query.search) {
            //       url += `${SearchSelect}=${query.search}`;
            //     }
            //     // url += "&page=" + (query.page + 1);
            //     // url += "&per_page=" + query.pageSize;
            //     console.log(query);
            //     fetch(url)
            //       .then((response) => response.json())
            //       .then((result) => {
            //         resolve({
            //           data: result.data,
            //           page: result.page,
            //           totalCount: result.data ? result.data.length : "NAN",
            //         });
            //       });
            //   })
            // }
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
              pageSize: 10,
            }}
            localization={{ toolbar: { searchPlaceholder: SearchSelect } }}
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

export default User;
