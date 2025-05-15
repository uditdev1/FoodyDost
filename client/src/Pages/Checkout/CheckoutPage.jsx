import React , {useState } from "react";
import classes from "./CheckoutPage.module.css";
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useCart } from '../../components/Hooks/useCart.jsx';
import {Link, useNavigate} from "react-router-dom";
import OrderItemsList from "../../components/OrderItemsList/OrderItemsList.jsx";
import Map from '../../components/Map/Map.jsx';
import {useAuth} from "../../components/Hooks/useAuth.jsx";
import { toast } from "react-toastify";
import { createOrder } from "../../Services/orderService.js";
import Price from "../../components/Price/Price.jsx";

function CheckoutPage() {
    const {cart } = useCart();
    const {user} = useAuth();
    const navigate = useNavigate();

    const [order, setOrder] = useState({ ...cart });
    const [totalBill , setTotalBill] = useState(0);

    const submit = async (e) => {
        e.preventDefault();
        if(!order.addressLatLng){
            toast.warning("Please select your location on map");
            return ;
        }
        const data = e.target;
        await createOrder({...order, name : data.name.value , address : data.address.value, phone : data.phone.value});
        navigate("/payment");
    }
    useState( () => {
        if(order && order.items){
            order.items.map( (item) => {
                setTotalBill((prev) => prev + item.price);
            });
        }
    }, [order])

    return (
        <form onSubmit={submit} className={classes.main}>    
            <div className={classes.orderForm}>
                <span className={classes.mapHead}>Order Form</span>
                <br/>
                <br/>
                <TextField
                sx={{ height: "5rem", width: "100%" }}
                name='name'
                label="Name"
                type='text'
                variant="outlined"
                defaultValue={user.name}
                required
                />
                <br/>
                <TextField
                sx={{ height: "5rem",  width: "100%" }}
                name='phone'
                label="Phone"
                type='number'
                variant="outlined"
                defaultValue={user.phone}
                required
                />
                <br/>
                <TextField
                sx={{ height: "5rem",  width: "100%" }}
                name='address'
                label="Address"
                type='text'
                variant="outlined"
                defaultValue={user.address}
                required
                />
                <br/>
                <div className={classes.orderItems}>
                    <OrderItemsList order={order}/>
                </div>
                <div className={classes.orderItems2}>
                    <h3>Order Items:</h3>
                    {
                        order.items.map((item) => (
                            <div>
                                <Link to={`/food/${item.food.id}`}>
                                    <img src={item.food.imageUrl} />
                                <ul>
                                    <li><span className={classes.name}>Name : </span> {item.food.name}</li>
                                    <li>
                                        <span className={classes.name}>Item Price : </span>
                                        <Price price={item.food.price} />
                                    </li>
                                    <li><span className={classes.name}>Quantity : </span>{item.quantity}</li>
                                    <li>
                                        <span className={classes.name}>Total Price : </span>
                                        <Price price={item.price} />
                                    </li>
                                </ul>
                                </Link>
                            </div>
                        ))
                    }
                    <span className={classes.name} >Total Bill : <Price price={totalBill}/></span>
                    <br/>
                    <br/>
                </div>
            </div>
            <div className={classes.map}>
                <span className={classes.mapHead}>Choose Your Location</span>
                <div className={classes.mapBox}>
                <Map
                    location={order.addressLatLng}
                    onChange={latlng => {
                    setOrder({ ...cart, addressLatLng: latlng });
                    }}
                />
                </div>
            </div>
            
            <div className={classes.confirm}>
                <Button type="submit" variant='contained' sx={{bgcolor:"#d32f2f", width:"18rem", height:"3.5rem"}} >Go To Payment</Button>
            </div>
        </form>
    );
}

export default CheckoutPage;