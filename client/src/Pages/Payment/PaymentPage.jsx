import React, { useState, useEffect } from 'react';
import { getNewOrderForCurrentUser, pay } from '../../Services/orderService.js';
import OrderItemsList from '../../components/OrderItemsList/OrderItemsList.jsx';
import Map from '../../components/Map/Map.jsx';
import classes from "./PaymentPage.module.css";
import CopyText from '../../components/CopyText/CopyText.jsx';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {useCart} from "../../components/Hooks/useCart.jsx";
import BuyUsingCrypto from '../../components/BuyUsingCrypto/BuyUsingCrypto.jsx';

export default function PaymentPage() {
  const [order, setOrder] = useState();
  const [cryptoMenu ,  setCryptoMenu] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getNewOrderForCurrentUser().then(data => setOrder(data));
  }, []);

  const {clearCart} = useCart();

  const handleApprove = async () => {
    try {
      const orderId = await pay("12345");
      clearCart();
      toast.success("order generated");
      navigate("/track/" + orderId);
    } catch (err) {
      toast.success("Invalid error occured !");
    }
  }

  const handleCloseCryptoMenu = () => {
    setCryptoMenu(prev => !prev);
  }

  if (!order) return( <>hello order not found ! </>);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.content}>
          <div className={classes.summary}>
            <div>
              <h3>Name:</h3>
              <span>{order.name}</span>
            </div>
            <div>
              <h3>Phone No.:</h3>
              <span>{order.phone}</span>
            </div>
            <div>
              <h3>Address:</h3>
              <span>{order.address}</span>
            </div>
          </div>
          <OrderItemsList order={order} />
        </div>

        <div className={classes.mapBox}>
          <Map readonly={true} location={order.addressLatLng} />
        </div>
        
        { cryptoMenu && 
          <div >
            <BuyUsingCrypto handleCloseCryptoMenu={handleCloseCryptoMenu} handleApprove={handleApprove} amount={order.totalPrice}/>
          </div>
        }

          <div className={classes.buttonsBox}>
          <div className='p-2'>
            <button className='rounded-xl bg-[#D32F2F] p-2 text-xl text-white hover:bg-red-700 duration-200' onClick={handleCloseCryptoMenu}>
              Pay Using Solana
            </button>
          </div>
            <span className={classes.paymentDetails}>Payment Details :<br/></span>
            <ul>
              <li><CopyText data="upi@gmail.com" name="Upi Copied" /></li>
              <li><CopyText data="98797897987" name="Phone number copied"/></li>
            </ul>
            <span className={classes.paymentDetails} style={{color:"black", fontSize:"larger"}}>Click approve to generate order</span>
            <Button onClick={handleApprove} sx={{margin:"2%", fontSize:"larger", color:"red", fontWeight:"bolder"}}>Approve Order</Button>
          </div>        
      </div>
    </>
  );
}
