import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import lipsticks from "../assets/lipsticks.jpg";
import supermarket from "../assets/supermarket.jpg";
import technology from "../assets/technology.jpg";
import "../components/home.css"

const Home = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = async () => {
    try {
      const result = await axios.get("https://b7a2r32fmk.execute-api.eu-central-1.amazonaws.com/dev/allcategories");
      const updatedCategories = result.data.map((categoryItem) => {
        let imageURL;
        switch (categoryItem.name.toLowerCase()) {
          case "cosmetics":
            imageURL = lipsticks;
            break;
          case "food":
            imageURL = supermarket;
            break;
          case "electronics":
            imageURL = technology;
            break;
          default:
            imageURL = ""; //  default image 
            break;
        }
        return { ...categoryItem, imageURL };
      });
      setCategory(updatedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <div className="container">
      <div className="py-4">
        <div className="mt-3">
          <h1 style={{ fontFamily: "Roboto" }}>Cant find the One? </h1>
        </div>
        <hr />
        <div className="mt-5">
          <h2 style={{ fontFamily: "Roboto" }}>Main Categories</h2>
        </div>
        <div className="row mt-5">
          {category.map((categoryItem) => (
            <div key={categoryItem._id} className="col-md-4 mb-4">
              <div className="card border shadow">
                <img
                  src={categoryItem.imageURL}
                  className="card-img-top"
                  alt={`Image for ${categoryItem.name}`}
                />
                <div className="card-body">
                  <h5 className="card-title">{categoryItem.name}</h5>
                  <Link
                    className="btn btn-dark mr-2"
                    to={`/productcategory/${categoryItem._id}`}
                    >
                    {console.log(categoryItem._id)}
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
