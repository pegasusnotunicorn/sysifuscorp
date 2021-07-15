const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    billing_address_collection: 'auto',
    shipping_address_collection: {
      allowed_countries: ['US', 'CA', "MX"],
    },
    mode: "payment",
    success_url: `${process.env.URL}/.netlify/functions/create-label?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: process.env.URL,
    line_items: [
      {
        price: process.env.PRICE_ID_40,
        quantity: 1,
        adjustable_quantity: {
          enabled: true,
          minimum: 1
        },
      }
    ],
    shipping_rates: [process.env.SHIPPING_RATE_AMERICA],
    allow_promotion_codes: true
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      sessionId: session.id,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    }),
  };
};
