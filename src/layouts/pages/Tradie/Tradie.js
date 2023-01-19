import { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MaterialTable from "material-table";
// Css for add button
import "../pages.css";
// MUI Components
import CircularProgress from "@mui/material/CircularProgress";
import { IconButton } from "@mui/material";
import { Card, Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTradie,
  deleteUser,
  changeUserStatus,
  tradieApproval,
} from "../../../redux/actions/action";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import Swal from "sweetalert2";
// import moment from "moment";

// MUI Icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";
import DummyProfile from "../../../assets/images/user.png";

// Soft UI Dashboard PRO React components
// // import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const Tradie = () => {
  const dispatch = useDispatch();
  const { tradieList } = useSelector((state) => state.tradieList);
  const { deleteUserRes } = useSelector((state) => state.deleteUserRes);
  const { tradie_loader } = useSelector((state) => state.loading);
  const { approvalTradieRes } = useSelector((state) => state.approvalTradieRes);
  const [SearchSelect, setSearchSelect] = useState();
  const [searchBox, setSearchBox] = useState();
  const [reFeatch, setRefeatch] = useState(null);
  // const error = useSelector((state) => state.error);
  // const errors = error.error;

  useEffect(() => {
    dispatch(fetchTradie());
  }, [reFeatch]);

  useEffect(() => {
    if (deleteUserRes) {
      setRefeatch(deleteUserRes);
    } else if (approvalTradieRes) {
      setRefeatch(approvalTradieRes);
    }
  }, [deleteUserRes, approvalTradieRes]);
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
        Swal.fire("Deleted!", "Tradie has been deleted.", "success");
      }
    }
    setTimeout(() => {
      dispatch({ type: "DELETEUSER", payloade: "" });
    }, 1000);
  }, [deleteUserRes]);

  useEffect(() => {
    if (approvalTradieRes) {
      if (approvalTradieRes.status === 1) {
        toast.success(approvalTradieRes.message, {
          position: "bottom-left",
          autoClose: 2000,
          size: "small",
          fontSize: "12px",
        });
      }
    }
    setTimeout(() => {
      dispatch({ type: "TRADIE_APPROVAL", payloade: "" });
    }, 1000);
  }, [approvalTradieRes]);

  // const tradieRating = data ? Math.round(Number(data[0].rating) * 10) / 10 : "";
  const filterFunc = (e) => {
    setSearchSelect(e.target.value);
    setSearchBox("");
    if (e.target.value === "allUser") {
      setRefeatch(1);
      setTimeout(() => {
        setRefeatch(null);
      }, 300);
    }
  };

  const FilterButton = () => {
    dispatch({ type: "TRADIE_LOADER", payload: false });
    if (searchBox) {
      let url = `${SearchSelect}=${searchBox?.toLowerCase()}`;
      dispatch(fetchTradie(url));
    }
  };

  const ChangeStatus = (id, status) => {
    const newStatus = status === "active" ? "inactive" : "active";
    const data = { status: newStatus, userId: id };
    dispatch(changeUserStatus(data));
  };
  const approvedChange = (e, id) => {
    const data = { status: e, userId: id };

    dispatch(tradieApproval(data));
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card style={{ marginTop: "14px" }}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={2}>
            <Link to="/backend/add-tradie">
              <SuiButton
                variant="gradient"
                color="warning"
                style={{
                  margin: "10px 0px 5px 5px",
                  color: "white",
                  borderRadius: "5px",
                  position: "absolute",
                  zIndex: 1,
                  width: "119px",
                }}
                className="addNew"
                fullWidth
              >
                Add Tradie
              </SuiButton>
            </Link>
          </Grid>
          <Grid item xs={6} sm={2} md={2}>
            {/* <InputLabel style={{fontSize:"12px"}}>Select</InputLabel> */}
            <select className="form-select searchSelect" onChange={filterFunc}>
              <option value="allUser">All Tradies</option>
              <option value="name">Name</option>
              <option value="mobile">Mobile</option>
              <option value="email">Email</option>
              <option value="type">Tradie Type</option>
              <option value="device_type">Device Type</option>
            </select>
          </Grid>
          {SearchSelect &&
          SearchSelect !== "allUser" &&
          SearchSelect !== "type" &&
          SearchSelect !== "device_type" ? (
            <Grid item xs={6} sm={3} md={3}>
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
                  width: "10rem",
                }}
                onChange={(e) => {
                  setSearchBox(e.target.value);
                }}
              />
            </Grid>
          ) : (
            ""
          )}
          {SearchSelect && SearchSelect == "type" ? (
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
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
              </select>
            </Grid>
          ) : (
            ""
          )}
          {SearchSelect && SearchSelect == "device_type" ? (
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
          )}
          {SearchSelect && SearchSelect !== "allUser" ? (
            <Grid item xs={6} sm={2} md={2}>
              <SuiButton
                variant="gradient"
                color="warning"
                onClick={FilterButton}
                className="applyButton"
                style={{
                  margin: "10px 0px 5px -70px",
                  position: "absolute",
                  zIndex: 1,
                  color: "white",
                  borderRadius: "5px",
                  // width: "119px",
                }}
              >
                Apply
              </SuiButton>
            </Grid>
          ) : (
            ""
          )}
        </Grid>
        {tradie_loader ? (
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
                render: (rowData) => (
                  <Avatar
                    alt="profile"
                    src={
                      rowData && rowData.profile_pic
                        ? `https://api.tapatradie.com/profile/${rowData.id}/` +
                          rowData.profile_pic
                        : DummyProfile
                    }
                  />
                ),
              },
              {
                title: "Name",
                field: "full_name",
                render: (rowData) => (
                  <span style={{ whiteSpace: "nowrap" }}>
                    {" "}
                    {rowData.full_name
                      ? rowData.full_name.charAt(0).toUpperCase() +
                        rowData.full_name.slice(1)
                      : "N/A"}
                  </span>
                ),
              },
              {
                title: "Tradie Type",
                field: "Ttype",
                render: (rowData) => (
                  <span style={{ whiteSpace: "nowrap" }}>
                    {" "}
                    {rowData?.Ttype == "active" ? "Paid" : "Unpaid"}
                  </span>
                ),
              },
              {
                title: "Device Type",
                field: "Ttype",
                render: (rowData) => (
                  <span style={{ whiteSpace: "nowrap" }}>
                    {" "}
                    {rowData && rowData.android_customer_id
                      ? "Android"
                      : rowData.ios_customer_id
                      ? "IOS"
                      : "Web"}
                  </span>
                ),
              },
              {
                title: "Ratings",
                field: "rating",
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
              },
              {
                title: "Email",
                field: "email",
                render: (rowData) => (rowData.email ? rowData.email : "N/A"),
              },
              {
                title: "Mobile",
                field: "mobile",
                render: (rowData) => (rowData.mobile ? rowData.mobile : "N/A"),
              },
              {
                title: "Jobs Count",
                field: "tradiJobs",
                render: (rowData) =>
                  rowData.tradiJobs > 0 ? (
                    <Link to={"/backend/Job-by-tradie/" + rowData.id}>
                      {rowData.tradiJobs ? rowData.tradiJobs : "N/A"}
                    </Link>
                  ) : rowData.tradiJobs ? (
                    rowData.tradiJobs
                  ) : (
                    "N/A"
                  ),
              },
              {
                title: "Approval",
                // field: "status",
                render: (rowData) => (
                  <select
                    defaultValue={rowData.submit_for_approval}
                    className="form-select"
                    onChange={(e) => approvedChange(e.target.value, rowData.id)}
                    style={{ width: "130px" }}
                  >
                    <option value="0">Pending</option>
                    <option value="1">Approved</option>
                    <option value="2">Reject</option>
                  </select>
                ),
              },
              {
                title: "Created date ",
                field: "created_on",
                render: (rowData) =>
                  moment(rowData.created_on, "x").format("DD MMM YYYY hh:mm a"),
              },

              {
                title: " Job Type ",
                field: "service_type",
                render: (rowData) =>
                  rowData.service_type
                    ? rowData.service_type.charAt(0).toUpperCase() +
                      rowData.service_type.slice(1)
                    : "N/A",
              },
              {
                title: "Status",
                field: "status",
                render: (rowData) =>
                  rowData?.status?.charAt(0).toUpperCase() +
                  rowData?.status?.slice(1),
              },
              {
                title: "Subscription",
                field: "subscription_id",
                render: (rowData) => (
                  <Link
                    to={{
                      pathname: "/backend/tradie-subscription",
                      state: {
                        Id: rowData?.id,
                      },
                    }}
                  >
                    <IconButton title="View">
                      <VisibilityIcon
                        style={{ color: "#f58222" }}
                        title="View"
                      />
                    </IconButton>
                  </Link>
                ),
              },
              {
                title: "Action",
                render: (rowData) => (
                  <span style={{ whiteSpace: "nowrap" }}>
                    <Link to={"/backend/view-tradie/" + rowData.id}>
                      <IconButton title="View">
                        <VisibilityIcon
                          style={{ color: "#f58222" }}
                          title="View"
                        />
                      </IconButton>
                    </Link>
                    <Link to={"/backend/edit-tradie/" + rowData.id}>
                      <IconButton title="Edit">
                        <EditIcon style={{ color: "gray" }} title="Edit" />
                      </IconButton>
                    </Link>
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
            data={tradieList}
            options={{
              headerStyle: {
                textAlign: "left",
                border: "2px solid white",
                width: 0,
                fontSize: "14px",
                whiteSpace: "nowrap",
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
                // padding: 5,
                // paddingLeft: 2,
                fontSize: "14px",
              },
              search: false,
              sorting: true,
              exportButton: true,
              exportAllData: true,
              debounceInterval: 700,
              padding: "dense",
              pageSize: 10,
            }}
          />
        ) : (
          <div style={{ marginTop: "70px", textAlign: "center" }}>
            {/* <CircularProgress color="secondary" /> */}
            <img
              src="https://i.pinimg.com/originals/43/c7/a0/43c7a0928088b901910ab187816c8f65.gif"
              alt="avatar"
              width={100}
              height={100}
            />
          </div>
        )}
      </Card>
    </DashboardLayout>
  );
};

export default Tradie;
