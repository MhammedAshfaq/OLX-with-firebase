import React, { Fragment, useState, useContext } from 'react';
import './Create.css';
import { useNavigate } from 'react-router-dom'
import Header from '../Header/Header';
import { toast } from 'react-toastify';
import { AuthContext, FirebaseContext } from '../../store/Context'

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase/config'

//loading
import MoonLoader from "react-spinners/MoonLoader";
import { css } from "@emotion/react";

const Create = () => {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState()
  const [image, setImage] = useState(null)
  const date = new Date();
  const [loading, setLoding] = useState(false)


  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);

  const storage = getStorage(firebase)

  const handleSubmit = () => {
    if (!name || !price || !category || !image) {
      toast.warning("Please fill the form , not requred")
    } else {
      setLoding(true)
      const imageRef = ref(storage, `/images/${image.name}`);
      uploadBytes(imageRef, image)
        .then(() => {
          getDownloadURL(imageRef)

            .then((url) => {
              //inserting firestore produvt details
              addDoc(collection(db, "products"), {
                name,
                category,
                price,
                url,
                userId: user.uid,
                createdAt: date.toDateString()
              })

                .then(() => {
                  setLoding(false)
                  navigate('/')
                }).catch((err) => {
                  toast.error(err.messsage)
                })

            }).catch((err) => {
              console.log("error getting the image url", err.message)
              toast.error(err.message)
            })

        }).catch((err) => {
          console.log(err.message)
        })
    }
  }

  const override = css`
  display: block;
  margin:0 auto;
  border-color: red;
`;
  console.log(loading)
  return (
    <div>
      {
        loading ? (
          <MoonLoader color={'#0D82F1'} loading={loading} css={override} size={100} />
        ) : (
          <Fragment>
            <Header />
            <card>
              <div className="centerDiv">
                <label htmlFor="fname">Name</label>
                <br />
                <input
                  className="input"
                  type="text"
                  name="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <br />
                <label htmlFor="fname">Category</label>
                <br />
                <input
                  className="input"
                  type="text"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
                <br />
                <label htmlFor="fname">Price</label>
                <br />
                <input
                  className="input"
                  type="number"
                  name="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <br />
                <br />
                <img style={{ marginBottom: '20px', objectFit: 'cover' }} alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
                <br />
                <input onChange={(e) => setImage(e.target.files[0])} type="file" />
                <br />
                <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
              </div>
            </card>
          </Fragment>
        )
      }

    </div>

  );
};

export default Create;
