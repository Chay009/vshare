import React from 'react'
import { Loader2 } from 'lucide-react'

const Loader = () => {
  return (
    <>
    <div className='flex items-center justify-center w-full h-full'>

      <Loader2 className='animate-spin'></Loader2>
    </div>
    </>
  )
}

export default Loader
