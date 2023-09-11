import React, { useState, useEffect } from "react"
import { Auth } from "aws-amplify"
import axios from "axios"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Modal from "./Modal"
import Star from "./Star"
import "./Product.css"
import ReactPaginate from "react-paginate"

const Products = () => {
  const [showModal, setShowModal] = useState(false)
  const [idToDelete, setIdToDelete] = useState("")
  const [products, setProducts] = useState([])
  const [productPages, setProductPages] = useState([])
  const [authenticated, setAuthenticated] = useState(false);
  const [givenName,setGivenName] = useState("");

  useEffect(() => {
    loadProducts()
    loadPages()
    checkAuthenticated()
  }, [])

  const checkAuthenticated = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }

      const userAttributes = user.attributes || {};
      const userGivenName = userAttributes.given_name || "";
      setGivenName(userGivenName);
    } catch (error) {
      setAuthenticated(false);
    }
  };

  const loadPages = async() => {
    try {
      const response = await axios.get("https://b7a2r32fmk.execute-api.eu-central-1.amazonaws.com/dev/allproduct")
      setProducts(response.data)
    } catch (error) {
      console.error("Error fetching products", error)
    }
  }

  const handlePageClick = async (data) => {
    let currentPage = data.selected +1
    loadProducts(currentPage)
    console.log(products.length)
    const totalPages = Math.ceil(products.length/6)
    if (currentPage <= totalPages){
      loadProducts(currentPage)
    }else{
      console.log("Invalid page clicked")
    }
  }
  const loadProducts = async (currentPage) => {
    try {
      let response = await axios.get(`https://b7a2r32fmk.execute-api.eu-central-1.amazonaws.com/dev/allproduct?page=${currentPage}&limit=6` )
      setProductPages(response.data)
    } catch (error) {
      console.error("Error fetching products", error)
    }
  }
  

  const toDeleteProduct = (id) => {
    setShowModal(true)
    setIdToDelete(id)
  }

  const onCancelDelete = () => {
    setShowModal(false)
    setIdToDelete("")
  }
  
  const deleteProduct = async (id) => {
    setShowModal(false)
    try {
      await axios.delete(`https://b7a2r32fmk.execute-api.eu-central-1.amazonaws.com/dev/product/${id}`)
      toast.success("Product deleted successfully")
      loadProducts()
    } catch (error) {
      toast.error("An error occurred while deleting the product")
    }
  }

  return (
    <div className="card">
      <div className="container ">
      <Link className="btn btn-dark mb-3 mt-3 icon" to="/"> 
      <i class="fa-solid fa-arrow-left-long"></i> 
      </Link>
        <Link className="btn btn-dark add" to="/add">
          Add product
        </Link>
      </div>
      <table className="table border shadow costum">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Products</th>
            <th>Description</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {productPages.map((product, index) => (
            <tr key={product._id}>
              <th scope="row">{index + 1}</th>
              <td>{product.typology}</td>
              <td>{product.description}</td>
              <td>
                <Star
                productId={product._id}
                  rating={product.rating}
                  onRating={(rate) => console.log(rate)}
                />
                <p></p>
              </td>
              <td>
                <div className="options">
                <Link
                  className="btn btn-outline-dark mr-2 mt-5"
                  to={`/edit/${product._id}`}
                >
                  Edit
                </Link>
                {authenticated ? (
                <button
                  className="btn btn-dark mr-3 mt-5"
                  onClick={() => toDeleteProduct(product._id)}
                >
                  Delete
                </button> ) : null }
                </div>
                </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <Modal
          isOpen={showModal}
          onCancel={onCancelDelete}
          onConfirm={() => deleteProduct(idToDelete)}
        />
      )}
      <ReactPaginate
        previousLabel={"<<"}
        nextLabel={">>"}
        breakLabel={"..."}
        pageCount={Math.ceil(products.length/6)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName=" page-link"
        previousClassName="page-link"
        nextClassName=" page-link"
        breakLinkClassName="page-link"
        // activeClassName="active"
        activeLinkClassName="active-link"
      />
    </div>
  )
}

export default Products