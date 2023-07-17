'use client'
import { useState } from 'react'
import {PlusIcon } from '@heroicons/react/24/outline'
import AddProductModal from './AddProductModal'


export default function ButtonAdd() {
  const [showText, setShowText] = useState(false)
  const [open, setOpen] = useState(false)
  return (
      <>
      <AddProductModal open={open} setOpen={setOpen} />
        <button 
          onClick={() =>setOpen(true)}
          onMouseOver={()=>setShowText(true)}
          onMouseOut={()=>setShowText(false)}
          className={`${showText ? 'py-2 px-3' : 'py-2 px-2'} fixed bottom-16 right-12 z-10 flex font-medium bg-sky-600 p-1 md:p-2 rounded-full text-white`}>
            <PlusIcon className={`${showText ? 'hidden' : 'flex'} h-6 w-6`} aria-hidden="true" />
            <p className={showText ? 'flex mx-2' : 'hidden'} >Add</p>
          </button>
        </>
  )
}
