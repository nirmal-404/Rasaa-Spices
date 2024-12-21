import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Product title is required"],
        trim: true,
        minlength: [3, "Title must be at least 3 characters long"],
        maxlength: [100, "Title cannot exceed 100 characters"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
        minlength: [10, "Description must be at least 10 characters long"]
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        trim: true,
        enum: {
            values: ['beverages', 'snacks', 'desserts', 'sweets', 'meals'],
            message: "{VALUE} is not a valid category"
        }
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price must be a positive number"]
    },
    salePrice: {
        type: Number, // Changed to Number for proper calculations
        required: [true, "Sale price is required"],
        min: [0, "Sale price must be a positive number"],
        validate: {
            validator: function (value) {
                return value <= this.price;
            },
            message: "Sale price must be less than or equal to the price"
        }
    },
    totalPrice: {
        type: Number, // Changed to Number for proper calculations
        required: [true, "Total price is required"],
        min: [0, "Total price must be a positive number"]
    },
    averageReview: {
        type: Number, // Changed to Number for numerical operations
        required: [true, "Average review is required"],
        min: [0, "Average review must be between 0 and 5"],
        max: [5, "Average review must be between 0 and 5"]
    },
    isSpecial: {
        type: Boolean,
        required: [true, "isSpecial flag is required"],
        default: false
    },
    image: {
        type: String,
        required: [true, "Image URL is required"],
        trim: true,
    }
});

export default mongoose.model("Product", productSchema);
