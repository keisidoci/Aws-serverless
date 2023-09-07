import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "../components/category.css"
import Average from "./Average";

const ViewProductCategory = () => {
  const [productCategory, setProductCategory] = useState({
    category: "",
    product: [],
  });
  const { id } = useParams();

  useEffect(() => {
    loadProductCategory();
  }, []);

  const loadProductCategory = async () => {
    try {
      console.log({id})
      const res = await axios.get(`https://b7a2r32fmk.execute-api.eu-central-1.amazonaws.com/dev/productcategory/${id}`);
      setProductCategory(res.data);
      console.log(res.data)
    } catch (error) {
      console.error("Error loading category:", error);
    }
  };

  return (
    <div className="container py-4">
      <Link className="btn btn-dark mb-3 mt-3 icon" to="/"> 
      <i class="fa-solid fa-arrow-left-long"></i> 
      </Link>
      <h1 className="display-4">Products on this Category: {productCategory.category ? productCategory.category.name :
       <div class="spinner-grow" role="status" style={{width:"40px",height:"40px"}}>
      <span class="visually-hidden">Loading...</span></div>}
      </h1>
      <hr />
      <table className="table border shadow mt-5">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product</th>
              <th>Description</th>
              <th>Average rating</th>
            </tr>
          </thead>
          <tbody>
          {productCategory.product ? (
    productCategory.product.map((product, index) => (
      console.log(productCategory.product.id),
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{product.typology}</td>
        <td>{product.description}</td>
        <td><Average productId={product._id}/></td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="3">Loading...</td>
    </tr>
  )}
          </tbody>
        </table>
    </div>
  );
};

export default ViewProductCategory;
