import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { appointmentType } = req.body;

      
      const appointmentPricing = {
        "in-person-session": "price_1QQDBIDD4QlicA8Y6ZgjVFmQ", 
        "online-therapy-session": "price_1QQDC4DD4QlicA8YIJWlrbdt",
      };

      const priceId = appointmentPricing[appointmentType];
      if (!priceId) {
        return res.status(400).json({ error: 'Invalid appointment type' });
      }

      // Create the Checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/cancel`,
      });

      // Send back the session URL
      res.status(200).json({ url: session.url });
    } catch (error) {
      console.error('Error creating Stripe session:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
