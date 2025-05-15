import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Price from '../Price/Price';
import classes from './orderItemsList.module.css';
import { fetchSolConversionRate } from '../../Services/cryptoService';

export default function OrderItemsList({ order }) {
  const [sol, setSol] = useState();

  useEffect(() => {
    const run = async () => {
      const val = await fetchSolConversionRate(order.totalPrice);
      setSol(val);
    }
    run();
  }, []);

  return (
    <table className={classes.table}>
      <tbody>
        <tr>
          <td colSpan="5">
            <h3>Order Items:</h3>
          </td>
        </tr>
        {order.items.map(item => (
          <tr key={item.food.id}>
            <td>
              <Link to={`/food/${item.food.id}`}>
                <img src={item.food.imageUrl} />
              </Link>
            </td>
            <td>{item.food.name}</td>
            <td className='price'>
              <Price price={item.food.price} />
            </td>
            <td>{item.quantity}</td>
            <td>
              <Price price={item.price} />
            </td>
          </tr>
        ))}

        <tr>
          <td colSpan="2" ></td>
          <td colSpan={2}>
            <strong>Total :</strong>
          </td>
          <td>
            <h2><b><Price price={order.totalPrice} /></b></h2>
            <h3><b>{sol} SOL </b></h3>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
