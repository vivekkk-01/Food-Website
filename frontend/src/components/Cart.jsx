import React, { useContext } from "react";
import cartContext from "../context/cart-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  const data = useContext(cartContext).totalItems;
  const removeCartData = useContext(cartContext).removeCartData;
  const totalPrice = data.reduce(
    (initialVal, { price }) => initialVal + price,
    0
  );
  const deleteItemHandler = (id) => {
    console.log(id);
    removeCartData(id);
  };
  const handleCheckOut = () => {};
  return (
    <div className="container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md">
      {data.length === 0 && <h2>No Food Items in the Cart!</h2>}
      {data.length > 0 && (
        <>
          <table className="table">
            <thead className="text-success fs-4">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Option</th>
                <th scope="col">Amount</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody className="text-white fs-1">
              {data.map((food, index) => (
                <tr style={{ fontSize: "1.34rem" }} key={food}>
                  <th scope="row">{index + 1}</th>
                  <td>{food.name}</td>
                  <td>{food.quantity}</td>
                  <td>{food.size}</td>
                  <td>{food.price}</td>
                  <td>
                    <button
                      type="button"
                      className="btn p-0"
                      onClick={deleteItemHandler.bind(null, food.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} color="white" size="lg"/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h1 className="fs-2">Total Price: {totalPrice}/-</h1>
          <button className="btn bg-success mt-5 " onClick={handleCheckOut}>
            {" "}
            Check Out{" "}
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
