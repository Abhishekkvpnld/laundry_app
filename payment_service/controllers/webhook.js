import env from "dotenv";
import Stripe from "stripe";

env.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const webhook = async (request, response) => {
  const sig = request.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    console.error("⚠️ Webhook signature verification failed.", err.message);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle events
  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      console.log(
        "💰 PaymentIntent was successful!",
        paymentIntent.id
      );

      // Call your DB update function or send email
      break;
    }

    case "checkout.session.completed": {
      const session = event.data.object;
      console.log("✅ Checkout session completed:", session.id);

      // You can fetch line items:
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id
      );
      console.log("📦 Line items:", lineItems);

      // Update DB, fulfill order, etc.
      break;
    }

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  response.status(200).send({ received: true });
};
