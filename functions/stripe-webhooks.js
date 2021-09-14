const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_KEY);

exports.handler = async ({ body, headers }) => {
  try {
    // check the webhook to make sure it’s valid
    const stripeEvent = stripe.webhooks.constructEvent(
      body,
      headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // only do stuff if this is a successful Stripe Checkout purchase
    if (stripeEvent.type === 'checkout.session.completed') {
      const session = stripeEvent.data.object;

      //everything looks good, lets send the email
      if (session.customer_details
        && session.customer_details.email
        && session.after_expiration
        && session.after_expiration.recovery
      ){
        const email = session.customer_details.email;
        const recoveryUrl = (session.after_expiration) ? session.after_expiration.recovery.url : "https://sysifuscorp.com/buy";

        const msg = {
          personalizations:[
            {
              to: {
                email: email,
              },
              dynamic_template_data:{
                "weblink": recoveryUrl,
              }
            }
         ],
         from: {
           email: process.env.SENDGRID_FROM_EMAIL,
           name: "Wonmin Lee"
         },
         template_id:"d-6dbf4eccd288476eab8255666fc3b3d9",
        };
        await sgMail.send(msg);
        await sgMail.send({
          to: "pegasusnotunicorn+sendgrid@gmail.com",
          from: {
            email: process.env.SENDGRID_FROM_EMAIL,
            name: "Wonmin Lee",
          },
          subject: `A cart abandon email was sent to ${email}`,
          html: `<h1><a href="https://app.sendgrid.com/">Check sendgrid</a></h1>`,
        });
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (err) {
    console.log(`Stripe webhook failed with ${err}`);

    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`,
    };
  }
};
