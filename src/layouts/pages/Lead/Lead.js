import React, { useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MaterialTable from "material-table";
// import Avatar from "@mui/material/Avatar";
import { Card } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { LeadList } from "../../../redux/actions/action";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// MUI icon
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

toast.configure();

const Leads = () => {
  const dispatch = useDispatch();
  const { leadData } = useSelector((state) => state.leadData);

  useEffect(() => {
    dispatch(LeadList());
  }, []);

  const { data } = leadData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card style={{ marginTop: "14px" }}>
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
              { title: "Email", field: "email" },
              {
                title: "Date",
                render: (rowData) =>
                  moment(rowData.created_at).format("DD MMM YYYY hh:mm a"),
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

export default Leads;
