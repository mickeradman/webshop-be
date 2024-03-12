import { Request, Response } from 'express';
import getProductsFromDb from '../models/product.model';
import { Product } from '../models/product.model';

type Result = {
  products?: Product[];
  success?: boolean;
};

async function getProducts(req: Request, res: Response) {
  try {
    const result: Result = await getProductsFromDb();
    if (result && result.success) {
      return res.status(200).json(result.products);
    } else {
      return res.status(404).json({
        success: false,
        message: 'Hittade inga produkter i databasen.',
      });
    }
  } catch (error) {
    console.error('Fel vid hämtning av produkter: ', error);
    return res.status(500).json({
      success: false,
      message:
        'Något gick snett. Vänligen försök igen. Kontakta oss gärna om problemet kvarstår.',
    });
  }
}

export default getProducts;
