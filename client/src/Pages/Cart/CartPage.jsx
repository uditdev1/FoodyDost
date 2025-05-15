import React from 'react'
import { useCart } from '../../components/Hooks/useCart.jsx';
import classes from "./CartPage.module.css";
import {Link} from "react-router-dom";
import Price from '../../components/Price/Price.jsx';
import NotFound from "../../components/NotFound/NotFound.jsx";

export default function CartPage() {
    const {cart , removeFromCart , changeQuantity} = useCart();
  return (
    <>
    {cart.items.length === 0 ? (
        <NotFound message="Cart Page is Empty" ></NotFound>
      ) : (
        <div className={classes.container}>
          <ul className={classes.list} >
            {cart.items.map(item => (
              <li key={item.food.id}>   
                
                <Link style={{textDecoration:"none", color:"black" }} to={`/food/${item.food.id}`}>
                  <div>
                    <img src={`${item.food.imageUrl}`} alt={item.food.name} />
                  </div>
                  <span style={{padding:"0.6em"}}>
                    {item.food.name}
                  </span>
                </Link>
                  <div>
                    <select
                      value={item.quantity}
                      onChange={e => changeQuantity(item, Number(e.target.value))}
                    >
                      <option>1</option>
                      <option>2</option>  
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                      <option>8</option>
                      <option>9</option>
                      <option>10</option>
                    </select>
                  </div>

                  <div>
                    <Price price={item.price} />
                  </div>

                  <div>
                    <button
                      className={classes.remove_button}
                      onClick={() => removeFromCart(item.food.id)}
                    >
                      Remove
                    </button>
                  </div>
              </li>
            ))}
          </ul>
           <div className={classes.checkout}>
            <div>
              <div className={classes.foods_count}>{cart.totalCount}</div>
              <div className={classes.total_price}>
                <Price price={cart.totalPrice} />
              </div>
            </div>

            <Link 
              style={{
                textDecoration: "none",
                position:"relative",
                padding:"0.5rem",
                margin:"1rem",
              }}
                to="/checkout">
                Proceed To Checkout
            </Link>

          </div>
        </div>
      )}
    </>
  )
}
