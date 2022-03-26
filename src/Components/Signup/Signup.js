import React, { useState } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { toast } from 'react-toastify'
// import { FirebaseContext } from '../../store/firbaseContext';
import { useNavigate, Link } from 'react-router-dom';
//loading
import MoonLoader from "react-spinners/MoonLoader";
import { css } from "@emotion/react";

import { db } from '../../firebase/config';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore'

export default function Signup() {
  //States
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoding] = useState(false)

  const navigate = useNavigate();
  //getting context value
  // const { firebase } = useContext(FirebaseContext)



  const handleSubmit = (event) => {
    event.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        updateProfile(auth.currentUser, {
          displayName: username
        }).then(() => {
          setLoding(true);
          addDoc(collection(db, 'users'), {
            id: userCredential.user.uid,
            username: username,
            phone: phone
          })
            .then((response) => {
              // All clear time working function
              setLoding(false)
              toast.success('Registration Successfully')
              navigate('/login')
            }).catch((err) => {
              console.log(err)
            })

        }).catch((err) => {
          console.log(err)
        })

      }).catch((err) => {
        const errorMsg = err.message;
        toast.error(errorMsg);
      })
  }

  const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
  return (
    <div>
      {
        loading ? (
          <MoonLoader color={'#0D82F1'} loading={loading} css={override} size={50} />
        ) : (
          <div className="signupParentDiv">
            <img width="200px" height="200px" src={Logo} alt='olx logo'></img>
            <form onSubmit={handleSubmit}>
              <label htmlFor="fname">Username</label>
              <br />
              <input
                className="input"
                type="text"
                // id="fname"
                name="name"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <br />
              <label htmlFor="fname">Email</label>
              <br />
              <input
                className="input"
                type="email"
                // id="fname"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <br />
              <label htmlFor="lname">Phone</label>
              <br />
              <input
                className="input"
                type="number"
                // id="lname"
                name="phone"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
              <br />
              <label htmlFor="lname">Password</label>
              <br />
              <input
                className="input"
                type="password"
                // id="lname"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <br />
              <br />
              <button type='submit'>Signup</button>
            </form>
            <Link to='/login'>Login</Link>
          </div>
        )
      }

    </div>
  );
}
