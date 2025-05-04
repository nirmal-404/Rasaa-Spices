import crypto from 'crypto'; // (ES6)

export const generateHash = (orderId, totalAmount, currency) => {
    try {
        const merchantId = process.env.PAYHERE_MERCHANT_ID;
        const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET;
        const amountFormatted = totalAmount.toFixed(2);


        const hashBase = `${merchantId}${orderId}${amountFormatted}${currency}${merchantSecret}`;
        const hash = crypto.createHash("md5").update(hashBase).digest("hex").toUpperCase();

        return hash;

    } catch (error) {
        console.error(error);
        throw new Error("Error while creating the hash");
    }
}