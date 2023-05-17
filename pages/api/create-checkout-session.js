import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export default async (req, res) => {
    const { items } = req.body
    console.log(items);
    const transformedItems = items.map((item) => ({
        quantity: item.quantity,
        // price: 'price_1N8JzPANKcOO4sITmBQDJpay'
        price_data: {
            currency: "eur",
            unit_amount: item.price * 100,
            product_data: {
                name: item.title,
                images: [item.image]
            }
        }
    }))

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: transformedItems,
        mode: 'payment',
        success_url: `mini-shopping-cart-next.vercel.app/success`,
        cancel_url: `mini-shopping-cart-next.vercel.app/cancel`,
        metadata: {
            images: JSON.stringify(items.map((item) => item.image))
        }
    })
    res.status(200).json({ id: session.id })
}