import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import UserAvatar from './UserAvatar'
import { Image } from '@unpic/react'

const Grid = () => {

    const post=[]
      const [showUser,setShowUser] =useState(true)
      
      const imgs=  <div >
      <ul>
      <ul className="list-none p-0">
     <li key="post1" className="relative min-w-80 h-80 p-3">
       <Link to={`/posts/post1`} className="block rounded-[24px] border border-dark-4 overflow-hidden cursor-pointer w-full h-full bg-blue-500 relative">
         <img
           src="https://avatars.githubusercontent.com/u/107456702?v=4"
           alt="post1"
           className="h-full w-full object-cover"
         />
           <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-dark-4 to-slate-500/40  p-3">
         <div>
                 <div className="flex items-center justify-start gap-2 flex-1 text-white w-full  ">
                       
                       <UserAvatar className="w-8 h-8 rounded-full"/>
                       <p className="line-clamp-1">post.creator.name</p>
                   
                 </div>
                 </div>
       
         </div>
       </Link>
     </li>
   
     <li key="post2" className="relative min-w-80 h-80 p-3">
       <Link to={`/posts/post2`} className="block rounded-[24px] border border-dark-4 overflow-hidden cursor-pointer w-full h-full bg-blue-500 relative">
         <Image
           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi8jNttKGfz-InR1cj1PxAfNGeghEFsAp96w&usqp=CAU"
           alt="post2"
           className="h-full w-full object-cover"
           width={1920}
           height={1080}
           
         />
         <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-dark-4 to-slate-500/40  p-3">
         <div>
                 <div className="flex items-center justify-start gap-2 flex-1 text-white w-full  ">
                       
                       <UserAvatar className="w-8 h-8 rounded-full"/>
                       <p className="line-clamp-1">post.creator.name</p>
                   
                 </div>
                 </div>
       
         </div>
       </Link>
     </li>
   </ul>
   
      </ul>
    
         </div>
    
    
    
    
    
     return (
      <>
     {imgs}
     {imgs}
     {imgs}
     {imgs}
     {imgs}
      </>
    );
     }

export default Grid
