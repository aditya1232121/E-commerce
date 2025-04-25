import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../actions/productAction";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ReactStars from "react-rating-stars-component";
import Loader from "../Loader/Loader";
import MetaData from "../layout/MetaData";
import ReviewCard from "../product/ReviewCard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProductDetail.css";
import {additem} from "../../actions/cartaction" 
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import {Rating} from "@mui/lab"
import { newReview } from "../../actions/productAction";


export default function ProductDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { product, loading, error } = useSelector((state) => state.productDetails);
  const { success: reviewSuccess, error: reviewError } = useSelector((state) => state.newReview);


  const [quantity, setQuantity] = useState(1);
  const [imageLoading, setImageLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (id) {
      setImageLoading(true);
      dispatch(getProductDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (!loading) {
      setImageLoading(false);
    }
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [loading, error]);

  useEffect(() => {
    if (reviewSuccess) {
      toast.success("Review Submitted Successfully!");
      setRating(0);
      setComment("");
      setOpen(false);
    }
  
    if (reviewError) {
      toast.error(reviewError);
    }
  }, [reviewSuccess, reviewError]);
  

  const increaseQuantity = () => {
    if (product.stock <= quantity) return;
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCartHandler = () => {
    dispatch(additem(id, quantity));
    toast.success("Item Added To Cart");
  };

  const submitReviewToggle = () => {
    setOpen(!open);
  };

  const reviewSubmitHandler = () => {
    const reviewData = {
      rating,
      comment,
      productId: id,
    };
    dispatch(newReview(reviewData));
    setOpen(false);
  };

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: 20,
    value: product?.ratings || 4,
    isHalf: true,
  };

  if (loading || imageLoading || !product) return <Loader />;

  return (
    <Fragment>
      <MetaData title={`${product?.name} -- ECOMMERCE`} />
      <div className="ProductDetails">
        <div>
          <Carousel>
            {product?.images?.map((item, i) => (
              <img
                className="CarouselImage"
                key={i}
                src={item.url}
                alt={`${i} Slide`}
                onLoad={() => setImageLoading(false)}
              />
            ))}
          </Carousel>
        </div>

        <div>
          <div className="detailsBlock-1">
            <h2>{product?.name}</h2>
            <p>Product # {product?._id}</p>
          </div>

          <div className="detailsBlock-2">
            <ReactStars {...options} />
            <span className="detailsBlock-2-span"> ({product?.numOfReviews} Reviews)</span>
          </div>

          <div className="detailsBlock-3">
            <h1>{`₹${product?.price}`}</h1>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button onClick={decreaseQuantity}>-</button>
                <input
                  readOnly
                  type="number"
                  value={quantity}
                />
                <button onClick={increaseQuantity}>+</button>
              </div>
              <button disabled={product?.stock < 1} onClick={addToCartHandler}>
                Add to Cart
              </button>
            </div>
            <p>
              Status:
              <b className={product?.stock < 1 ? "redColor" : "greenColor"}>
                {product?.stock < 1 ? "OutOfStock" : "InStock"}
              </b>
            </p>
          </div>

          <div className="detailsBlock-4">
            Description: <p>{product?.description}</p>
          </div>

          <button onClick={submitReviewToggle} className="submitReview">
            Submit Review
          </button>
        </div>
      </div>

      <h3 className="reviewsHeading">REVIEWS</h3>

      <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={submitReviewToggle}>
        <DialogTitle>Submit Review</DialogTitle>
        <DialogContent className="submitDialog">
          <Rating
            onChange={(e) => setRating(e.target.value)}
            value={rating}
            size="large"
          />
          <textarea
            className="submitDialogTextArea"
            cols="30"
            rows="5"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </DialogContent>
        <DialogActions>
          <Button onClick={submitReviewToggle} color="secondary">
            Cancel
          </Button>
          <Button onClick={reviewSubmitHandler} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {product?.reviews?.length > 0 ? (
        <div className="reviews">
          {product.reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>
      ) : (
        <p className="noReviews">No reviews</p>
      )}
    </Fragment>
  );
}
