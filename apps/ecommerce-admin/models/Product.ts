import mongoose, { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
});

export const Product = mongoose.models.Product
  ? mongoose.models.Product
  : model('Product', ProductSchema);
