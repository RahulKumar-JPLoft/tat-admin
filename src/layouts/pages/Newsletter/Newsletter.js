import React, { useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MaterialTable from "material-table";
// import Avatar from "@mui/material/Avatar";
import { Card, IconButton } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { newsLetter, newsLetterDel } from "../../../redux/actions/action";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// MUI icon
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

toast.configure();

const Newsletter = () => {
  const dispatch = useDispatch();
  const { newsletter } = useSelector((state) => state.newsletter);
  const { newsletterRes } = useSelector((state) => state.newsletterRes);
  useEffect(() => {
    dispatch(newsLetter());
  }, [newsletterRes]);
  const { data } = newsletter;

  const deleteNewsletter = (id) => {
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
        dispatch(newsLetterDel(id));
      }
    });
  };
  useEffect(() => {
    if (newsletterRes) {
      if (newsletterRes.status === 1) {
        toast.success("Deleted SuccessFully", {
          position: "bottom-left",
          autoClose: 2000,
          size: "small",
        });
      } else {
        toast.error(newsletterRes.message, {
          position: "bottom-left",
          autoClose: 1000,
          size: "small",
        });
      }
    }
    setTimeout(() => {
      dispatch({ type: "NEWSLETTER_DEL", payloade: "" });
    }, 1000);
  }, [newsletterRes]);
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
              { title: "Email", field: "email" },
              {
                title: "Date",
                field: "created_on",
                render: (rowData) =>
                  moment(rowData.created_on, "x").format("DD MMM YYYY hh:mm a"),
              },
              {
                title: "Action",
                render: (rowData) => (
                  <IconButton
                    onClick={() => deleteNewsletter(rowData.id)}
                    title="Delete"
                  >
                    <DeleteIcon style={{ color: "red" }} title="Delete" />
                  </IconButton>
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

export default Newsletter;
