// controllers/payhereController.js
import crypto from "crypto";
import Order from "../../models/Order.js"; // Update path if needed

export const payHereNotify = async (req, res) => {
  try {
    const {
      merchant_id,
      order_id,
      payhere_amount,
      payhere_currency,
      status_code,
      md5sig,
    } = req.body;

    console.log("🔔 Received PayHere notification:", req.body);

    // Recalculate md5sig to verify legitimacy
    const localSig = crypto
      .createHash("md5")
      .update(
        `${merchant_id}${order_id}${payhere_amount}${payhere_currency}${status_code}${crypto
          .createHash("md5")
          .update(process.env.PAYHERE_MERCHANT_SECRET)
          .digest("hex")
          .toUpperCase()}`
      )
      .digest("hex")
      .toUpperCase();

    if (md5sig !== localSig) {
      console.warn("❌ Invalid MD5 signature from PayHere");
      return res.status(400).send("Invalid signature");
    }

    // ✅ Signature valid — update order status
    if (status_code === "2") {
      await Order.findByIdAndUpdate(order_id, {
        paymentStatus: "Paid",
        orderStatus: "Confirmed",
      });
      console.log("✅ Order marked as paid:", order_id);
    } else {
      await Order.findByIdAndUpdate(order_id, {
        paymentStatus: "Failed",
      });
      console.log("⚠️ Payment failed for order:", order_id);
    }

    res.status(200).send("Notification processed");
  } catch (error) {
    console.error("🔥 Error handling PayHere notification:", error);
    res.status(500).send("Internal server error");
  }
};
