'use client'
import { useState } from 'react'
import {PlusIcon } from '@heroicons/react/24/outline'
import AddProductModal from './AddProductModal'
import AddUserModal from './AddUserModal'


export default function ButtonAdd({typeModal}) {
  const [showText, setShowText] = useState(false)
  const [showProductModal, setShowProductModal] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  return (
      <>
      <AddUserModal showUserModal={showUserModal} setShowUserModal={setShowUserModal} />
      <AddProductModal showProductModal={showProductModal} setShowProductModal={setShowProductModal} />
        <button 
          onClick={() =>typeModal=== 'product' ? setShowProductModal(true) : setShowUserModal(true)}
          onMouseOver={()=>setShowText(true)}
          onMouseOut={()=>setShowText(false)}
          className={`${showText ? 'py-2 px-3' : 'py-2 px-2'} fixed bottom-16 right-12 z-10 flex font-medium bg-sky-600 p-1 md:p-2 rounded-full text-white`}>
            <PlusIcon className={`${showText ? 'hidden' : 'flex'} h-6 w-6`} aria-hidden="true" />
            <p className={showText ? 'flex mx-2' : 'hidden'} >Add</p>
          </button>
        </>
  )
}
