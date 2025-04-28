import React, { Fragment, useEffect } from "react";
import "./productlist.css"
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link , useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import { Button } from "@mui/material"; 
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";  
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "./Sidebar"
import {getAllUsers , deleteUser} from "../../actions/useraction"
import { DELETE_USER_RESET } from "../../constants/userconstants";


const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users } = useSelector((state) => state.allUsers);
  const { isDeleted, message } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (isDeleted) {
      toast.success(message || "User Deleted Successfully");
      dispatch(getAllUsers());  
      dispatch({ type: DELETE_USER_RESET });
      navigate("/admin/dashboard")
    } else {
      dispatch(getAllUsers());  
    }
  }, [dispatch, isDeleted, message]);
  

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />

      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

          {users && users.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <p>No users available</p>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Users;