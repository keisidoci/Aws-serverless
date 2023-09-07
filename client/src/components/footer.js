import React from 'react'
import "../components/footer.css"

const Footer = () => {
  return (
      <div className="text-center text-lg-start text-muted footer">

  <section className="d-flex justify-content-center p-4 border-bottom">
    <div>
      <a href="https://www.facebook.com/" className="me-4 link-light" id="socials" target='_blank'>
        <i className="fab fa-facebook-f"></i>
      </a>
      <a href="https://twitter.com/" className="me-4 link-light" id="socials" target='_blank'>
        <i className="fab fa-twitter"></i>
      </a>
      <a href="https://www.instagram.com/" className="me-4 link-light" id="socials" target='_blank'>
        <i className="fab fa-instagram"></i>
      </a>
      <a href="https://www.linkedin.com/" className="me-4 link-light" id="socials" target='_blank'>
        <i className="fab fa-linkedin"></i>
      </a>
    </div>
  </section>

  <section className="">
    <div className="container">
      <div className="row mt-3">
        <div className="col-sm-12 col-md-12 col-lg-12 mt-3 mb-4">
          <h5 className="text-uppercase fw-bold mb-4 home" style={{ fontFamily: "Roboto" }}>
            <i className="fas fa-gem me-3 text-light"></i>Find the One
          </h5>
         <a href="/" className="link-light home links"> <h6 className="fw-bold mb-4" style={{ fontFamily: "Roboto" }}>
            Home
          </h6>
          </a>
          <a href="/product" className="link-light home"> <h6 className="fw-bold mb-4" style={{ fontFamily: "Roboto" }}>
            Products
          </h6>
          </a>
        </div>
        </div>
        </div>
  </section>

  <div className="text-center p-4" style={{ color:"white" }}>
    © 2023 Copyright: All rights reserved 
  </div>


</div>
  )
}

export default Footer
