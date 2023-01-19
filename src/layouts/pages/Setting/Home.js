import {
  Button,
  Card,
  CircularProgress,
  Grid,
  Pagination,
  Stack,
} from "@mui/material";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { styles } from "layouts/pages/Styles/Home.module";
import { HomeAPi, updateNotification, updateSMS } from "api";
// import { AuthContext } from "../context";
import { Switch } from "@material-ui/core";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();
  // const { token } = useContext(AuthContext);
  const token = Cookies.get("tapSetingToken");
  const [SearchSelect, setSearchSelect] = useState("");
  const [searchBox, setSearchBox] = useState("");
  const [loader, setLoader] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [user, setUser] = useState("");
  const [onPage, setPage] = useState(1);
  const [loaderBtn, setLoaderBtn] = useState(false);
  const [loaderToggle, setLoaderToggle] = useState({ state: false, id: null });

  useEffect(() => {
    if (!token) {
      history.push("/backend/katlahsutramuk");
    }
  }, [token]);

  const filterFunc = (e) => {
    setSearchSelect(e.target.value);
    setSearchBox("");
  };

  useEffect(async () => {
    if (token) {
      const data = await HomeAPi(token, searchBox?.toLowerCase(), onPage);
      if (data.status == 0) {
        Cookies.remove("tapSetingToken");
        setTimeout(() => {
          history.push("/backend/katlahsutramuk");
        }, 500);
      }
      setUser(data);
    }
  }, [onPage, refresh]);
  useEffect(() => {
    if (user.data) {
      setLoader(false);
    }
  }, [user]);

  const FilterButton = () => {
    setLoaderBtn(true);
    setTimeout(async () => {
      const data = await HomeAPi(token, searchBox?.toLowerCase());
      setLoaderBtn(false);
      setUser(data);
    }, 1500);
  };

  const handleChange = async (e, id) => {
    setLoaderToggle({ state: true, id: id });
    const data = { otp_setting: e === true ? "1" : "0", user_id: id, token };
    const response = await updateSMS(data);
    setRefresh(response);
    setLoaderToggle({ state: false, id: id });
    if (response.status === 1) {
      toast.success(response.message, {
        autoClose: 2000,
        size: "small",
      });
    } else {
      toast.error(response.message, {
        autoClose: 2000,
        size: "small",
      });
    }
  };
  const handleChangeNotification = async (e, id) => {
    const data = {
      notification_setting: e === true ? "1" : "0",
      user_id: id,
      token,
    };
    const response = await updateNotification(data);
    setRefresh(response);

    if (response.status === 1) {
      toast.success(response.message, {
        autoClose: 2000,
        size: "small",
      });
    } else {
      toast.error(response.message, {
        autoClose: 2000,
        size: "small",
      });
    }
  };

  const handlePagination = (e, value) => {
    setPage(value);
  };
  const handleSignout = () => {
    Cookies.remove("tapSetingToken");
    setTimeout(() => {
      history.push("/backend/katlahsutramuk");
    }, 1500);
  };

  return (
    <Grid
      container
      spacing={1}
      justifyContent="center"
      style={styles.container}
    >
      <Grid item xs={11.8} sm={11.8} md={11.8} lg={11.8} xl={11.8}>
        <Button onClick={handleSignout} style={styles.signoutBtn}>
          SIGN OUT
        </Button>
      </Grid>
      <Grid item xs={11.8} sm={11.8} md={11.8} lg={11.8} xl={11.8}>
        <Card style={{ marginTop: "14px", border: "1px solid #e0e0e0" }}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={2} md={2} style={{ paddingLeft: "20px" }}>
              <select
                className="form-control searchSelect"
                onChange={filterFunc}
                style={styles.filterSelect}
              >
                <option value="allUser">All Users</option>
                <option value="name">Name</option>
                <option value="mobile">Mobile</option>
                <option value="email">Email</option>
              </select>
            </Grid>
            {SearchSelect && SearchSelect !== "allUser" ? (
              <Grid item xs={6} sm={2.3} md={2.3} lg={2.3}>
                <input
                  type="text"
                  className="form-control searchBox"
                  placeholder={`Search by ${
                    SearchSelect.charAt(0).toUpperCase() + SearchSelect.slice(1)
                  }`}
                  value={searchBox}
                  style={styles.searchBox}
                  onChange={(e) => setSearchBox(e.target.value)}
                />
              </Grid>
            ) : (
              ""
            )}
            {SearchSelect && SearchSelect !== "allUser" ? (
              <Grid item xs={6} sm={2} md={2}>
                <Button
                  variant="gradient"
                  color="warning"
                  onClick={FilterButton}
                  className="applyButton"
                  style={styles.ApplytBtn}
                >
                  {loaderBtn ? (
                    <CircularProgress size={18} color="white" />
                  ) : (
                    "Apply"
                  )}
                </Button>
              </Grid>
            ) : (
              ""
            )}
          </Grid>

          {!loader ? (
            <MaterialTable
              title=""
              columns={[
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
                  title: "Email",
                  field: "email",
                },
                {
                  title: "Type",
                  field: "access",
                  render: (rowData) =>
                    rowData.access.charAt(0).toUpperCase() +
                    rowData.access.slice(1),
                },
                {
                  title: "SMS",
                  render: (rowData) =>
                    loaderToggle.id === rowData.id ? (
                      loaderToggle.state ? (
                        <CircularProgress size={18} color="black" />
                      ) : (
                        <Switch
                          color="primary"
                          checked={rowData.otp_setting}
                          onChange={(e) =>
                            handleChange(e.target.checked, rowData.id)
                          }
                        />
                      )
                    ) : (
                      <Switch
                        color="primary"
                        checked={rowData.otp_setting}
                        onChange={(e) =>
                          handleChange(e.target.checked, rowData.id)
                        }
                      />
                    ),

                  // <TabSwitch rowData={rowData} handleChange={handleChange} />
                },
                {
                  title: "Notifications",
                  render: (rowData) => (
                    <Switch
                      checked={rowData.notification_setting}
                      color="primary"
                      onChange={(e) =>
                        handleChangeNotification(e.target.checked, rowData.id)
                      }
                    />
                  ),
                },
                {
                  title: "Last OTP",
                  field: "otp",
                  render: (rowData) => (rowData.otp ? rowData.otp : "N/A"),
                },
              ]}
              data={user && user.data}
              options={{
                pageSize: 10,
                // paging: false,
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
                exportButton: false,
                exportAllData: false,
                search: false,
                // search: SearchSelect && SearchSelect !== "allUser" ? true : false,
                sorting: true,
                debounceInterval: 700,
                padding: "dense",
              }}
              //   onChangeRowsPerPage={(pageSize) => console.log(pageSize)}
              //   onChangePage={(page) => setPage(page + 1)}
              localization={{ toolbar: { searchPlaceholder: SearchSelect } }}
              components={{
                Pagination: (props) => (
                  <>
                    <Stack
                      spacing={2}
                      alignItems="end"
                      style={styles.pagination}
                    >
                      <Pagination
                        page={onPage}
                        count={Math.ceil(user.totalRecords / 10)}
                        shape="rounded"
                        color="secondary"
                        onChange={handlePagination}
                      />
                    </Stack>
                  </>
                ),
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
      </Grid>
      {/* <Grid item md={11} sm={11} lg={11} xs={11}>
        {!loader && user?.totalRecords ? (
          <Stack spacing={2} alignItems="center" style={styles.pagination}>
            <Pagination
              count={Math.ceil(user.totalRecords / 10)}
              onChange={handlePagination}
              //   variant="outlined"
              shape="rounded"
              color="secondary"
            />
          </Stack>
        ) : (
          ""
        )}
      </Grid> */}
    </Grid>
  );
}

export default Home;
