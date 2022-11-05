import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../API";
import axios from "axios";
import { useSelector } from "react-redux";
import ReviewCard from "../components/ReviewCard";
import Loader from "../components/Loader";
import { motion } from "framer-motion";
import AddReview from "./AddReview";
import StarIcon from '@mui/icons-material/Star';
import VerifiedIcon from '@mui/icons-material/Verified';


export default function Product() {
  let { id } = useParams();
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const isAssignedToCurrentUser = true;
  const [modelShow, setModelShow] = useState(false);
  const [chooseDate,setChooseDate] = useState(false);
  const [reqDate,setReqDate] = useState();
  const fetchProduct = async () => {
    // try{

    const res = await axios.get(API + `/product/${id}`);
    setProduct(res.data);

    // }
    // catch(e){

    // }
  };

  const retriveProduct = async () => {
    setIsLoading(true);
    try {
      const res = await axios.delete(API + `/product/revoke?productid=${id}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setIsLoading(false);
        window.location.reload();
      }
    } catch (e) {
      alert("Not retrived");
    }
  };

  const deleteProduct = async () => {
    if (window.confirm("Are You Sure !!")) {
      setIsLoading(true);
      try {
        const res = await axios.delete(API + `/product/${id}`, {
          withCredentials: true,
        });
        if (res.status === 200) {
          setIsLoading(false);
          navigate("/explore");
        }
      } catch (e) {
        alert("Not Deleted");
      }
    }
  };

  const calcAge = (datePr) => {
    const now = Date.parse(datePr + " 00:00:00");
    const today = Date.now();

    const DAY = (today - now) / (1000 * 60 * 60 * 24);

    return Math.floor(DAY);
  };

  const addReview = () => {
    // navigate('/addreview',{state:product});
    setModelShow(true);
  };

  const sendRequest = async() => {

    if(!reqDate){
      alert("Please select the till date")
    }
    else{

      const reqBody = {
        tillDate:reqDate,
        prodId: product._id,
        prodName:product.title,
        prodImg:product.image,
        ownerId:product.renterid,
        ownerAvatar:product.renter.avatar,
        ownerName:product.renter.username
      }

      try{

        const res = await axios.post(API+'/request/request',reqBody,{withCredentials:true})

        if(res.status === 200){
          alert("request sent")
        }
      }
      catch(e){
        alert("Error Occured")
      }
    }

  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (product)
    return (
      <motion.div
        className="page productpage"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {modelShow && (
          <div className="popup">
            <div id="addReview">
              <AddReview closeModel={setModelShow} product={product} />
            </div>
          </div>
        )}

        {chooseDate && (
          <div className="popup">
            <div className="chooseDate">
            <svg onClick={()=>setChooseDate(false)} clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 8.933-2.721-2.722c-.146-.146-.339-.219-.531-.219-.404 0-.75.324-.75.749 0 .193.073.384.219.531l2.722 2.722-2.728 2.728c-.147.147-.22.34-.22.531 0 .427.35.75.751.75.192 0 .384-.073.53-.219l2.728-2.728 2.729 2.728c.146.146.338.219.53.219.401 0 .75-.323.75-.75 0-.191-.073-.384-.22-.531l-2.727-2.728 2.717-2.717c.146-.147.219-.338.219-.531 0-.425-.346-.75-.75-.75-.192 0-.385.073-.531.22z" fill-rule="nonzero"/></svg>
                <h2>Choose Date</h2>
                <input value={reqDate} onChange={(e)=>setReqDate(e.target.value)} type="date" name="" id="" />
                <button className="blue" onClick={()=>sendRequest()}>Send</button>
            </div>
          </div>
        )}
        <h1>{product.title}</h1>
        <div className="top">
          <div className="left">
            <img src={product.image} alt="" />
          </div>
          <div className="right">
            <div className="inRight">
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <div className="rating green">
                {" "}
                <StarIcon />
                {product.rating}
              </div>
              <div className="rent">
                <p>
                  <b>Rent : </b> {product.rent} {product.timeperiod}
                </p>
              </div>

              <div className="productAge">
                <p>
                  <b>Age of product : </b> {calcAge(product.age)} Days
                </p>
              </div>
            </div>

            <div className="actions">
              {product.renterid === user._id && !product.issued && (
                <button
                  className="blue"
                  onClick={() => navigate("/editProduct", { state: product })}
                >
                  Edit Product
                </button>
              )}
              {product.renterid === user._id && !product.issued && (
                <button
                  className="yellow"
                  onClick={() => navigate("/assignproduct", { state: product })}
                >
                  Assign Product
                </button>
              )}
              {product.renterid === user._id && product.issued && (
                <button className="red" onClick={() => retriveProduct()}>
                  Retrive Product
                </button>
              )}

              {product.renterid === user._id && !product.issued && (
                <button className="red" onClick={() => deleteProduct()}>
                  Delete Product
                </button>
              )}

              {product.borrowerid && product.borrowerid === user._id && (
                <button className="yellow" onClick={() => addReview()}>
                  Add Review
                </button>
              )}

              { 
                product.renterid !== user._id &&
                product.borrowerid !== user._id && (
                  <button className="yellow" onClick={() => setChooseDate(true)}>
                    Request product
                  </button>
                )}
            </div>
          </div>
        </div>

        <div className="bottom">
          <div className="ownerdetails ">
            <h2>Owner Details</h2>
            <div className="left">
              <img src={product.renter.avatar} alt="" />
            </div>
            <div className="right">
              <h2>{product.renter.username}</h2>
              <p>
                {product.renter.email}{" "}
                {product.renter.emailverified && (
                  <div className="verified">
                    {/* <i className="im im-check-mark-circle verified"></i> */}
                    <VerifiedIcon />
                  </div>
                )}
              </p>
              <p>
                {product.renter.mobile}
                
              </p>
            </div>
          </div>

          <div className="reviews">
            <h2>Reviews</h2>

            <div className="reviewlists">
              {product.reviews.length ? (
                <>
                  {product.reviews.map((rev) => (
                    <ReviewCard {...rev} />
                  ))}
                </>
              ) : (
                <b>No Reviews</b>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  else {
    return (
      <div className="page flex">
        <Loader />
      </div>
    );
  }
}
