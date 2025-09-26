export const makePayment = async (req, res) => {
  try {
    const { services, totalAmount } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: services.map((s) => ({
        price_data: {
          currency: "inr",
          product_data: { name: s.service },
          unit_amount: Math.round((totalAmount * 100) / services.length), // example
        },
        quantity: s.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/payment-success`,
      cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};
