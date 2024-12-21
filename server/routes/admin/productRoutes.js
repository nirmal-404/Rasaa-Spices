import express from 'express'
import upload from '../../Util/productsUploads.js'
import { addProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../../controllers/admin/productController.js';



const route = express.Router();


route.post("/", upload.single('image'), addProduct);
route.get("/products",getProducts);
route.get("/:id",getProduct);
route.delete("/:id",deleteProduct);
route.put('/:id', upload.single('image'), updateProduct);

export default route;