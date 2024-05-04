import React from 'react';

//Import css module
import classes from './Category.module.css';

//Import from react-router-dom
import { Link } from 'react-router-dom';

const Category = () => {
  return (
    <div className={classes.category}>
      <p>Carefully created collections</p>
      <h3>Browse our categories</h3>
      <div className={classes.container}>
        <Link to='/shop'>
          <img src='/images/product_1.png' alt='smart-phone' />
        </Link>
        <Link to='/shop'>
          <img src='/images/product_2.png' alt='smart-phone' />
        </Link>
      </div>
      <div className={classes.container}>
        <Link to='/shop'>
          <img src='/images/product_3.png' alt='smart-phone' />
        </Link>
        <Link to='/shop'>
          <img src='/images/product_4.png' alt='smart-phone' />
        </Link>
        <Link to='/shop'>
          <img src='/images/product_5.png' alt='smart-phone' />
        </Link>
      </div>
    </div>
  );
};

export default Category;
