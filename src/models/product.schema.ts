import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  productName: string;
  description: string;
  price: number;
  stockStatus: 'I lager' | 'Inte i lager';
  imgPath: string;
  category: string;
}

const productSchema: Schema = new Schema(
  {
    productName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    stockStatus: {
      type: String,
      enum: ['I lager', 'Inte i lager'],
      required: true,
    },
    imgPath: { type: String, required: true },
    category: { type: String, required: true },
  },
  { collection: 'wares' }
);

export default mongoose.model<IProduct>('Product', productSchema);
