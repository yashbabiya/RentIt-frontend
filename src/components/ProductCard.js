import React from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion'
import Star from "./Star";
import { useState } from "react";
import { useEffect } from "react";


export default function ProductCard(props) {

  const [imgLoading, setImgLoading] = useState(true)

  
  const navigate = useNavigate();
  const openProduct = () =>{
    navigate(`/product/${props._id}`)
  }
  if (props) return <><motion.div 
  whileHover={{scale:1.01}}
  onClick={openProduct} className="prodCard ">

    {/* <div className="img"> */}
       <img key={props.title} src={props.image} alt="" />
    {/* </div> */}

    <h3>{props.title}</h3>
    <p>{props.rent}{"₹ "}{props.timeperiod}</p>
    <p>{props.category}</p>

    <p>{props.location}</p>
    <p> <Star count={props.rating}/> </p>

  </motion.div>
  </>
  ;

  return <></>;
}
