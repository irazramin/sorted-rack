const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  deleteAllProduct,
  checkProductQuantity,
} = require("../controllers/product");

const {
  authenticateUser,
  authorizeRoles,
} = require("../middleware/authentication");

router
  .route("/")
  .get(authenticateUser, getAllProduct)
  .post(
    [authenticateUser, authorizeRoles("superadmin", "admin")],
    createProduct
  );

router
  .route("/deleteAllProduct")
  .delete(
    [authenticateUser, authorizeRoles("superadmin", "admin")],
    deleteAllProduct
  );

router
  .route("/:id")
  .get(
    [authenticateUser, authorizeRoles("superadmin", "admin")],
    getSingleProduct
  )
  .patch(
    [authenticateUser, authorizeRoles("superadmin", "admin")],
    updateProduct
  )
  .delete(
    [authenticateUser, authorizeRoles("superadmin", "admin")],
    deleteProduct
  );

router.get(
  "/checking-product-quantity/:category",
  [authenticateUser, authorizeRoles("superadmin", "admin")],
  checkProductQuantity
);

module.exports = router;
