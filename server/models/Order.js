import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    userId: { type: String, required: true },

    cartItems: [
        {
            productId: String,
            title: String,
            image: String,
            price: String,
            quantity: Number,
        },
    ],

    addressInfo: {
        addressId: String,
        address: String,
        city: String,
        pincode: String,
        phone: String,
        notes: String,
    },

    paymentMethod: {
        type: String,
        enum: ['PAYHERE', 'PAYPAL'],
        required: true,
    },

    paymentStatus: {
        type: String,
        enum: ['PENDING', 'PAID', 'FAILED', 'REFUNDED'],
        default: 'PENDING',
    },

    paymentInfo: {
        transactionId: String,         // PayHere payment_id
        amount: Number,
        currency: {
            type: String, 
            enum: ['LKR', 'USD'],
            default: 'LKR'
        },
        method: String,                // VISA, MASTER, etc.
        cardHolderName: String,        // If provided by PayHere
        maskedCard: String,            // ************4564
        rawResponse: mongoose.Schema.Types.Mixed,
        payhereOrderId: String,        // Your own order ID used in PayHere request
        payhereStatusCode: String,     // 2, 0, -1, etc.
        payhereStatusMessage: String,  // Gateway message (optional)
        md5sig: String,                // Signature from PayHere (for verification)
        verified: { type: Boolean, default: false }, // After hash check
    },

    totalAmount: { type: Number, required: true },

    orderStatus: {
        type: String,
        enum: ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
        default: 'PENDING',
    },

    isRefunded: { type: Boolean, default: false },

    refundInfo: {
        refundId: String,
        date: Date,
        reason: String,
    },

    orderDate: { type: Date, default: Date.now },
    orderUpdateDate: { type: Date, default: Date.now },

    // PayPal Specific (fallback support)
    paymentId: String,
    payerId: String,

    // Internal: hash used for client-side integration
    hash: String, // generated server-side using merchantSecret, sent to frontend
});

export default mongoose.model("Order", OrderSchema);
