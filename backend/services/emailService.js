const nodemailer = require("nodemailer");

// Create a reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail", // You can change this to your email service provider
  auth: {
    user: process.env.EMAIL_USERNAME, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password
  },
});

// Function to send a payment confirmation email
const sendPaymentConfirmationEmail = async (userEmail, paymentDetails) => {
  const { amount, currency, paymentMethod, transactionId, paymentDate } =
    paymentDetails;

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: userEmail,
    subject: "carGo Platform - Payment Confirmation",
    text: `Dear user,

Thank you for your payment. Here are the details of your transaction on the carGo Platform:

Amount: ${amount} ${currency}
Payment Method: ${paymentMethod}
Transaction ID: ${transactionId}
Date: ${paymentDate}

We appreciate your trust in carGo Platform. 

Best regards,
The carGo Platform Team
`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Payment confirmation email sent successfully");
  } catch (error) {
    console.error("Error sending payment confirmation email:", error.message);
  }
};

module.exports = { sendPaymentConfirmationEmail };
