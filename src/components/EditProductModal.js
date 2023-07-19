'use client'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import clearForm from '../utils/clearForm'


// function to join classname
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const postData =async(e, id)=>{
  console.log(id);
  e.preventDefault();
  const title = e.target.title.value;
  const price = e.target.price.value;
  const category = e.target.category.value;
  const description = e.target.description.value;
  const image = e.target.image.value;

  const formData = {
    title,
    price,
    category,
    description,
    image
  }
  
  // fetch data
  const res = await fetch(`${process.env.API_URL}/products/${id}`,{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(formData)
  });
  const data = await res.json();
  console.log(data);
  editUserMessage.innerHTML=''
  if(data){
    editUserMessage.classList.remove('text-red-600');
    editUserMessage.classList.add('text-green-600');
    editUserMessage.innerHTML='Success edit product!'
  }else{
    editUserMessage.classList.remove('text-green-600');
    editUserMessage.classList.add('text-red-600');
    editUserMessage.innerHTML='Failed to edit product!'
  }
  
  
  // reset form values
  clearForm(e);
}



export default function EditUserModal({open, setOpen, id}) {
  const cancelButtonRef = useRef(null)
  
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-10">
                  <div className="flex flex-col sm:items-start">

                    <div className="mt-3 sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg text-center font-semibold leading-6 text-gray-900">
                        Edit Product
                      </Dialog.Title>
                      <div className="mt-10">
                        <form action="" method="post" onSubmit={(e)=>postData(e,id)}>
                          <div className='flex flex-col space-y-4'>
                            <div className='grid grid-cols-12'>
                              <label htmlFor="title" className="col-auto col-start-2 flex items-center text-sm font-medium leading-6 text-gray-900">
                                Title
                              </label>
                              <input
                              className='col-span-8 col-start-4 col-end-12 border-x-0 border-t-0 border-b focus:border-b-2 box-border border-slate-400 focus:border-green-400 focus:ring-0 transition-colors duration-300 ease-in '
                              type="text" id='title' name='title' placeholder='insert product name' />
                            </div>
                            <div className='grid grid-cols-12'>
                              <label htmlFor="price" className="col-auto col-start-2 flex items-center text-sm font-medium leading-6 text-gray-900">
                                Price
                              </label>
                              <input
                              className='col-span-8 col-start-4 col-end-12 border-x-0 border-t-0 border-b focus:border-b-2 border-slate-400 focus:border-green-400 focus:ring-0 transition-colors duration-300 ease-in'
                              type="text" id='price' name='price' placeholder='insert new price' />
                            </div>
                            <div className='grid grid-cols-12'>
                              <label htmlFor="category" className="col-auto col-start-2 flex items-center text-sm font-medium leading-6 text-gray-900">
                                Category
                              </label>
                              <input
                              className='col-span-8 col-start-4 col-end-12 border-x-0 border-t-0 border-b focus:border-b-2 border-slate-400 focus:border-green-400 focus:ring-0 transition-colors duration-300 ease-in'
                              type="text" id='category' name='category' placeholder='insert new category' />
                            </div>
                            <div className='grid grid-cols-12'>
                              <label htmlFor="description" className="col-auto col-start-2 flex items-center text-sm font-medium leading-6 text-gray-900">
                                Description
                              </label>
                              <input
                              className='col-span-8 col-start-4 col-end-12 border-x-0 border-t-0 border-b focus:border-b-2 border-slate-400 focus:border-green-400 focus:ring-0 transition-colors duration-300 ease-in'
                              type="text" id='description' name='description' placeholder='insert new description' />
                            </div>
                            <div className='grid grid-cols-12'>
                              <label htmlFor="image" className="col-auto col-start-2 flex items-center text-sm font-medium leading-6 text-gray-900">
                                Image
                              </label>
                              <input 
                              type="file" accept="image/*" id='image' name='image' 
                              className='col-span-8 col-start-4 col-end-12 border-x-0 border-t-0 border-b focus:border-b-2 border-slate-400 focus:border-green-400 focus:ring-0 transition-colors duration-300 ease-in'
                               />
                            </div>
                          </div>
                          <div className='grid grid-cols-12 mt-6'>
                            <span className='col-start-2 col-span-10 text-sky-500 font-normal text-md' id='errorConfirmPasswordMessage'></span>
                          </div>
                          <div className='grid grid-cols-12 mt-6'>
                          <span className='col-start-2 col-span-10 font-normal text-md' id='editUserMessage'></span>
                          </div>
                          
                          <div className="mt-6 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                              type="submit"
                              className=
                              // {classNames( isLoading &&'bg-red-300 hover:bg-red-200 cursor-not-allowed',
                                "inline-flex w-full justify-center rounded-md bg-sky-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-400 sm:ml-3 sm:w-auto"
                                // )}
                                >
                              Save
                            </button>
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                              onClick={() => setOpen(false)}
                              ref={cancelButtonRef}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
