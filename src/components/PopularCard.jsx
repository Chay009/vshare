import React from 'react'

const PopularCard = () => {
  return (
    <div className=" hidden md:flex flex-col p-3 gap-4 h-max rounded-xl">
    <div className=" bg-accent/70  rounded-3xl py-3  px-3 lg:w-full max-w-screen-sm flex-1 shrink-0">
      <div className='flex flex-col gap-3 py-3'>

        <p className='text-xl font-bold'>Popular Posts</p>
<ul>
  <li>post1</li>
  <li>post1</li>
  <li>post1</li>
  <li>post1</li>
</ul>
      </div>
   
       
   
    
      </div>
  </div>
  )
}

export default PopularCard
