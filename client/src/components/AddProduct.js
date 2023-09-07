import React, { useState, useEffect } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import addP from "../assets/addP.png"
import "../components/add.css"

const AddProduct = () => {
  let history = useHistory()
  const [product, setProduct] = useState({
    typology: "",
    description: "",
    categoryId: "", 
  })
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://b7a2r32fmk.execute-api.eu-central-1.amazonaws.com/dev/allcategories")
        setCategories(response.data)
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }
    fetchCategories()
  }, [])

  const { typology, description, categoryId } = product // Destructure categoryId
  const onInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("https://b7a2r32fmk.execute-api.eu-central-1.amazonaws.com/dev/product", product) 
      toast.success("Product added successfully")
      history.push("/")
    } catch (error) {
      toast.error("Error occurred while adding the product")
    }
  }

  return (
    <div className="container mt-5">
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-6 form">
          <div className="card-body">
            <h2 className="text-center mb-4">Add A Product</h2>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter name/type"
                  name="typology"
                  value={typology}
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>
              <div className="form-group mt-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter a description"
                  name="description"
                  value={description}
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>
              <select
                className="form-select mt-5"
                aria-label="Default select example"
                name="categoryId"
                value={categoryId}
                onChange={(e) => onInputChange(e)}
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <button className="btn btn-dark btn-block mt-5">Add Product</button>
            </form>
          </div>
        </div>
        <div className="col-md-6 ">
          <img src={addP} className="img-fluid rounded-start cardImg" alt="Product" />
        </div>
      </div>
    </div>
  </div>
  )
}

export default AddProduct
