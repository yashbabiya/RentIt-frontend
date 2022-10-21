import React from 'react'
import { useState } from 'react'
import ChatPopup from './ChatPopup';

export default function Chat() {

    const [modelShow,setModeShow] = useState(false);
  return (

    <div className='chat'>

    {modelShow && <ChatPopup />} 
    <button className="chatBubble" onClick={()=>setModeShow(!modelShow)}>
        <i className="im im-speech-bubble"></i>
    </button>
    </div>
  )
}
