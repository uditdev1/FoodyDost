import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {trackOrderById} from "../../Services/orderService.js";
import NotFound from "../../components/NotFound/NotFound.jsx";
import classes from "./OrderTrack.module.css";
import Map from "../../components/Map/Map.jsx";
import OrderItemsList from "../../components/OrderItemsList/OrderItemsList.jsx";
import DateTime from "../../components/DateTime/DateTime.jsx";

export default function OrderTrack () {
    const {orderId} = useParams();
    const [order, setOrder] = useState();

    useEffect( () => {
        orderId && trackOrderById(orderId).then(order => setOrder(order));
    }, []);

    if(!orderId) return (<NotFound message="Order Not Found" />);
    
    return order && 
        <>
            <div className={classes.main}>
                <div className={classes.details}>
                        <span><span>Order </span>#{order.id}</span>
                        <table className={classes.table}> 
                            <tbody>
                            <tr>
                                <td>Date</td>
                                <td className={classes.createdAt}><DateTime date={order.createdAt}/></td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>{order.name}</td>
                            </tr>
                            <tr>
                                <td>Phone No.</td>
                                <td>{order.phone}</td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td>{order.address}</td>
                            </tr>
                            <tr>
                                <td>Order State</td>
                                <td>{order.status}</td>
                            </tr>
                            </tbody>
                        </table>
                    <div className={classes.orderItems}>
                        <OrderItemsList order={order}/>
                    </div>
                </div>
                <div className={classes.map}>
                    <span className={classes.title}>Shipping Address</span>
                    <Map readonly={true} location={order.addressLatLng}/>
                </div>
                {order.status === 'NEW' && (
                    <div className={classes.payment}>
                        <Link to="/payment" style={{textDecoration:"none"}}>Go To Payment</Link>
                    </div>
                )}
            </div>
        </>
}
