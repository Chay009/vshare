import React, { useEffect} from 'react'



const Allusers = ({setProgress}) => {
  useEffect(()=>{

    setProgress(70)
    
    setTimeout(()=>{
     setProgress(100)

    },3000)

    
  },[])




 
  return (
    <div className='flex flex-col gap-3 '>
 
 
    
   All users


    </div>
  )
}

export default Allusers
