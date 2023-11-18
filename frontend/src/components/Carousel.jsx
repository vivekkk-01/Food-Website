import React, { useContext } from "react";
import cartContext from "../context/cart-context";

const Carousel = (props) => {
  // const cart = useContext(cartContext);
  const changeHandler = (event) => {
    props.searchInput(event.target.value);
  };
  return (
    <div
      id="carouselExampleFade"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
    >
      {/* <h1 className="text-white">{cart.items[0].price}</h1> */}
      <div className="carousel-inner">
        <div className="carousel-caption" style={{ zIndex: 10 }}>
          <div className=" w-100 d-flex">
            <input
              className="form-control mr-sm-2 bg-dark"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={changeHandler}
              style={{ color: "white" }}
            />
          </div>
        </div>
        <div className="carousel-item active">
          <img
            src="https://source.unsplash.com/random/100×100/?burger"
            alt="Burger"
            className="d-block w-100"
            style={{
              filter: "brightness(40%)",
              height: "650px",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://source.unsplash.com/random/100×100/?pizza"
            alt="Pizza"
            className="d-block w-100"
            style={{
              filter: "brightness(40%)",
              height: "650px",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://source.unsplash.com/random/100×100/?pasta"
            alt="Pasta"
            className="d-block w-100"
            style={{
              filter: "brightness(40%)",
              height: "650px",
              objectFit: "cover",
            }}
          />
        </div>
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
