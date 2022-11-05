import React from 'react'
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
export default function ChatHistory({user,goBack}) {

    if(user)
  return (
    <div className='chatHistory'>
        <header>
            <ArrowBackIosIcon style={{cursor:"pointer"}} onClick={goBack}/>
            <img src={user.avatar} alt="" />
            <h3>{user.username}</h3>
        </header>
        <div className="chats">
        {
            user.chats.map(msg=>
            <div className='msgs'>
            {(msg.sender === user.username) ? 
            <p className='leftAlign'>
                <p>
                    {msg.message}
                    </p>
            </p>:
            <p className='rightAlign'>
                <p>
                    {msg.message}
                    </p>
            </p>}
            </div>    
            )
        }
        </div>
        <div className="input">
            <input type="text" />
            <button className="yellow">
                <SendIcon/>
            </button>
        </div>
    </div>
  )
}
