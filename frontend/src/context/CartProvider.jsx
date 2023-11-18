import { useReducer } from "react";
import CartContext from "./cart-context";

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const existingItem = state.totalItems.find(
      (item) => item.id === action.data.id
    );
    const existingItemIndex = state.totalItems.findIndex(
      (item) => item.id === action.data.id
    );
    if (!existingItem) {
      return {
        totalItems: [
          ...state.totalItems,
          {
            name: action.data.name,
            id: action.data.id,
            price: +action.data.price,
            quantity: +action.data.quantity,
            size: action.data.size,
          },
        ],
      };
    } else {
      const existingSize = state.totalItems.find(
        (item) => item.id === action.data.id && item.size === action.data.size
      );
      if (!existingSize) {
        console.log("size");
        return {
          totalItems: [
            ...state.totalItems,
            {
              name: action.data.name,
              id: action.data.id,
              price: +action.data.price,
              quantity: +action.data.quantity,
              size: action.data.size,
            },
          ],
        };
      } else {
        const existingSizeIndex = state.totalItems.findIndex(
          (item) => item.size === action.data.size && item.id === action.data.id
        );
        console.log(existingSize.quantity);
        let updatedItem = {
          ...existingSize,
          quantity: existingSize.quantity + action.data.quantity,
          price: existingSize.price + action.data.price,
        };
        let updatedItems = [...state.totalItems];
        updatedItems[existingSizeIndex] = updatedItem;
        return {
          totalItems: [...updatedItems],
        };
      }
    }
  }
  if (action.type === "REMOVE") {
    let updatedItems = state.totalItems.filter((item) => item.id !== action.id);
    return {
      totalItems: [...updatedItems],
    };
  }
};

const CartProvider = (props) => {
  const [cart, dispatchCart] = useReducer(cartReducer, {
    totalItems: [],
  });

  const addCartHandler = (cartData) => {
    dispatchCart({ type: "ADD", data: cartData });
  };

  const removeCartHandler = (itemId) => {
    dispatchCart({ type: "REMOVE", id: itemId });
  };

  const cartContext = {
    totalItems: cart.totalItems,
    removeCartData: removeCartHandler,
    addCart: addCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
