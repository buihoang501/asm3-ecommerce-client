import React from 'react';

//Import css module
import classes from './Footer.module.css';

const Footer = () => {
  return (
    <div className={classes.footer}>
      <footer>
        <div>
          <h2>Customer services</h2>
          <div>
            <p>
              <a href='/#'>Help & Contact Us</a>
            </p>
            <p>
              <a href='/#'>Returns & Refunds</a>
            </p>
            <p>
              <a href='/#'>Online Stores</a>
            </p>
            <p>
              <a href='/#'>Terms & Conditions</a>
            </p>
          </div>
        </div>

        <div>
          <h2>Company</h2>
          <div>
            <p>
              <a href='/#'>What We Do</a>
            </p>
            <p>
              <a href='/#'>Available Services</a>
            </p>
            <p>
              <a href='/#'>Latest Posts</a>
            </p>
            <p>
              <a href='/#'>FAQs</a>
            </p>
          </div>
        </div>
        <div>
          <h2>Social Media</h2>
          <div>
            <p>
              <a href='/#'>Twitter</a>
            </p>
            <p>
              <a href='/#'>Instagram</a>
            </p>
            <p>
              <a href='/#'>Facebook</a>
            </p>
            <p>
              <a href='/#'>Pinterest</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
