const express = require('express');
const authController = require('../controller/authcontroller');
const upload = require("../utils/multer")

const router = express.Router();

router
  .route("/register")
  .post(upload.single("avatar"), authController.signup); // Multer handles the file upload




router
  .route('/signup')
  .post(authController.signup); // Remove GET request

router
  .route('/login')
  .post(authController.login); // Remove GET request

router
  .route('/logout')
  .get(authController.logout);

router
  .route('/forgotpassword')
  .post(authController.forgotpassword); // Fix function name

router
router.route("/password/reset/:token").post(authController.resetPassword);

router
.route("/me").get(authController.control , authController.getuserdetail)

router.route("/password/update").put(authController.control, authController.updatepassword);

router
  .route("/me/update")
  .put(
    authController.control,         // Auth middleware
    upload.single("avatar"),        // Multer middleware
    authController.updateProfile    // Actual controller
  );



router.route("/admin/users").get(authController.control , authController.restrictedto("admin") , authController.getalluser)

router.route("/admin/user/:id").put(authController.control , authController.restrictedto("admin") , authController.updateuserrole) 


router.route("/admin/user/:id").delete(authController.control , authController.restrictedto("admin") , authController.deleteme) 

router.route("/admin/user/:id").get(authController.control , authController.restrictedto("admin") , authController.getSingleUser)


module.exports = router;
