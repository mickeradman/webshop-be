import Product from '../models/product.schema';

export type Product = {
  productName: string;
  description: string;
  price: number;
  stockStatus: string;
  imgPath: string;
  category: string;
};

async function getProductsFromDb() {
  const products: Product[] = await Product.find(); // Kan ge fel eftersom _id också kommer följa med, antar jag

  if (products === null) {
    const result = { success: false };
    return result;
  } else {
    const result = { success: true, products };
    return result;
  }
}

export default getProductsFromDb;
