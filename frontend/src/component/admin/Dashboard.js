import React from 'react';
import Sidebar from "./Sidebar";
import "./dashboard.css";
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Doughnut, Line } from "react-chartjs-2";
import {useSelector , useDispatch} from 'react-redux'
import { useEffect } from 'react';
import { getadminProducts } from '../../actions/productAction';

// 🟢 Chart.js Registration (put this once here)
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
  let outOfStock = 0 ;
  const { products } = useSelector((state) => state.products);
  
    useEffect(() => {
      dispatch(getadminProducts());
    }, [dispatch]);
  
    products && products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock = outOfStock + 1;
      }
    });
    

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0 , 4000],
      },
    ],
  };
  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
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
      <Sidebar/>
      <div className='dashboardContainer'>
        <Typography component="h1">Dashboard</Typography>
        
        <div className='dashboardSummary'>
          <div>
            <p>Total Amount <br/> 2000</p> 
          </div>

          <div className='dashboardSummaryBox2'>
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>4</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>2</p>
            </Link>                                            
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>
        <div className='doughnutChart'>
          <Doughnut data = {doughnutState} />
        </div>
      </div>
    </div>
  );
}
