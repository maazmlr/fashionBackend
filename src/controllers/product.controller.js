import { Product } from "../models/product.model.js";
import { ApiResponsone } from "../../utils/Apiresponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { upload } from "../../utils/cloudinary.js";
import { ApiError } from "../../utils/error.js";

const addProduct = asyncHandler(async (req, res) => {
  try {
    const image = req?.files;
    console.log(image);

    const {
      name,
      description,
      category,
      subcategory,
      subsubcategory,
      price,
      discount,
      stock,
    } = req.body;

    console.log(req.body);
    const images = []; // array to store the uploaded image URLs

    // Upload each image to Cloudinary
    await Promise.all(
      image.map(async (localImg) => {
        const { url } = await upload(localImg?.path);
        console.log(url); // upload to Cloudinary
        images.push(url); // add the returned URL to the images array
      })
    );
    console.log(images);
    // Create a new product
    const newProduct = new Product({
      name,
      description,
      category: category,
      subcategory,
      subsubcategory,
      price,
      discount,
      stock,
      image: images,
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();

    res
      .status(201)
      .json(
        new ApiResponsone(201, { savedProduct }, "Product added successfully")
      );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getProductByID = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const item = await Product.findById(id);
  if (!item) throw new ApiError(404, "item not found");
  return res
    .status(200)
    .json(new ApiResponsone(200, item, "item fetch successfully"));
});

const getProductBy = asyncHandler(async (req, res) => {
  console.log(req.query?.subsubcategory);
  const matchStage = {
    category: req.query?.category,
    subcategory: req.query?.subcategory,
  };
  if (req.query?.subsubcategory) {
    matchStage.subsubcategory = req.query.subsubcategory;
  }
  try {
    const item = await Product.aggregate([
      {
        $match: matchStage,
      },
    ]);
    return res
      .status(200)
      .json(new ApiResponsone(200, item, "Category fetched successfully"));
  } catch (error) {
    console.log(error);
  }
});

export { addProduct, getProductByID, getProductBy };
