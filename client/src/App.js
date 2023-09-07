import { Amplify } from "aws-amplify"
import awsconfig from "./aws-exports"
import React, {useState} from "react"
import { Auth } from "aws-amplify"
import "./App.css"
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import Navbar from "./components/Navbar"
import Footer from "../src/components/footer"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom"
import Home from "./components/Home"
import ViewProductCategory from "./components/ViewCategory"
import Products from "./components/Products"
import AddProduct from "./components/AddProduct"
import EditProduct from "./components/EditProduct"
import { ToastContainer } from "react-toastify"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import Login from "./components/Auth/Login"
import EntryPage from "./components/Pages/EntryPage"
import { useEffect } from "react"
library.add(faStar)


Amplify.configure({awsconfig})

function App(props) {
  const [authenticated, setAuthenticated] = useState(false);
  const checkAuthenticated = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    } catch (error) {
      setAuthenticated(false);
    }
  };
  useEffect(() => {
    checkAuthenticated()
  }, [])
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          {authenticated ? <Route exact path="/" component={Home}/> : <Route exact path="/" component={EntryPage}/>}
          <Route
            exact
            path="/productcategory/:id"
            component={ViewProductCategory}
          ></Route>
          <Route exact path="/signup" component={Login}></Route>
          <Route exact path="/product" component={authenticated ? Products : EntryPage}></Route>
          <Route exact path="/add" component={authenticated ? AddProduct : EntryPage}></Route>
          <Route exact path="/edit/:id" component={authenticated ? EditProduct : EntryPage}></Route>
          <Redirect to="/" />
        </Switch>
        <Footer />
        <ToastContainer />
      </div>
    </Router>
  )
}

export default App
