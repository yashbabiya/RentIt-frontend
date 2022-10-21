import React from 'react'

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
  return (
    <div className='chatpopup green'>

        <div className='chatUserList'>
        {
            users.map((user)=><div className='userCard'>
                <img src={user.image}/>
                {user.username}
            </div>)
        }
        </div>
    </div>
  )
}
