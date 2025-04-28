import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {  UpdateProduct, getProductDetails } from "../../actions/productAction";
import { toast } from "react-toastify"
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SideBar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstant";
import { useNavigate, useParams } from "react-router-dom";  // ✅ NEW

const UpdateProducts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id: productId } = useParams();
  
    const { product } = useSelector((state) => state.productDetails);
    const { loading, isUpdated } = useSelector((state) => state.deleteproduct);
  
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
  
    const categories = [
      "Laptop", "Footwear", "Bottom", "Tops", "Attire", "Camera", "SmartPhones",
    ];
  
    useEffect(() => {
      
      if (isUpdated === "success") {
        toast.success("Product Updated Successfully");
        navigate("/admin/products");
        dispatch({ type: UPDATE_PRODUCT_RESET });
      }
  
      if (product && product._id !== productId) {
        dispatch(getProductDetails(productId));
      } else if (product) {
        setName(product.name || "");
        setDescription(product.description || "");
        setPrice(product.price || 0);
        setCategory(product.category || "");
        setStock(product.Stock || 0);
        setOldImages(product.images || []);
      }
    }, [dispatch,  isUpdated, navigate, productId, product]);
  
    const updateProductSubmitHandler = (e) => {
      e.preventDefault();
      const myForm = new FormData();
  
      myForm.set("name", name);
      myForm.set("price", price);
      myForm.set("description", description);
      myForm.set("category", category);
      myForm.set("Stock", Stock);
  
      images.forEach((image) => {
        myForm.append("images", image);
      });
  
      dispatch(UpdateProduct(productId, myForm));
    };
  
    const updateProductImagesChange = (e) => {
      const files = Array.from(e.target.files);
  
      setImages([]);
      setImagesPreview([]);
      setOldImages([]);
  
      files.forEach((file) => {
        const reader = new FileReader();
  
        reader.onload = () => {
          if (reader.readyState === 2) {
            setImagesPreview((old) => [...old, reader.result]);
            setImages((old) => [...old, reader.result]);
          }
        };
  
        reader.readAsDataURL(file);
      });
    };
  
    return (
      <Fragment>
        <MetaData title="Update Product" />
        <div className="dashboard">
          <SideBar />
          <div className="newProductContainer">
            <form
              className="createProductForm"
              encType="multipart/form-data"
              onSubmit={updateProductSubmitHandler}
            >
              <h1>Update Product</h1>
  
              <div>
                <SpellcheckIcon />
                <input
                  type="text"
                  placeholder="Product Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
  
              <div>
                <AttachMoneyIcon />
                <input
                  type="number"
                  placeholder="Price"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
  
              <div>
                <DescriptionIcon />
                <textarea
                  placeholder="Product Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  cols="30"
                  rows="1"
                ></textarea>
              </div>
  
              <div>
                <AccountTreeIcon />
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Choose Category</option>
                  {categories.map((cate) => (
                    <option key={cate} value={cate}>
                      {cate}
                    </option>
                  ))}
                </select>
              </div>
  
              <div>
                <StorageIcon />
                <input
                  type="number"
                  placeholder="Stock"
                  required
                  value={Stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
  
              <div id="createProductFormFile">
                <input
                  type="file"
                  name="images"
                  accept="image/*"
                  onChange={updateProductImagesChange}
                  multiple
                />
              </div>
  
              <div id="createProductFormImage">
                {oldImages && oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt={`Old Product Preview ${index}`} />
                ))}
              </div>
  
              <div id="createProductFormImage">
                {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt={`New Product Preview ${index}`} />
                ))}
              </div>
  
              <Button
                id="createProductBtn"
                type="submit"
                disabled={loading}
              >
                Update
              </Button>
            </form>
          </div>
        </div>
      </Fragment>
    );
  };
  
  export default UpdateProducts;
  