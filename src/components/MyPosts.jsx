import React, { useEffect } from 'react'


const MyPosts = ({setProgress}) => {
   useEffect(()=>{

     setProgress(70)
     
     setTimeout(()=>{
      setProgress(100)

     },3000)

     
   },[])
   
  return (
    <div>
   
    </div>
  )
}

export default MyPosts
