import { Amplify, Hub } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import "./auth.css"
import { Link } from "react-router-dom"
import '@aws-amplify/ui-react/styles.css';
import achievment from "../../assets/achievement.png"

import awsExports from '../../aws-exports';
import { useEffect } from 'react';
Amplify.configure(awsExports);

export default function Login() {
  
  useEffect(() => {
    Hub.listen("auth",(data) => {
      const {payload} = data
      if(payload.event === "signIn"){
        window.location.reload()
      }
    })
  }, [])
  const handleSignOut = () => {
    Auth.signOut().then(() => {
      window.location.reload()
    })
  }
  return (
    <div className='user-dash-container' style={{ backgroundImage: `url(${achievment})` }}>
        <Authenticator signUpAttributes={["given_name", "family_name"]}>
      {({ signOut, user }) => (
        <main style={{ fontFamily: "Roboto" }}>
          <h1>Hello {user.attributes.given_name}</h1>
          {console.log(user.given_name)}
          <div className='signout'>
          <Link to="/entrypage"><button className="button">Start now</button></Link>
          <button className="button" onClick={handleSignOut}>Sign out</button>
          </div>
        </main>
      )}
    </Authenticator>
      </div>
  );
}
