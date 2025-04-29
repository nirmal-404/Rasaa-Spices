// Correct import
import crypto from 'crypto'; // (ES6)

import client from "../../helpers/paypal.js";
import Order from "../../models/Order.js";
import Cart from "../../models/Cart.js";
import Product from "../../models/Product.js";

import paypal from "@paypal/checkout-server-sdk";

export const createOrder = async (req, res) => {
    try {
        const { userId,
            cartItems,
            addressInfo,
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderDate,
            orderUpdateDate,
            paymentId,
            payerId,
            cartId, } = req.body;

        console.log("Order Details:");
        console.log("User ID:", userId);
        console.log("Cart Items:", cartItems);
        console.log("Address Info:", addressInfo);
        console.log("Order Status:", orderStatus);
        console.log("Payment Method:", paymentMethod);
        console.log("Payment Status:", paymentStatus);
        console.log("Total Amount:", totalAmount);
        console.log("Order Date:", orderDate);
        console.log("Order Update Date:", orderUpdateDate);
        console.log("Payment ID:", paymentId);
        console.log("Payer ID:", payerId);
        console.log("Cart ID:", cartId);

        // Create a new order request
        const request = new paypal.orders.OrdersCreateRequest();
        request.prefer("return=representation");
        request.requestBody({
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: totalAmount.toFixed(2),
                        breakdown: {
                            item_total: {
                                currency_code: "USD",
                                value: totalAmount.toFixed(2),
                            },
                        },
                    },
                    items: cartItems.map((item) => ({
                        name: item.title,
                        unit_amount: {
                            currency_code: "USD",
                            value: item.price.toFixed(2),
                        },
                        quantity: item.quantity.toString(),
                    })),
                },
            ],
            application_context: {
                return_url: `${process.env.CLIENT_BASE_URL}/shop/paypal-return`,
                cancel_url: `${process.env.CLIENT_BASE_URL}/shop/paypal-cancel`,
            },
        });

        // Execute the PayPal order creation request
        const order = await client.execute(request);

        // Extract the approval URL
        const approvalURL = order.result.links.find(
            (link) => link.rel === "approve"
        ).href;

        // Save the order in your database
        const newlyCreatedOrder = new Order({
            userId,
            cartId,
            cartItems,
            addressInfo,
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderDate,
            orderUpdateDate,
            paymentId,
            payerId,
        });

        await newlyCreatedOrder.save();

        res.status(201).json({
            success: true,
            approvalURL,
            orderId: newlyCreatedOrder._id,
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: "Error while creating PayPal order",
        });
    }
};

export const capturePayment = async (req, res) => {
    try {
        const { paymentId, payerId, orderId } = req.body;

        let order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order cannot be found",
            });
        }

        order.paymentStatus = "paid";
        order.orderStatus = "confirmed";
        order.paymentId = paymentId;
        order.payerId = payerId;

        for (let item of order.cartItems) {
            let product = await Product.findById(item.productId);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Not enough stock for ${product.title}`,
                });
            }

            product.totalStock -= item.quantity;

            await product.save();
        }

        const getCartId = order.cartId;
        await Cart.findByIdAndDelete(getCartId);

        await order.save();

        res.status(200).json({
            success: true,
            message: "Order confirmed",
            data: order,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
    }
};

export const generateHash = async (req, res) => {
    const { order_id, amount, currency } = req.body;

    if (!order_id || !amount || !currency) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    const formattedAmount = Number(amount).toFixed(2); // must be 2 decimals
    const secretMd5 = crypto.createHash('md5').update(process.env.MERCHANT_SECRET).digest('hex').toUpperCase();

    const raw = process.env.MERCHANT_ID + order_id + formattedAmount + currency + secretMd5;
    const hash = crypto.createHash('md5').update(raw).digest('hex').toUpperCase();

    res.json({ hash });
}

export const getAllOrdersByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const orders = await Order.find({ userId });

        if (!orders.length) {
            return res.status(404).json({
                success: false,
                message: "No orders found!",
            });
        }

        res.status(200).json({
            success: true,
            data: orders,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
    }
};

export const getOrderDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found!",
            });
        }

        res.status(200).json({
            success: true,
            data: order,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
    }
};