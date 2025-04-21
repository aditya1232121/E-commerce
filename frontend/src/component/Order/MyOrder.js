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
const dispatch = useDispatch()
 const {loading , error , orders} = useSelector ((state)=> state.myOrder)
 const {user} = useSelector((state)=> state.user)

 

  return (
    <Fragment>
        <MetaData title="My Orders"/>
        {
            loading ? (
                <Loader />
            ) : (
                <div className="myOrdersPage">
                    <DataGrid 
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className='myordersTable'
                    autoHeight
                    />
                </div>
            )
        }
    </Fragment>
  )
}
