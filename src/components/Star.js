import React from 'react'

export default function Star({count,setCount}) {


  return (
    <div>
        {
            [1,2,3,4,5].map(i=>(
            (i<=count)?

            <i className='im im-star'  onClick={()=>{
                if(setCount)
                setCount(i)
            }}></i>
            :<i className='im im-star-o' onClick={()=>{
                if(setCount)
                setCount(i)}}></i> )
            
            )
        }

    </div>
  )
}
