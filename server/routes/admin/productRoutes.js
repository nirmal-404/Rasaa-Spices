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



// router.post("/upload-image", upload.single(""), handleImageUpload);
// router.post("/add", addProduct);
// router.put("/edit/:id", editProduct);
// router.delete("/delete/:id", deleteProduct);
// router.get("/get", fetchAllProducts);

// api me deka me widihata kaduwothnm ara file upload karanacode eka reuse karaganna puluwan wei 
// upload.single('image') eka kiyala image upload karanawa
// upload.fields([{ name: 'image', maxCount: 1 }]) eka kiyala demu
// chatgpt kiwwe 
