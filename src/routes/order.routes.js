import { Router } from "express";
import { addOrder, getAllOrders } from "../controllers/order.controller.js";


const router=Router();
router.route("/add-order").post(addOrder);
router.route("/get-all-order").get(getAllOrders)
export default router