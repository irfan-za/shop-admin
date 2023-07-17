'use client';
import { useState } from 'react'
import {PlusIcon } from '@heroicons/react/24/outline'
import AddRecapModal from '@/components/AddProductModal';

function AddRecap() {
  const [showText, setShowText] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  return (
    <>
        <AddRecapModal open={openModal} setOpen={setOpenModal} />
        <button 
          onClick={() => setOpenModal(true)}
          onMouseOver={()=>setShowText(true)}
          onMouseOut={()=>setShowText(false)}
          className={`${showText ? 'py-2 px-3 space-x-0' : 'py-2 px-2'} absolute z-10 flex space-x-2 font-medium bottom-16 right-12 bg-sky-500 p-1 md:p-2 rounded-full text-white`}>
          <PlusIcon className={`${showText ? 'hidden' : 'flex'} h-6 w-6`} aria-hidden="true" />
          <p className={showText ? 'flex' : 'hidden'} >Tambah</p>
        </button>
    </>
  )
}

export default AddRecap