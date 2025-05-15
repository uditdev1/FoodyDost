import React, { useEffect, useReducer } from 'react'
import {useParams } from "react-router-dom";
import {getAllOrders, getAllStatus} from "../../Services/orderService.js";
import classes from "./OrdersPage.module.css";
import DateTime from "../../components/DateTime/DateTime.jsx";
import NotFound from "../../components/NotFound/NotFound.jsx";
import Price from "../../components/Price/Price.jsx";
import { Link } from 'react-router-dom';
const initialState = {};
const reducer = (state , action) => {
    const {type , payload } = action ;
    switch (type){
        case 'ALL_STATUS_FETCHED':
            return {...state , allStatus : payload};
        case 'ORDER_FETCHED':
            return {...state , orders : payload};
        default : 
            return state;
    }
}
function OrdersPage() {
    const [{allStatus , orders} , dispatch] = useReducer(reducer, initialState);
    const {filter} = useParams();
    useEffect( () => {
        getAllStatus().then(status => {
            dispatch({type : "ALL_STATUS_FETCHED", payload : status});
        })
        getAllOrders(filter).then(orders => {
            dispatch({type : 'ORDER_FETCHED', payload : orders});
        });
    },[filter]);
    return (
        <div className={classes.container}>
          <span className={classes.orders_heading} >Orders</span>
          {allStatus && (
            <div className={classes.all_status}>
              <Link to="/orders" className={!filter ? classes.selected : ''}>
                All
              </Link>
              {allStatus.map(state => (
                <Link
                  key={state}
                  className={state == filter ? classes.selected : ''}
                  to={`/orders/${state}`}
                >
                  {state}
                </Link>
              ))}
            </div>
          )}
    
          {orders?.length === 0 && (
            <NotFound
              linkRoute={filter ? '/orders' : '/'}
              linkText={filter ? 'Show All' : 'Go To Home Page'}
            />
          )}
    
          {orders &&
            orders.map(order => (
              <div key={order.id} className={classes.order_summary}>
                <div className={classes.header}>
                  <span className={classes.order_id_header}>{order.id}</span>
                  <span>
                    <DateTime date={order.createdAt} />
                  </span>
                  <span>{order.status}</span>
                </div>
                <div className={classes.items}>
                  {order.items.map(item => (
                    <Link key={item.food.id} to={`/food/${item.food.id}`}>
                      <img src={item.food.imageUrl} alt={item.food.name} />
                    </Link>
                  ))}
                </div>
                <div className={classes.footer}>
                  <div>
                    <Link to={`/track/${order.id}`}>Show Order</Link>
                  </div>
                  <div>
                    <span className={classes.price}>
                      <Price price={order.totalPrice} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      );
}

export default OrdersPage