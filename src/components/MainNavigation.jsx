//Import css module
import classes from "./MainNavigation.module.css";

//Import from react-router-dom
import { NavLink, useFetcher } from "react-router-dom";

//Import from react-redux
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth";

const MainNavigation = () => {
  //fetcher
  const fetcher = useFetcher();

  //dispatch
  const dispatch = useDispatch();

  //Get isAuthenticated state and userName
  const { isAuthenticated, userName } = useSelector((state) => state.auth);

  //Handle logout
  const logoutHandler = () => {
    //Activate logout action
    fetcher.submit(null, { action: "/logout", method: "post" });
    //dispatch set user and isLogin state from redux store
    dispatch(authActions.onLogout());
  };

  return (
    <div className={classes.nav}>
      <div>
        <nav>
          <div>
            <ul>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                  to="/"
                  end
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                  to="/shop"
                >
                  Shop
                </NavLink>
              </li>
            </ul>
          </div>
          <h1>BOUTIQUE</h1>
          <div>
            <ul>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                  to="/cart"
                >
                  <i className="fa-sharp fa-solid fa-cart-flatbed"></i> Cart
                </NavLink>
              </li>

              {!isAuthenticated && (
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? classes.active : undefined
                    }
                    to="/login"
                  >
                    <i className="fa-solid fa-user"></i>Login
                    {/* <i className='fa-solid fa-caret-down'></i> */}
                  </NavLink>
                </li>
              )}

              {isAuthenticated && (
                <li>
                  <NavLink
                    to="orders"
                    className={({ isActive }) =>
                      isActive ? classes.active : undefined
                    }
                  >
                    <i className="fa-solid fa-user"></i>
                    {userName}
                    <i
                      className={`fa-solid fa-caret-down ${classes.black}`}
                    ></i>
                  </NavLink>
                </li>
              )}

              {isAuthenticated && (
                <li onClick={logoutHandler} className={classes.logout}>
                  <p>(Logout)</p>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MainNavigation;
