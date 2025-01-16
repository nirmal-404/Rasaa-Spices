import Wishlist from "../../models/Wishlist.js"
import Product from "../../models/Product.js"

export const addToWishlist = async (req, res) => {
    try {

        const { userId, productId, quantity } = req.body

        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided!",
            });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        let wishlist = await Wishlist.findOne({ userId });

        if (!wishlist) {
            wishlist = new Wishlist({ userId, items: [] });
        }

        const findCurrentProductIndex = wishlist.items.findIndex(
            (item) => item.productId.toString() === productId
        );

        if (findCurrentProductIndex === -1) {
            wishlist.items.push({ productId, quantity });
        } else {
            wishlist.items[findCurrentProductIndex].quantity += quantity;
        }

        await wishlist.save();
        res.status(200).json({
            success: true,
            data: wishlist,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error"
        })
    }
}

export const fetchWishlistItems = async (req, res) => {
    try {
        const { userId } = req.params;
        
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User id is manadatory!",
            });
        }

        const wishlist = await Wishlist.findOne({ userId }).populate({
            path: "items.productId",
            select: "image title price salePrice",
        });

        if (!wishlist) {
            return res.status(404).json({
                success: false,
                message: "Wishlist not found!",
            });
        }

        const validItems = wishlist.items.filter(
            (productItem) => productItem.productId
        );

        if (validItems.length < wishlist.items.length) {
            wishlist.items = validItems;
            await wishlist.save();
        }


        const populateWishlistItems = validItems.map((item) => ({
            productId: item.productId._id,
            image: item.productId.image,
            title: item.productId.title,
            price: item.productId.price,
            salePrice: item.productId.salePrice,
            quantity: item.quantity,
        }));

        res.status(200).json({
            success: true,
            data: {
                ...wishlist._doc,
                items: populateWishlistItems,
            },
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error"
        })
    }
}

export const updateWishlistItemQty = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided!",
            });
        }

        const wishlist = await Wishlist.findOne({ userId });
        if (!wishlist) {
            return res.status(404).json({
                success: false,
                message: "Wishlist not found!",
            });
        }

        const findCurrentProductIndex = wishlist.items.findIndex(
            (item) => item.productId.toString() === productId
        );

        if (findCurrentProductIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Wishlist item not available !",
            });
        }

        wishlist.items[findCurrentProductIndex].quantity = quantity;
        await wishlist.save();

        await wishlist.populate({
            path: "items.productId",
            select: "image title price salePrice",
        });

        const populateWishlistItems = wishlist.items.map((item) => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : "Product not found",
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.quantity,
        }));

        res.status(200).json({
            success: true,
            data: {
                ...wishlist._doc,
                items: populateWishlistItems,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error"
        })
    }
}

export const deleteWishlistItem = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        if (!userId || !productId) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided!",
            });
        }

        const wishlist = await Wishlist.findOne({ userId }).populate({
            path: "items.productId",
            select: "image title price salePrice",
        });

        if (!wishlist) {
            return res.status(404).json({
                success: false,
                message: "Wishlist not found!",
            });
        }

        wishlist.items = wishlist.items.filter(
            (item) => item.productId._id.toString() !== productId
        );

        await wishlist.save();

        await wishlist.populate({
            path: "items.productId",
            select: "image title price salePrice",
        });

        const populateWishlistItems = wishlist.items.map((item) => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : "Product not found",
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.quantity,
        }));

        res.status(200).json({
            success: true,
            data: {
                ...wishlist._doc,
                items: populateWishlistItems,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error"
        })
    }
}