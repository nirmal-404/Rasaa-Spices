import nodemailer from 'nodemailer';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';



// === PDF GENERATOR ===
const generatePDF = (order, filePath) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    doc.fontSize(18).text('🧾 Rasaa Agro - Order Receipt', { align: 'center' });
    doc.moveDown();

    doc.fontSize(12).text(`Order ID: ${order._id}`);
    doc.text(`Order Date: ${new Date(order.orderDate).toLocaleString()}`);
    doc.text(`Order Status: ${order.orderStatus}`);
    doc.text(`Payment Method: ${order.paymentMethod}`);
    doc.text(`Payment Status: ${order.paymentStatus}`);
    doc.text(`Currency: ${order.paymentInfo.currency}`);
    doc.text(`Total Amount: LKR ${order.totalAmount}`);
    doc.moveDown();

    doc.text('Shipping Info:', { underline: true });
    doc.text(`Address: ${order.addressInfo.address}, ${order.addressInfo.city}`);
    doc.text(`Phone: ${order.addressInfo.phone}`);
    doc.text(`Notes: ${order.addressInfo.notes}`);
    doc.moveDown();

    doc.text('Items:', { underline: true });
    order.cartItems.forEach((item, i) => {
      doc.text(
        `${i + 1}. ${item.title} - Qty: ${item.quantity} - LKR ${item.price} each`
      );
    });

    doc.end();
    stream.on('finish', () => resolve());
    stream.on('error', reject);
  });
};

// === EMAIL SENDER ===
export const sendOrderConfirmationEmail = async (userEmail, userName, order) => {
  const pdfPath = path.join('./', `receipt-${order._id}.pdf`);
  await generatePDF(order, pdfPath);

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'binolakash@gmail.com',
      pass: 'axge ojwi euua nsaa',
    },
  });

  const mailOptions = {
    from: '"Rasaa Agro" <binolakash@gmail.com>',
    to: userEmail,
    subject: `Your Rasaa Order Confirmation (Order #${order._id})`,
    html: `
      <div style="font-family: Arial; padding: 20px; background: #f9f9f9;">
        <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 10px;">
          <h2 style="color: #27ae60; text-align: center;">✅ Order Confirmed!</h2>
          <p>Hi <strong>${userName}</strong>,</p>
          <p>Thank you for shopping with <strong>Rasaa Agro</strong>.</p>
          <p>Your order has been placed successfully. A copy of your receipt is attached.</p>
          <p style="font-size: 14px; color: #555;">Order ID: <strong>${order._id}</strong><br/>
          Status: <strong>${order.orderStatus}</strong><br/>
          Total: <strong>LKR ${order.totalAmount}</strong></p>
          <p>We’ll notify you when your items are shipped.</p>
          <hr/>
          <p style="text-align: center; font-size: 12px; color: #aaa;">This is an automated message — please do not reply.</p>
        </div>
      </div>
    `,
    attachments: [
      {
        filename: `OrderReceipt-${order._id}.pdf`,
        path: pdfPath,
        contentType: 'application/pdf',
      },
    ],
  };

  await transporter.sendMail(mailOptions);
  console.log('✅ Email sent with PDF receipt.');
};
