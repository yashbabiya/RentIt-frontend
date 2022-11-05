import React, { useState } from 'react'
import ChatHistory from './ChatHistory'

export default function ChatPopup() {

    const users = [
        {
            _id:"111",
            username:"yash",
            image:"https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-541.jpg",
        },
        {
            _id:"112",
            username:"aayush",
            image:"https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-541.jpg",

        },
        {
            _id:"113",
            username:"harshil",
            image:"https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-541.jpg",

        },
        {
            _id:"114",
            username:"jay",
            image:"https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-541.jpg",

        },
        {
            _id:"115",
            username:"nakum",
            image:"https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-541.jpg",

        },
    ]

    const [usersChat,setUsersChat] = useState() // set the user that is clicked

    const userDetails = {
        avatar:"https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-541.jpg",
        username:"yash",
        chats:[ // Earliest message first
            {
                sender:"yash",
                message:"Your welcome"
            },
            {
                sender:"me",
                message:"Thank you so much"
            },
            {
                sender:"yash",
                message:"sure"
            },
            {
                sender:"me",
                message:"I want your drill for 2 months"
            },
            {
                sender:"yash",
                message:"I am Fine"
            },
            {
                sender:"me",
                message:"How are you ? "
            },
            {
                sender:"yash",
                message:"Hii"
            },
            {
                sender:"me",
                message:"Hey"
            },
        ]
    }
  return (
    <div className='chatpopup green'>
        
        {
            usersChat? <>
                <ChatHistory user={usersChat} goBack={()=>setUsersChat(false)}/>
            </>:
             <div className='chatUserList'>
                 <h2>Chats</h2>
             {
                 users.map((user)=><div style={{cursor:"pointer"}} className='userCard' onClick={()=>setUsersChat(userDetails)}>
                     <img src={user.image} alt=""/>
                     {user.username}
                 </div>)
             }
             </div>
        }
       
    </div>
  )
}
