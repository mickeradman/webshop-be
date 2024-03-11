import mongoose from 'mongoose';

export const productSchema = new mongoose.Schema({
  productName: String,
  description: String,
  price: Number,
  stockStatus: String,
  imgPath: String,
  category: String,
});

productSchema.pre('validate', function (next) {
  if (this.isNew || this.isModified()) {
    this.schema.path('productName').required(true);
    this.schema.path('description').required(true);
    this.schema.path('price').required(true);
    this.schema.path('stockStatus').required(true);
    this.schema.path('imgPath').required(true);
    this.schema.path('category').required(true);
  }
  next();
});

export default mongoose.model('Product', productSchema);
