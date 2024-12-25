import Product from '../../models/productsModels.js'


export const addProduct = async (req, res) => {
    try {
        console.log("Body:", req.body);
        console.log("File:", req.file);

        const { title, description, category, price, salePrice, totalPrice, averageReview, isSpecial } = req.body;
        const image = req?.file?.filename;

        if (!title || !description || !category || !price || !salePrice || !totalPrice || !averageReview || !isSpecial || !image) {
            return res.status(400).json({ status: "error", message: "All fields are required..." });
        }

        const existProduct = await Product.findOne({ title });

        if (existProduct) {
            return res.status(400).json({ status: "error", message: "Product already exist..." });
        }

        const newProduct = await Product.create({
            title,
            description,
            category,
            price: parseFloat(price), // Convert to number
            salePrice: parseFloat(salePrice), // Convert to number
            totalPrice: parseFloat(totalPrice), // Convert to number
            averageReview: parseFloat(averageReview), // Convert to number
            isSpecial: isSpecial === 'true', // Convert to boolean
            image
        });

        return res.status(200).json({ status: "success", message: "New Procudt is Succesfully added...", data: newProduct });

    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({ status: "error", message: error.message });
    }
}


export const getProducts = async (req, res) => {
    try {
        const existProducts = await Product.find();

        if (!existProducts.length) {
            return res.status(400).json({ message: 'Product not found...' });
        }
        return res.status(200).json({ status: "success", message: "Product fetch succesfully...", data: existProducts });

    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({ status: "error", message: error.message });
    }
}


export const getProduct = async (req, res) => {
    try {

        const pid = req.params.id;

        if (!pid) {
            return res.status(400).json({ status: "error", message: "Product not found..." });
        }

        const ProductData = await Product.findById(pid);

        if (!ProductData) {
            return res.status(404).json({ status: "error", message: "Something went  wrong..." })
        }

        return res.status(200).json({ status: "success", message: "Product found", data: ProductData });

    } catch (error) {
        return res.status(500).json({ errorMessage: error.message });
    }

}


export const deleteProduct = async (req, res) => {
    try {
        const pid = req.params.id;

        const deletedProduct = await Product.findByIdAndDelete(pid);
        res.status(200).json({ message: "Product Deleted Succesfully...", data: deletedProduct });

    } catch (error) {
        return res.status(500).json({ errorMessage: error.message });
    }
};



export const updateProduct = async (req, res) => {
    try {
        const pid = req.params.id;
        const productExist = await Product.findById(pid);

        if (!productExist) {
            return res.status(404).json({ message: "Product Is Not Found..." });
        }

        const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, {
            new: true
        })

        res.status(200).json({ message: "Update User Succesfully...", data: updatedProduct });





    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};
