import express from "express";
import {
  buySubscription,
  cancelSubscription,
  getRazorPayKey,
  paymentVerification,
} from "../controllers/paymentController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

//buy subscription:
router.route("/subscribe").get(isAuthenticated, buySubscription);

//verify payment and save reference in DB
router.route("/paymentverification").post(isAuthenticated, paymentVerification);

//Get razorpay key
router.route("/razorpaykey").get(getRazorPayKey);

//Cancel Subscription
router.route("/subscribe/cancel").delete(isAuthenticated,cancelSubscription);

export default router;
