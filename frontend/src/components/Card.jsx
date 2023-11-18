import React, { useState, useContext } from "react";
import cartContext from "../context/cart-context";

const Card = (props) => {
  const options = props.options;
  const optionObj = Object.keys(options);

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("half");

  const quantityHandler = (event) => {
    setQuantity(event.target.value);
  };

  const sizeHandler = (event) => {
    setSize(event.target.value);
  };

  const cart = useContext(cartContext);

  const price =
    `${options[`${!options[size] ? "regular" : size}`]}` * +quantity;
  const cartHandler = () => {
    cart.addCart({
      name: props.name,
      quantity: +quantity,
      price: +price,
      size: options[size] ? size : "regular",
      id: props.id,
    });
  };
  return (
    <div
      className="card m-4"
      style={{
        width: "19rem",
        maxHeight: "500px",
        height: "420px",
        background: "transparent",
        border: "1px solid gray",
        position: "relative",
        padding: 0,
      }}
    >
      <img
        className="card-img-top "
        src={props.img}
        alt="Card image cap"
        style={{ height: "180px", objectFit: "cover", width: "100%" }}
      />
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text">{props.description}</p>
        <div className="container w-100">
          <select
            className="h-100 m-2 bg-success rounded"
            style={{ outline: 0 }}
            onChange={quantityHandler}
            value={quantity}
          >
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
          <select
            className="h-100 m-2 bg-success rounded"
            style={{ outline: 0 }}
            onChange={sizeHandler}
            value={size}
          >
            {optionObj.map((item) => {
              return (
                <option value={item} id={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <div className="d-inline h-100 fs-5">₹{price}</div>
          <button className="btn btn-success m-2" onClick={cartHandler}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
