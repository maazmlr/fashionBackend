import { Router } from "express";
import { addProduct, getProductBy, getProductByID } from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

router.route("/add-product").post(upload,addProduct);
router.route("/get-product/:id").get(getProductByID);
router.route("/get-product").get(getProductBy)



export default router