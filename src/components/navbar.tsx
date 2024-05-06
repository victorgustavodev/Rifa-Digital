import React from 'react'
import {Menu} from 'lucide-react'
function navbar() {
  return (
    <div className='flex justify-between p-4 items-center border-b-2'>
        <button><Menu size={30}/></button>
        <span className='uppercase text-lg font-bold'>dujão du corte</span>
        <span></span>
    </div>
  )
}

export default navbar
