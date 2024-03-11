import { Router } from 'express';

import getProducts from '../controllers/getProducts.controller';

const router: Router = Router();

router.get('/products', getProducts);

export default router;
