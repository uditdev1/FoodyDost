import {Router} from "express";
import handler from "express-async-handler";
import auth from "../middleware/Auth.mid.js";
import { orderModel } from "../models/order.model.js";
import { OrderStatus } from "../constants/orderStatus.js";
import { userModel } from "../models/user.model.js";

const router = Router();

router.use(auth);

router.post(
    "/create", 
    handler ( async (req, res) => {
        const order = req.body;
        if(order.items.length <= 0) res.status(400).send("Cart Is Empty !");
        
        await orderModel.deleteOne({
            user: req.user.id,
            status : OrderStatus.NEW,
        });

        const newOrder = new orderModel({
            ...order , user : req.user.id,
        });
        await newOrder.save();
        res.send(newOrder);
    })      
);

router.put(
    "/pay",
    handler( async (req, res) => {
        const order = await orderModel.findOne({user : req.user.id , status: OrderStatus.NEW}).populate('user');
        if(!order) return res.status(400).send();
        order.paymentId = "1235";
        order.status = OrderStatus.PAYED;
        await order.save();
        res.send(order._id);
    })
);

router.get (
    "/newOrderForCurrentUser",
    handler ( async ( req, res) => {
        const order = await orderModel.findOne({user : req.user.id , status: OrderStatus.NEW}).populate("user");
        if(order) return res.send(order);
        return res.status(400).send();
    })
);

router.get(
    "/track/:orderId",
    handler (async (req, res) => {
        const { orderId } = req.params;
        const user = await userModel.findById(req.user.id);
        const filter = {
            _id: orderId,
        };

        if (!user.isAdmin) {
        filter.user = user._id;
        }

        const order = await orderModel.findOne(filter);

        if(!order) return res.status(401).send("401");
        res.send(order);
    })
);

router.get("/allstatus", 
    handler (async (req, res) => {
        const allOrders = Object.values(OrderStatus);
        res.send(allOrders);
    })
)

router.get("/:status?",
    handler( async (req, res) => {
        const status = req.params.status;
        const user = await userModel.findById(req.user.id);
        const filter = {};
        if(!user.isAdmin) filter.user = user._id;
        if(status) filter.status = status;
        const orders = await orderModel.find(filter).sort("-createdAt");
        res.send(orders);
    })
);

export default router ;