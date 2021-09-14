const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_KEY);

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

    // only do stuff if this is a successful Stripe Checkout purchase
    if (stripeEvent.type === 'checkout.session.expired') {
      const session = stripeEvent.data.object;
      const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);

      //everything looks good, lets send the email
      if (session.customer_details
        && session.customer_details.email
        && session.after_expiration
        && session.after_expiration.recovery
        && session.consent
        && session.consent.promotions === 'opt_in'
      ){
        const email = session.customer_details.email;

        //send abandon email function
        const sendAbandonEmail = async (template_id, abandon_email) => {
          await sgMail.send({
            personalizations:[
              {
                to: {
                  email: email,
                },
                dynamic_template_data:{
                  weblink: (session.after_expiration) ? session.after_expiration.recovery.url : "https://sysifuscorp.com/buy",
                }
              }
           ],
           from: {
             email: process.env.SENDGRID_FROM_EMAIL,
             name: "Wonmin Lee"
           },
           template_id: template_id,
           asm: {
             group_id: 16361,
           },
         });

         //update the payment intent so we know that the first email was sent
         await stripe.paymentIntents.update(
           session.payment_intent,
           {metadata: {abandon_email: abandon_email}}
         );

         //notify myself that an abandon email was sent
         await notifyMyself({
           subject: `A cart abandon email was sent to ${email}`,
           html: `<h1><a href="https://app.sendgrid.com/">Check sendgrid</a></h1>`,
         });
        }

        //send email depending on which one we've already sent
        if (!paymentIntent.metadata.abandon_email){
          sendAbandonEmail("d-6dbf4eccd288476eab8255666fc3b3d9", "first");
        }
        else if (paymentIntent.metadata.abandon_email === "first"){
          sendAbandonEmail("d-215dc230e7aa4d7282aa664b33e1aef2", "second");
        }
        else if (paymentIntent.metadata.abandon_email === "second"){
          sendAbandonEmail("d-d27ccf184dfc49eeb5bf6fd4dd829063", "third");
        }
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
