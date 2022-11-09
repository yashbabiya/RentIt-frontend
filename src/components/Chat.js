import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import ChatPopup from './ChatPopup';
import ChatIcon from '@mui/icons-material/Chat';

export default function Chat() {
  const socket = useRef();
  const [modelShow,setModeShow] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const chatFun = async () => {
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem("chat-app-current-user")
        )
      );
    }
    chatFun();
  }, [])
  

  return (

    <div className='chat'>

    {modelShow && <ChatPopup />} 
    <button className="chatBubble" onClick={()=>setModeShow(!modelShow)}>
        <ChatIcon sx={{ fontSize:30}}/>
    </button>
    </div>
  )
}
