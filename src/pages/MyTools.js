import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { API } from '../API';
import Loader from '../components/Loader';
import ProductCard from '../components/ProductCard';
import emptyBox from '../imgs/emptyBox.png';
import {motion} from 'framer-motion'
import { useQuery } from 'react-query';
export default function MyTools() {

  const [rented,setRented] = useState([])
  const [borrowed,setBorrowed] = useState([])
  const [isLoading,setIsLoading] = useState();

  // const {  error, data } = useQuery('repoData', () =>
  //    axios.get(API+"/user/mytools",{withCredentials:true}).then(res =>
  //      res
  //    )
  //  )

  const fetchMyTools = async() =>{

    setIsLoading(true)
    try{

      const res = await axios.get(API+"/user/mytools",{withCredentials:true})

      setRented(res.data.rented)
      setBorrowed(res.data.borrowed)

    }
    catch(e){
      alert("Error occured")
    }
    setIsLoading(false)
    
  }
  useEffect(()=>{
    fetchMyTools();
    // if(data){

    //   setRented(data.data.rented)
    //   setBorrowed(data.data.borrowed)
    // }

    
  },[])

  const [activeTab,setActiveTab] = useState("RENTED");
  return (
    <motion.div className='page mytools'
    initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{duration:.2}}
    >
      <h2>My Products</h2>

      <div className="bottom">
        <div className="btns flex">
          <button className='green' style={activeTab==="RENTED" ? {} :{background:"none"}} onClick={()=>setActiveTab("RENTED")}>Rented</button>
          <button className='yellow' style={activeTab==="BORROWED" ? {} :{background:"none"}} onClick={()=>setActiveTab("BORROWED")}>Borrowed</button>

        </div>
        <div className="listProduct">
        {
          isLoading ?
            <Loader />
          :
          activeTab === "RENTED" ?

           (rented.length) ?  <>{rented.map((prd,index)=><ProductCard index={index} {...prd}/>)}</> : <div className='flex-col'><img height={80} width={80}  src={emptyBox}/>No Products</div>
          : (borrowed.length) ?   <>{borrowed.map((prd,index)=><ProductCard index={index} {...prd}/>)}</> :<div className='flex-col'><img height={80} width={80} src={emptyBox}/>No Products</div>

        }
        </div>
      </div>
    </motion.div>
  )
}
