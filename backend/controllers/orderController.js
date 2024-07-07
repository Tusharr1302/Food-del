import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// //config variables
// // const currency = "inr";
// const deliveryCharge = 2;
const frontend_URL = 'http://localhost:5173';

// // Placing User Order for Frontend using stripe
const placeOrder = async (req, res) => {

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,            //Get from middleware which will decode token
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });    //clearing cart after placing order

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "USD",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: "USD",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount:  2 * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
                line_items: line_items,
                mode: 'payment',
            success_url: `${frontend_URL}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_URL}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// ////////////Placing User Order for Frontend using stripe
// const placeOrderCod = async (req, res) => {

//     try {
//         const newOrder = new orderModel({
//             userId: req.body.userId,
//             items: req.body.items,
//             amount: req.body.amount,
//             address: req.body.address,
//             payment: true,
//         })
//         await newOrder.save();
//         await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

//         res.json({ success: true, message: "Order Placed" });

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Error" })
//     }
// }

//API Listing Order for Admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});   //Get all the orders
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// User Orders for Frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const updateStatus = async (req, res) => {
    console.log(req.body);
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        res.json({ success: false, message: "Error" })
    }

}

//For verifying payment status if true success else delete cartdata

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Paid" })
        }
        else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false, message: "Not Paid" })
        }
    } catch (error) {
        res.json({ success: false, message: "Not  Verified" })
    }

}

export { placeOrder,verifyOrder,userOrders,listOrders,updateStatus}