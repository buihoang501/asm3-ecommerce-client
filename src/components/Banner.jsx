import React from 'react';

//Import from react-router-dom
import { Link } from 'react-router-dom';

//Import css module
import classes from './Banner.module.css';

const Banner = () => {
  return (
    <div className={classes.banner}>
      <div className={classes.container}>
        <div>
          <p>New Inspiration 2020</p>
          <h2>20% Off On New Season</h2>
          <Link to='/shop'>Browse collections</Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
