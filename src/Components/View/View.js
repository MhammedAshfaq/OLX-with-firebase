import React, { useState, useEffect, useContext } from 'react';
import { PostContext } from '../../store/productContext'
// import { useNavigate } from 'react-router-dom'
import { db } from '../../firebase/config'
import { collection, where, query, getDocs } from 'firebase/firestore'

import './View.css';
function View() {
  const [userDetails, setUserDetails] = useState()
  const { postDetails } = useContext(PostContext)
  // const navigate = useNavigate();

  useEffect(async () => {
    const { userId } = postDetails
    const q = query(collection(db, 'users'), where("id", "==", userId));
    const querySnapshort = await getDocs(q)
    querySnapshort.forEach((doc) => {
      // console.log(doc.id, "+>", doc.data())
      // console.log(doc.data())
      setUserDetails(doc.data())
    })
  }, [])

  return (
    <div>
      {
        postDetails ? (
          <div className="viewParentDiv">
            <div className="imageShowDiv">
              <img style={{ objectFit: 'contain' }}
                src={postDetails.url}
                alt={postDetails.name}
              />
            </div>
            <div className="rightSection">
              <div className="productDetails">
                <p>&#x20B9; {postDetails.price} </p>
                <span>{postDetails.name}</span>
                <p>{postDetails.category}</p>
                <span>{postDetails.createdAt}</span>
              </div>
              <div className="contactDetails">
                <p>Seller details</p>
                <p>{userDetails ? userDetails.username : "Plase Wait"}</p>
                <p>{userDetails ? userDetails.phone : "Plaese Wiat"}</p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h1>Somthing Error, Network Error</h1>
          </div>
        )
      }

    </div>
  );
}
export default View;
