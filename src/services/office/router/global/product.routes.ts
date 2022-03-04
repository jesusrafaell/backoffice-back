<<<<<<< HEAD
import { Router } from 'express';
import { getAllProcusts, createProducts } from '../../controllers/products/index';
const Product: Router = Router();

// controllers

// ? products
//
Product.route('/products').get(getAllProcusts).post(createProducts);

// ? images
export default Product;
=======
import { Router } from 'express';
import { getAllProcusts, createProducts } from '../../controllers/products/index';
const Product: Router = Router();

// controllers

// ? products
//
Product.route('/products').get(getAllProcusts).post(createProducts);

// ? images
export default Product;
>>>>>>> e49ac2ff50e4c1c9b101ffc672736c574636bcaa
