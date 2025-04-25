import React from 'react'
import {Fragment , useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import "./Order.css"
import {useSelector , useDispatch} from 'react-redux'
import {MyOrders} from '../../actions/orderaction'
import Loader from '../Loader/Loader'
import {Link} from 'react-router-dom'
import { Typography } from '@mui/material';
import MetaData from "../layout/MetaData"
import LaunchIcon from '@mui/icons-material/Launch';
import { toast } from 'react-toastify';

export default function MyOrder() {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    // Only run once on mount
    dispatch(MyOrders());
  }, [dispatch]);
  
  useEffect(() => {
    // Only run when `error` changes to truthy
    if (error) {
      toast.error(error);
    }
  }, [error]);
  
  
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
  
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      }
    } ,
    {
      field: "itemsQty",
      headerName: "Items Quantity",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 100,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => (
        <Link to={`/order/${params.getValue(params.id, "id")}`}>
          <LaunchIcon />
        </Link>
      ),
    },
  ];

  const rows = [];
  orders &&
    orders.forEach((item) => {
      rows.push({
        id:       item._id,
        itemsQty: item.orderItems.length,  // ← fixed field name
        amount:   item.totalPrice,
        status:   item.orderStatus,
      });
    });

  return (
    <Fragment>
      <MetaData title="My Orders" />
      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myordersTable"
            autoHeight
          />
          <Typography id="myOrdersHeading">
            {user.name}&apos;s Orders
          </Typography>
        </div>
      )}
    </Fragment>
  );
}                    