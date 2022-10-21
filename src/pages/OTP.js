import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import {API} from '../API'

export default function OTP() {

    const user = useSelector((state)=>state.auth);
    const [otp,setotp] = useState()
    const [ isLoading,setIsLoading] =useState();

    const sendOTP = async() =>{
      setIsLoading(true)
      try{

        const res = await axios.post(API+'/auth/send_otp',{mobile:user.mobile},{withCredentials:true})
      }
      catch(e){
        alert("Error occured")
        
      }
      setIsLoading(false)


    }
    useEffect(()=>{

      sendOTP()
      
    },[])
   
  const location = useLocation();
  return (
    <div className="page">
      <h2>Enter OTP from {location?.state}</h2>

      {isLoading ? <>Loading...</> : <div className="flex-col otpinputs">

          <input type="number" maxLength={6} value={otp} onChange={(e)=>setotp(e.target.value)}/>
          <button className="blue">
              Verify
          </button>
      </div>}
    </div>
  );
}
