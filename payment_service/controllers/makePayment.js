import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const makePayment = async (req, res) => {
  try {
    const { orderId, orderData } = req.body;

    console.log("Order Data:", orderData);

    // Stripe expects unit_amount in smallest currency unit (paise)
    const totalAmount = orderData?.totalAmount;
    const services = orderData?.services;

    // //lineItems
    const line_items = services?.map((s) => ({
      price_data: {
        currency: "inr",
        product_data: { name: s.service },
        unit_amount: Math.round(s.unit_amount * 100),
      },
      quantity: s.quantity,
    }));

    // //Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: line_items,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/payment-success/orderId=${orderId}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-cancel/orderId=${orderId}`,
      metadata: { orderId }, // store orderId for webhook
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};
