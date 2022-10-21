import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../API";
import axios from "axios";
import { useSelector } from "react-redux";
import ReviewCard from "../components/ReviewCard";
import Loader from '../components/Loader'
import {motion} from 'framer-motion'
import AddReview from './AddReview'
export default function Product() {
  let { id } = useParams();
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [product, setProduct] = useState();
  const [isLoading,setIsLoading] = useState(false);
  const isAssignedToCurrentUser = true; 
  const [modelShow , setModelShow] = useState(false);
  const fetchProduct = async () => {
    // try{

    const res = await axios.get(API + `/product/${id}`);
    setProduct(res.data);

    // }
    // catch(e){

    // }
  };

  const retriveProduct = async() =>{

    setIsLoading(true)
    try{

      const res = await axios.delete(API+`/product/revoke?productid=${id}`,{withCredentials:true})
      if(res.status === 200)
      {
        setIsLoading(false);
        window.location.reload()
      }
    }
    catch(e){
      alert("Not retrived")
    }

  }
  
  const deleteProduct = async() =>{

    if(window.confirm("Are You Sure !!")){

    setIsLoading(true)
    try{

      const res = await axios.delete(API+`/product/${id}`,{withCredentials:true})
      if(res.status === 200)
      {
        setIsLoading(false);
        navigate('/explore')
      }
    }
    catch(e){
      alert("Not Deleted")
    }

  }


  }
  
  const calcAge = (datePr) =>{
    const now = Date.parse(datePr + " 00:00:00")
    const today = Date.now();


    
    

    const DAY = ((today-now)/(1000*60 *60 * 24)) ;

    return Math.floor(DAY);
  }

  const addReview = ()=>{
    // navigate('/addreview',{state:product});
    setModelShow(true)
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  if (product)
    return (
      <motion.div className="page productpage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{duration:.2}}
      >

        {
          modelShow && 
        <div className="popup" 
        >
          <div id='addReview'>
          <AddReview closeModel={setModelShow} product={product}/>
          </div>
        </div>
        }
        <h1>{product.title}</h1>
        <div className="top">
          <div className="left">
            <img src={product.image} alt="" />
          </div>
          <div className="right">
            <div className="inRight">
              <h2>{product.title}</h2>
              <p>
                {product.description} 
              </p>
              <div className="rating green">
                {" "}
                <i className="im im-star"></i> {product.rating}
              </div>
              <div className="rent">
                <p>
                  <b>Rent : </b> {product.rent} {product.timeperiod}
                </p>
              </div>

              <div className="productAge">
              <p><b>Age of product : </b> {calcAge(product.age)} Days</p>
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
                <button
                  className="red"
                  onClick={() => retriveProduct()}
                >
                  Retrive Product
                </button>
              )}

              {product.renterid === user._id && !product.issued && (
                <button
                  className="red"
                  onClick={() => deleteProduct()}
                >
                  Delete Product
                </button>
              )}

              {product.borrowerid  && product.borrowerid === user._id
                 &&(
                  <button
                    className="yellow"
                    onClick={()=>addReview()}
                  >
                    Add Review
                  </button>
                )
              }
            </div>
          </div>
        </div>


            <div className="bottom flex">

        <div className="ownerdetails ">
        <h2>Owner Details</h2>
              <div className="left">
              <img src={product.renter.avatar} alt="" />

              </div>
              <div className="right">
                <h2>{product.renter.username}</h2>
                <p>{product.renter.email} {product.renter.emailverified && <><i className="im im-check-mark-circle verified"></i></>}</p>
                <p>{product.renter.mobile}{product.renter.mobileverified && <><i className="im im-check-mark-circle verified"></i></>}</p>

              </div>
        </div>
           
        <div className="reviews">
        <h2>Reviews</h2>

        <div className="reviewlists">
          {
            product.reviews.length ? 
            <>

              {
                product.reviews.map((rev)=><ReviewCard {...rev}/>)
              }
              
            </>
            :<b>No Reviews</b>

          }
          
          
        </div>


        </div>
           
            </div>

      </motion.div>
    );
  else {
    return <div className="page flex"><Loader /></div>;
  }
}
