import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Logo from '../../olx-logo.png';
import './Login.css';

//firbase imporings
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';

//loading
import MoonLoader from "react-spinners/MoonLoader";
import { css } from "@emotion/react";

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoding] = useState(false)

  const navigate = useNavigate();
  const auth = getAuth();

  //sumbit functionality
  const handleSubmit = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLoding(true);
        setTimeout(() => {
          setLoding(false)
          toast.success('Login successfully')
          navigate('/')
        }, 1000);
      }).catch((err) => {
        toast.error(err.message)
        console.log(err.message);
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
          <div className="loginParentDiv">
            <img width="200px" height="200px" src={Logo} alt='olx logo'></img>
            <form onSubmit={handleSubmit}>
              <label htmlFor="fname">Email</label>
              <br />
              <input
                className="input"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <label htmlFor="lname">Password</label>
              <br />
              <input
                className="input"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <br />
              <button>Login</button>
            </form>
            <Link to='/signup'>Signup</Link>
          </div >
        )
      }

    </div >
  );
}

export default Login;
