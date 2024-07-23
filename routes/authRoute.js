import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  getAllOrdersController,
  updateProfileController,
  getOrdersController,
  orderStatusController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

//routes: all the auth routes mannaged here:

router.post("/register", registerController); //register or signup route:
router.post("/login", loginController); //login route:
router.get("/test", requireSignIn, isAdmin, testController);
//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders:
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

//all orders:
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
