import React from 'react'
import "./productlist.css"
import { DataGrid } from '@mui/x-data-grid';
import {Fragment , useEffect} from 'react'
import {useSelector , useDispatch} from 'react-redux'
import { getadminProducts , DeleteProduct } from '../../actions/productAction';
import {Link} from 'react-router-dom'
import {toast} from "react-toastify"
import { Button } from '@mui/material';
import MetaData from '../layout/MetaData';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import Sidebar from "./Sidebar"

export default function ProductList() {
    const dispatch = useDispatch();
    const navigate = useNavigate() ;
    const { products } = useSelector((state) => state.products);
    const {isDeleted} = useSelector((state)=> state.deleteproduct )

    const deleteProductHnadler = (id) => {
      dispatch(DeleteProduct(id))

    }
    
    useEffect(() => {
      if (isDeleted) {
        toast.success("Item deleted successfully!");
        navigate("/admin/dashboard");  // ✅ correct
      }
    }, [isDeleted, navigate]);
    
  
    useEffect(() => {
      dispatch(getadminProducts());
    }, [dispatch]);
  
    const columns = [
      { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
      {
        field: "name",
        headerName: "Name",
        minWidth: 350,
        flex: 1,
      },
      {
        field: "stock",
        headerName: "Stock",
        type: "number",
        minWidth: 150,
        flex: 0.3,
      },
      {
        field: "price",
        headerName: "Price",
        type: "number",
        minWidth: 270,
        flex: 0.5,
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
              <Link to={`/admin/product/${params.row.id}`}>
                <EditIcon />
              </Link>
              <Button onClick={() => deleteProductHnadler(params.row.id)}> 
                <DeleteIcon />
              </Button>
            </Fragment>
          );
        },
      },
    ];
  
    const rows = [];
  // used row for params not rows as we refer single row that is build in db
    products && products.forEach((item) => {   // ✅ fixed forEach
      rows.push({
        id: item._id,    // ✅ MongoDB usually gives "_id", not "id"
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });
  


    return (
      <Fragment>
        <MetaData title="All Products" />
        <div className="dashboard">
          <Sidebar />
  
          <div className="productListContainer">
            <h1 id="productListHeading">ALL PRODUCTS</h1>
  
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          </div>
        </div>
      </Fragment>
    );
  }