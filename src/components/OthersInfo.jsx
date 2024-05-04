import React, { useState } from 'react';

//Import css module
import classes from './OthersInfo.module.css';

const OthersInfo = () => {
  //email state
  const [enteredEmailValue, setEnteredEmailValue] = useState('');

  //handle email change func
  const emailInputChange = (e) => {
    setEnteredEmailValue(e.target.value);
  };

  //email submit
  const emailSubmit = (e) => {
    e.preventDefault();
    setEnteredEmailValue('');
  };

  return (
    <div className={classes['others-info']}>
      <div className={classes.freeship}>
        <div>
          <h3>Free Shipping</h3>
          <p>Free shipping worlwide</p>
        </div>
        <div>
          <h3>24 X 7 service</h3>
          <p>Free shipping worlwide</p>
        </div>
        <div>
          <h3>Festival offer</h3>
          <p>Free shipping worlwide</p>
        </div>
      </div>
      <div className={classes.contact}>
        <div>
          <h3>Let's be friends!</h3>
          <p>Nisi nisi tempor consequat laboris nisi.</p>
        </div>
        <div>
          <form onSubmit={emailSubmit}>
            <input
              type='email'
              placeholder='Enter your email address'
              onChange={emailInputChange}
              value={enteredEmailValue}
            />
            <button>Subscribe</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OthersInfo;
