const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  const { items, address } = req.body;
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100,  // Convert to cents
      currency: 'usd',
    });

    const order = new Order({
      user: req.user._id,
      items,
      address,
      paymentIntentId: paymentIntent.id
    });
    await order.save();

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: 'Order creation failed' });
  }
};
