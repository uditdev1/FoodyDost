import React from 'react';
import classes from './price.module.css';

export default function Price({ price, locale = 'en-US', currency = 'INR' }) {
  const formatPrice = () =>
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(price);

  return <span className={classes.price}>{formatPrice()}</span>;
}
