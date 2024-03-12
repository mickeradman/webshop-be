import { Router } from 'express';

import getProducts from '../controllers/getProducts.controller';

const router: Router = Router();

router.get('/getall', getProducts);

export default router;
