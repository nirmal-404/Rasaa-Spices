import nodemailer from 'nodemailer' 

export const  sendReviewEmail = async(userEmail, userName, userReview) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587, 
    secure: false,
    auth: {
      user: 'binolakash@gmail.com', // Replace with your email
      pass: 'axge ojwi euua nsaa', // Replace with Gmail App Password
    },
  });

  let mailOptions = {
    from: '"Rasaa Agro" binolakash@gmail.com',
    to: userEmail,
    subject: 'Thank you for your review!',
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <div style="text-align: center;">
            <h2 style="color: #333;">Rasaa Agroo</h2>
          </div>
          <hr style="border: none; border-top: 1px solid #ddd;" />
          <div style="padding: 20px;">
            <h3 style="color: #555;">Hi ${userName},</h3>
            <p style="font-size: 16px; color: #444;">Thank you for your review:</p>
            <blockquote style="margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-left: 5px solid #007BFF; font-style: italic;">
              ${userReview}
            </blockquote>
            <p style="font-size: 16px; color: #444;">We truly appreciate your feedback and support.</p>
          </div>
          <hr style="border: none; border-top: 1px solid #ddd;" />
          <p style="text-align: center; color: #aaa; font-size: 12px;">This is an automated message — please do not reply.</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

