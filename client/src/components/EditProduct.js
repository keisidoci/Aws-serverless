import React, { useState, useEffect } from "react"
import axios from "axios"
import { useHistory, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import addP from "../assets/addP.png"
import "../components/add.css"

const EditProduct = () => {
  let history = useHistory()
  const { id, categoryId } = useParams()
  const [product, setProduct] = useState({
    typology: "",
    description: "",
    categoryId: "", 
  })
  const [categories, setCategories] = useState([])

  const { typology, description } = product
  const onInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

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
    loadProduct()
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    await axios.put(`https://b7a2r32fmk.execute-api.eu-central-1.amazonaws.com/dev/product/${id}`, product)
    toast.success("Product edited successfully")
    history.push("/")
  }

  const loadProduct = async () => {
    try {
      const result = await axios.get(`https://b7a2r32fmk.execute-api.eu-central-1.amazonaws.com/dev/product/${id}`)
      setProduct(result.data)
    } catch (error) {
      console.error("Error loading product:", error)
    }
  }
  return (
    <div className="container mt-5">
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-6 form">
          <div className="card-body">
            <h2 className="text-center mb-4">Edit A Product</h2>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Edit name/type"
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
                  placeholder="Edit description"
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
              <button className="btn btn-dark btn-block mt-5">Edit Product</button>
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

export default EditProduct
