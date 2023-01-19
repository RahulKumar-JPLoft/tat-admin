import { Fragment, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import MaterialTable from "material-table";

import { useDispatch, useSelector } from "react-redux";
import { JobInService } from "redux/actions/action";
import moment from "moment";
import { Card, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";

const JobsCategory = (props) => {
  const Id = props.match.params.id;

  const dispatch = useDispatch();
  const { jobsByService } = useSelector((state) => state.jobsByService);

  useEffect(() => {
    if (Id) {
      dispatch(JobInService(Id));
    }
  }, [Id]);
  const data = jobsByService.data ? jobsByService.data.data : null;

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
                // { title: "Category", field: "category" },
                { title: "Job Title", field: "title" },

                {
                  title: "User Name",
                  field: "userfullname",
                  render: (rowData) => (
                    <span style={{ whiteSpace: "nowrap" }}>
                      {rowData.userfullname}{" "}
                    </span>
                  ),
                },
                {
                  title: "Tradie Name",
                  field: "full_name",
                },
                {
                  title: "Email",
                  field: "email",
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

                { title: "Job Location", field: "address" },

                {
                  title: "Date ",
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
                  title: "Tradie Type ",
                  field: "tradie_type",
                },
                {
                  title: "Job Type ",
                  field: "type",
                },
                {
                  title: "View",
                  render: (rowData) => (
                    <span style={{ whiteSpace: "nowrap" }}>
                      <Link to={"/backend/view-Job/" + rowData.id}>
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

export default JobsCategory;
