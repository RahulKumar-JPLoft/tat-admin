import { Fragment, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import MaterialTable from "material-table";

import { useDispatch, useSelector } from "react-redux";
import { TradieInService } from "redux/actions/action";
import moment from "moment";
import { Card, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";

const CategoryByTradie = (props) => {
  const Id = props.match.params.id;

  const dispatch = useDispatch();
  const { tradiesByService } = useSelector((state) => state.tradiesByService);

  useEffect(() => {
    if (Id) {
      dispatch(TradieInService(Id));
    }
  }, [Id]);
  const {data} = tradiesByService;


  return (
    <Fragment>
      <DashboardLayout>
        <DashboardNavbar />
        <Card style={{ marginTop: "9px" }}>
          {data && data !== null ? (
            <MaterialTable
              title=""
              columns={[
                {
                  title: "S.NO",
                  // field: "id",
                  render: (rowData) => rowData.tableData.id + 1,
                },

                {
                  title: "Tradie Name",
                  field: "full_name", render: (rowData) => (
                    rowData.full_name?rowData.full_name:"N/A"
                  ),
                },
                {
                  title: "Email",
                  field: "email",
                  render: (rowData) => (
                    rowData.email?rowData.email:"N/A"
                  ),
                },
                {
                  title: "Mobile",
                  field: "mobile",
                  render: (rowData) => (
                    <span style={{ whiteSpace: "nowrap" }}>
                      {rowData.country_code + " " + rowData.mobile}
                    </span>
                  ),
                },

                { title: "Gender", field: "gender",  render: (rowData) => (
                  rowData.gender?rowData.gender:"N/A"
                ), },
                {
                  title: "DOB",
                  field: "dob",
                  render: (rowData) => moment(rowData.dob).format("DD MMM YYYY "),
                },
                { title: "City", field: "city" ,render: (rowData) => (
                  rowData.city?rowData.city:"N/A"
                )},
                { title: "Country", field: "country",render: (rowData) => (
                  rowData.country?rowData.country:"N/A"
                ) },
                { title: "Online address", field: "online_address",render: (rowData) => (
                  rowData.online_address?rowData.online_address:"N/A"
                ) },

                {
                  title: "Created on ",
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
                  title: "View",
                  render: (rowData) => (
                    <span style={{ whiteSpace: "nowrap" }}>
                      <Link to={"/backend/View-Tradie/" + rowData.id}>
                        <IconButton title="View">
                          <VisibilityIcon
                            style={{ color: "#f58222" }}
                            title="View"
                          />
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
                  color: " white ",
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
    </Fragment>
  );
};

export default CategoryByTradie;
