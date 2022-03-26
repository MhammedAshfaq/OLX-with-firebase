import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../store/Context'
import { getAuth, signOut } from 'firebase/auth'
import { toast } from 'react-toastify';


function Header() {
  const { user } = useContext(AuthContext)
  const auth = getAuth();
  const navigate = useNavigate();

  //Signout function
  const handleSignout = () => {
    signOut(auth).then((res) => {
      navigate('/login')
    }).catch((err) => {
      toast.error(err.message)
    })

  }
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {
            user ? user.displayName
              :
              <Link style={{ color: 'black', fontWeight: 500 }} to='/login'>Login</Link>
          }
          <hr />
        </div>

        {
          user ? <div onClick={handleSignout} style={{ backgroundColor: '#ffff', padding: '5px', borderRadius: '3px', fontWeight: 'bold', cursor: 'pointer' }}>
            <span>Logout</span>
          </div>
            : ""
        }

        <div className="sellMenu">
          <Link to='/create'>
            <SellButton></SellButton>
            <div className="sellMenuContent">
              <SellButtonPlus></SellButtonPlus>
              <span>SELL</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
