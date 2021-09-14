const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const sgMail = require('@sendgrid/mail');
const sgClient = require('@sendgrid/client');
sgMail.setApiKey(process.env.SENDGRID_KEY);
sgClient.setApiKey(process.env.SENDGRID_KEY);

//send an email to myself
const notifyMyself = async (messageDetails) => {
  const data = {
    to: process.env.SENDGRID_FROM_EMAIL,
    from: {
      email: process.env.SENDGRID_FROM_EMAIL,
      name: "Sup biatch",
    },
    subject: messageDetails.subject,
    html: messageDetails.html,
  };

  try {
    await sgMail.send(data);
  } catch (err) {
    console.log(err);
  }
}

exports.handler = async ({ body, headers }) => {
  try {
    // check the webhook to make sure it’s valid
    const stripeEvent = stripe.webhooks.constructEvent(
      body,
      headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // only do stuff if this we have all the info we need
    if (stripeEvent.type === 'checkout.session.expired') {
      const session = stripeEvent.data.object;
      const email = session.customer_details.email;

      //everything looks good, lets send the email
      if (session.customer_details
        && email
        && session.after_expiration
        && session.after_expiration.recovery
        && session.consent
        && session.consent.promotions === 'opt_in'
      ){
        //add customer email to sendgrid list for abandoned carts to go through the drip campaign
        await sgClient.request({
          method: 'PUT',
          url: '/v3/marketing/contacts',
          body: {
            list_ids: [ process.env.SENDGRID_LIST_ID ],
            contacts: [
              {
                email: email,
                recovery_url: session.after_expiration.recovery.url || "https://sysifuscorp.com/buy"
              }
            ]
          }
        });

        //notify myself of abandonment
        // await notifyMyself({
        //   subject: `A customer (${email}) was added to the abandon campaign on Sendgrid`,
        //   html: `<h1><a href="https://mc.sendgrid.com/automations/64e8681d-b8f3-45f6-9c67-0a831831f137/detail?view=raw">Check sendgrid</a></h1>`,
        // });
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
