import mongoose, { Schema } from "mongoose";
const subCategoryEnum = {
  kids: ["boys", "girls", "infant"],
  women: ["traditional", "turkish"],
  jewellery: ["traditional", "turkish"],
};

const subSubcategories = {
  traditional: ["eastern", "western"],
  turkish: ["eastern", "western"],
};

const jewSubcategories = {
  traditional: ["rings", "mala", "sets", "bracelet"],
  turkish: ["rings", "mala", "sets", "bracelet"],
};

const ProductSchema = new Schema({
  category: {
    type: String,
    required: true,
    enum: Object.keys(subCategoryEnum),
  },
  subcategory: {
    type: String,
    required: true,
   
  },
  subsubcategory: {
    type: String,
   
     
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  discount: {
    type: Number,
    min: 0,
    max: 100,
  },
  image: {
    type: [String], // Assuming you store image URLs or paths
    required: true,
  },
});

export const Product = mongoose.model("Product", ProductSchema);
