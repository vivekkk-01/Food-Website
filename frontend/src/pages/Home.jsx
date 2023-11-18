import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousel from "../components/Carousel";

const Home = () => {
  const [search, setSearch] = useState("");
  const data = useLoaderData();
  const itemData = data.data;
  const foodCatData = data.catData;
  const searchData = (value) => {
    setSearch(value);
  };
  return (
    <>
      <Navbar />
      <Carousel searchInput={searchData} />
      <div className="w-100 m-3">
        {foodCatData.map((cat) => {
          return (
            <div className="row mb-3" key={cat._id}>
              {cat.CategoryName.toLowerCase().includes(
                search.toLowerCase()
              ) && <h3 key={cat._id}>{cat.CategoryName}</h3>}

              {itemData
                .filter(
                  (item) =>
                    item.CategoryName === cat.CategoryName &&
                    (item.CategoryName.toLowerCase().includes(
                      search.toLowerCase()
                    ) ||
                      item.name.toLowerCase().includes(search.toLowerCase()))
                )
                .map((data) => {
                  return (
                    <Card
                      id={data._id}
                      key={data._id}
                      name={data.name}
                      img={data.img}
                      options={data.options[0]}
                      description={data.description}
                    />
                  );
                })}
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
};

export default Home;

export const loader = async () => {
  const response = await fetch("https://gofood-backend-8dqe.onrender.com/food-data");
  if (!response.ok) {
    console.log(response);
  } else {
    return response;
  }
};
