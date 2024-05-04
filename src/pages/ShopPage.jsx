import React, { useState, useEffect } from 'react';

//Import css module
import classes from './ShopPage.module.css';

//Import from react-router-dom
import { Link, useSearchParams, useRouteLoaderData } from 'react-router-dom';
import ProductList from '../components/ProductList';

const ShopPage = () => {
  //using useSearchParams hook
  const [searchParams, setSearchParams] = useSearchParams();

  //data response from api
  const data = useRouteLoaderData('products');

  //create category state
  const [category, setCategory] = useState([]);

  //search state
  const [searchValue, setSearchValue] = useState('all');

  //set default value category

  //Handle useEffect
  useEffect(() => {
    //set search value
    if (searchParams.get('mode')) {
      setSearchValue(searchParams.get('mode'));
    }

    //default case
    if (searchValue !== 'all') {
      //filtering data array depends on category
      const filterData = data.filter(
        (product) => product.category === searchValue
      );

      setCategory(filterData);
    } //specific case
    else {
      setCategory(data);
    }
  }, [data, searchValue, searchParams]);

  //right className
  const rightClassName =
    searchValue !== 'all' && category.length !== 0
      ? `${classes.right} ${classes.column}`
      : classes.right;

  return (
    <div className={classes.shop}>
      <div className={classes['shop-banner']}>
        <h2>Shop</h2>
        <p>Shop</p>
      </div>
      <div className={classes.categories}>
        <div className={classes.top}>
          <div>
            <h3>Categories</h3>
            <input type='text' placeholder='Enter Search Here!' />
          </div>
          <div className={classes.select}>
            <select>
              <option value='default'>Default sorting</option>
            </select>
          </div>
        </div>
        <div className={classes.bottom}>
          <div className={classes.left}>
            <h4>Apple</h4>
            <ul>
              <li>
                <Link
                  to='/shop?mode=all'
                  className={searchValue === 'all' ? classes.active : undefined}
                >
                  All
                </Link>
              </li>
            </ul>
            <h5>Iphone & Mac</h5>
            <ul>
              <li>
                <Link
                  to='/shop?mode=iphone'
                  className={
                    searchValue === 'iphone' ? classes.active : undefined
                  }
                >
                  IPhone
                </Link>
              </li>
              <li>
                <Link
                  to='/shop?mode=ipad'
                  className={
                    searchValue === 'ipad' ? classes.active : undefined
                  }
                >
                  Ipad
                </Link>
              </li>
              <li>
                <Link
                  to='/shop?mode=macbook'
                  className={
                    searchValue === 'macbook' ? classes.active : undefined
                  }
                >
                  Macbook
                </Link>
              </li>
            </ul>
            <h5>Wireless</h5>
            <ul>
              <li>
                <Link
                  to='/shop?mode=airpod'
                  className={
                    searchValue === 'airpod' ? classes.active : undefined
                  }
                >
                  Airpod
                </Link>
              </li>
              <li>
                <Link
                  to='/shop?mode=watch'
                  className={
                    searchValue === 'watch' ? classes.active : undefined
                  }
                >
                  Watch
                </Link>
              </li>
            </ul>
            <h5>Other</h5>
            <ul>
              <li>
                <Link
                  to='/shop?mode=mouse'
                  className={
                    searchValue === 'mouse' ? classes.active : undefined
                  }
                >
                  Mouse
                </Link>
              </li>
              <li>
                <Link
                  to='/shop?mode=keyboard'
                  className={
                    searchValue === 'keyboard' ? classes.active : undefined
                  }
                >
                  Keyboard
                </Link>
              </li>
              <li>
                <Link
                  to='/shop?mode=other'
                  className={
                    searchValue === 'other' ? classes.active : undefined
                  }
                >
                  Other
                </Link>
              </li>
            </ul>
          </div>
          <div className={rightClassName}>
            {/* No category found */}
            {category.length === 0 && (
              <>
                <div></div>
                {/* Pagination */}
                <div className={classes.pagination}>
                  <span>&lt;&lt;</span>
                  <span>&gt;&gt;</span>
                  <p>Showing 1-9 of 0 results</p>
                </div>
              </>
            )}
            {/* All categories */}
            {searchValue === 'all' && category && category.length > 0 && (
              <ProductList data={category} />
            )}
            {/* Case type category*/}
            {searchValue !== 'all' && category && category.length > 0 && (
              <>
                <ProductList data={category} />

                {/* Pagination */}
                <div className={classes.pagination}>
                  <span>&lt;&lt;</span>
                  <span className={classes['page-number']}>1</span>
                  <span>&gt;&gt;</span>
                  <p>Showing 1-9 of 9 results</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
