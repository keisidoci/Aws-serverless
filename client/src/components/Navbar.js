import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [givenName,setGivenName] = useState("");
  const [lastName,setLastName] = useState("");

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton()
    userInfo()
    checkAuthenticated()
  }, []);
  
  const userInfo = async () => {
    const userinfo = Auth.currentUserInfo();
    return userinfo;
  }
  window.addEventListener('resize', showButton);

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

  Auth.currentUserInfo()
    .then(userInfo => {
      if (userInfo && userInfo.attributes && userInfo.attributes.given_name) {
        const givenName = userInfo.attributes.given_name;
        const lastName = userInfo.attributes.family_name;
        setLastName(lastName)
        console.log(`Given Name: ${givenName}`);
        setGivenName(givenName);
        setAuthenticated(true)
      } else {
        console.log('Given name not found in user info');
      }
    })
    .catch(error => {
      console.error('Error getting user info:', error);
    })

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu} style={{ fontFamily: "Roboto" }}>
            Find the One
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu} style={{ fontFamily: "Roboto" }}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/product'
                className='nav-links'
                onClick={closeMobileMenu}
                style={{ fontFamily: "Roboto" }}
              >
                Products
              </Link>
            </li>
            {authenticated ?
      (
            <li className='nav-item'>
              <Link
                to='/signup'
                className='nav-links'
                onClick={closeMobileMenu}
                style={{ fontFamily: "Roboto" }}
              >
                {givenName} {lastName}
              </Link>
            </li>

      ) : (<li className='nav-item'>
      <Link
        to='/signup'
        className='nav-links'
        onClick={closeMobileMenu}
      >
        Join now!
      </Link>
    </li>)
      }
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;