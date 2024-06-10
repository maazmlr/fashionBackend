import { asyncHandler } from "../../utils/asyncHandler.js";
import Order from "../models/Order.model.js";
import { Product } from "../models/product.model.js";

const addOrder = asyncHandler(async (req, res) => {
  try {
    const {
      address,
      city,
      fullName,
      phoneNumber,
      whatsappNumber,
      zipcode,
      products,
    } = req.body;

    // Validate input data
    if (
      !address ||
      !city ||
      !fullName ||
      !phoneNumber ||
      !whatsappNumber ||
      !zipcode ||
      !products
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new order
    const newOrder = new Order({
      address,
      city,
      fullName,
      phoneNumber,
      whatsappNumber,
      zipcode,
      products,
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();
    await Promise.all(
      products.map(async (product) => {
        const dbProduct = await Product.findById(product._id);
        console.log(dbProduct);
        if (dbProduct) {
          dbProduct.stock -= product.quantity;
          await dbProduct.save();
        }
      })
    );

    res.status(201).json({
      status: 201,
      data: { savedOrder },
      message: "Order added successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { addOrder,getAllOrders };
