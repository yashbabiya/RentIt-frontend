import React from 'react'
import { useState } from 'react';

export default function ProductRequest() {

  const [activeTab,setActiveTab] = useState("RECEIVED");

  return (
    <div className='page requestPage'>
       <h2>My Requests</h2>

<div className="bottom">
  <div className="btns">
    <div className='tabs' style={activeTab==="SENT" ? {borderBottom:"5px solid #05396B",color:"#05396B"} :{}} onClick={()=>setActiveTab("SENT")}>Sent</div>
    <div className='tabs' style={activeTab==="RECEIVED" ? {borderBottom:"5px solid #05396B",color:"#05396B"} :{}} onClick={()=>setActiveTab("RECEIVED")}>Received</div>

  </div>
  <div className="listProduct">
  {
    
  }
  </div>
</div>
    </div>
  )
}
