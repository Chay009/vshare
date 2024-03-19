import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import ImageComponent from './ImageComponent'

const UserAvatar = () => {
  const imgHash=  {
    encoded: 'UNJa$QS6?vxu?]WBofkC4nof9FafD*WAadt6',
    width: 690,
    height: 597,
  }
  return (
    <>
     <div>
  
     <Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>
    {/* <ImageComponent src="https://github.com/shadcn.png" imgHash={imgHash}></ImageComponent> */}
{/* use blur hash then put it here while fethcing */}
  </AvatarFallback>
</Avatar>

     </div>
    </>
  )
}

export default UserAvatar
