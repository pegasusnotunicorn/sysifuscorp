const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  let ref = event.queryStringParameters.ref;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    billing_address_collection: 'auto',
    shipping_address_collection: {
      allowed_countries: ['US', 'CA', "MX", "CH", "AT", "BE", "DK", "FR", "FI", "DE", "GR", "HU", "IE", "IS", "IL", "IT", "LU", "NL", "NO", "PT", "SE", "ES", "GB"],
    },
    mode: "payment",
    // success_url: `${process.env.URL}/.netlify/functions/create-label?session_id={CHECKOUT_SESSION_ID}`,
    success_url: `${process.env.URL}/thankyou`,
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
    metadata: {
      "referrer" : ref
    },
    tax_id_collection: {
      enabled: true,
    },
    payment_intent_data: {
      metadata: {
        "referrer" : ref
      },
    },
    shipping_rates: [process.env.SHIPPING_RATE_AMERICA],
    allow_promotion_codes: true,
    expires_at: Math.floor(Date.now() / 1000) + (3600 * 1),   //configured to expire after 1 hour
    consent_collection: {
      promotions: 'auto',
    },
    after_expiration: {
      recovery: {
        enabled: true,
        allow_promotion_codes: true,
      },
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      sessionId: session.id,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    }),
  };
};
