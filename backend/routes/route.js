const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,  // Renamed for clarity
  deleteProductReview,
  getProductDetails,
  getAdminProducts,
  createProducting,
} = require("../controller/productcontroller");
const { control, restrictedto } = require("../controller/authcontroller");

const upload = require("../utils/multer")

const router = express.Router();


// Get all products and create a new product (restricted to admins)
router
  .route("/products")
  .get(getAllProducts)
  .post( createProduct);  // Admin restriction for creating products

// Update and delete a product by id (restricted to admins)
router
  .route("/products/:id")
  .get(getProductDetails)  // Corrected GET route for product details
  .patch(control, restrictedto("admin"), updateProduct)
  .delete(control, restrictedto("admin"), deleteProduct);

// Routes for reviews (creating, getting, and deleting reviews)
router.route("/review").put(control, createProductReview);  
router.route("/product/:id/reviews").get(getProductReviews).delete(control, restrictedto("admin"), deleteProductReview);  // Get and delete reviews for a specific product

router.route("/reviews").get(getProductReviews).delete(control , deleteProductReview)

router.route("/admin/products").get(control , restrictedto("admin") , getAdminProducts)


router.route("/admin/product/new").post(control , restrictedto("admin") , upload.array("images", 5) , createProducting)




module.exports = router;
