import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import cartContext from "../context/cart-context";
import Modal from "../UI/Modal";
import Cart from "./Cart";

const Navbar = () => {
  const [showCart, setShowCart] = useState(false);
  const data = useContext(cartContext).totalItems;
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <Link className="navbar-brand  fs-1" to="/">
          GoFood
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item">
              <Link className="nav-link active fs-4" aria-current="page" to="/">
                Home
              </Link>
            </li>
          </ul>

          <div className="d-flex">
            {!localStorage.getItem("authToken") && (
              <>
                <Link className="btn bg-white text-success mx-1" to="/login">
                  Login
                </Link>
                <Link className="btn bg-white text-success mx-1" to="/signup">
                  Signup
                </Link>
              </>
            )}
            {localStorage.getItem("authToken") && (
              <>
                <button
                  className="btn bg-white text-success mx-1"
                  to="/login"
                  onClick={() => setShowCart(true)}
                >
                  My Cart{" "}
                  <Badge pill bg="danger">
                    {data.length > 0
                      ? data.reduce(
                          (initialVal, { quantity }) => quantity + initialVal,
                          0
                        )
                      : ""}
                  </Badge>
                </button>
                <button
                  className="btn bg-white text-danger mx-1"
                  to="/signup"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {showCart && (
        <Modal onClose={() => setShowCart(false)}>
          <Cart />
        </Modal>
      )}
    </nav>
  );
};

export default Navbar;
