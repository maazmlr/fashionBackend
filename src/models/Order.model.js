import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const productSchema = new Schema({
  _id: { type: Schema.Types.ObjectId,
    ref:"Product",
     required: true },
  name: { type: String, required: true },
  total_price: { type: Number, required: true },
  quantity: { type: Number, required: true }
});

const orderSchema = new Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  whatsappNumber: { type: String, required: true },
  zipcode: { type: String, required: true },
  products: { type: [productSchema], required: true }
});

const Order = model('Order', orderSchema);

export default Order;
