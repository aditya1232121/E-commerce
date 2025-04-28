import React, { useEffect } from 'react';
import Sidebar from "./Sidebar";
import "./dashboard.css";
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from 'react-redux';
import { getadminProducts } from '../../actions/productAction';
import { getAllUsers } from "../../actions/useraction";
import { AllOrders } from "../../actions/orderaction"; 

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  DoughnutController,
  ArcElement,
  LineController
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  DoughnutController,
  ArcElement,
  LineController
);

export default function Dashboard() {
  const dispatch = useDispatch();

  const { users = [] } = useSelector((state) => state.allUsers || {});
  const { orders = [] } = useSelector((state) => state.allOrders || {});
  const { products = [] } = useSelector((state) => state.products || {});

  useEffect(() => {
    dispatch(getadminProducts());
    dispatch(getAllUsers());
    dispatch(AllOrders());
  }, [dispatch]);

  let outOfStock = 0;
  products.forEach((item) => {
    if (item.stock === 0) {
      outOfStock++;
    }
  });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, 4000],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <div className='dashboard'>
      <Sidebar />
      <div className='dashboardContainer'>
        <Typography component="h1">Dashboard</Typography>

        <div className='dashboardSummary'>
          <div>
            <p>Total Amount <br /> 2000</p>
          </div>

          <div className='dashboardSummaryBox2'>
            <Link to="/admin/products">
              <p>Products</p>
              <p>{products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>
        <div className='doughnutChart'>
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
}
