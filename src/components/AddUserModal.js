'use client'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import clearForm from '../utils/clearForm'


// function to join classname
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const postData =async(e)=>{
  e.preventDefault();
  const email = e.target.email.value;
  const nama = e.target.nama.value;
  const password = e.target.password.value;
  const confirmPassword = e.target.confirmPassword.value;

  errorConfirmPasswordMessage.innerHTML = '';
  if(password!==confirmPassword){
    errorConfirmPasswordMessage.innerHTML = 'Password yang kamu masukan tidak sama!';
    return;
  }
  const formData = {
    name: nama,
    email,
    password,
    confirm_password : confirmPassword,
  }
  
  // fetch data
  const res = await fetch(`${process.env.API_URL}/api/users/`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(formData)
  });
  const data = await res.json();
  addUserMessage.innerHTML=''
  if(data.status===201){
    addUserMessage.classList.remove('text-red-600');
    addUserMessage.classList.add('text-green-600');
    addUserMessage.innerHTML='Berhasil menambah pengguna!'
  }else if(data.status!==201){
    addUserMessage.classList.remove('text-green-600');
    addUserMessage.classList.add('text-red-600');
    addUserMessage.innerHTML=data.message;
  }
  
  
  // reset form values
  clearForm(e);
}



export default function AddUserModal({showUserModal, setShowUserModal}) {
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  // const [isLoading, setIsLoading] = useState(false)
  const cancelButtonRef = useRef(null)



  
  return (
    <Transition.Root show={showUserModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={()=>setShowUserModal(false)}>
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
                        Add new User 
                      </Dialog.Title>
                      <div className="mt-10">
                        <form action="" method="post" onSubmit={postData}>
                          <div className='flex flex-col space-y-4'>
                            <div className='grid grid-cols-12'>
                              <label htmlFor="email" className="col-auto col-start-2 flex items-center text-sm font-medium leading-6 text-gray-900">
                                Email
                              </label>
                              <input
                              className='col-span-8 col-start-4 col-end-12 border-x-0 border-t-0 border-b focus:border-b-2 box-border border-slate-400 focus:border-green-400 focus:ring-0 transition-colors duration-300 ease-in '
                              type="email" id='email' name='email' placeholder='masukkan email' required />
                            </div>
                            <div className='grid grid-cols-12'>
                              <label htmlFor="nama" className="col-auto col-start-2 flex items-center text-sm font-medium leading-6 text-gray-900">
                                Name
                              </label>
                              <input
                              className='col-span-8 col-start-4 col-end-12 border-x-0 border-t-0 border-b focus:border-b-2 border-slate-400 focus:border-green-400 focus:ring-0 transition-colors duration-300 ease-in'
                              type="text" id='nama' name='nama' placeholder='masukkan nama' required />
                            </div>
                            <div className='grid grid-cols-12'>
                              <label htmlFor="password" className="col-auto col-start-2 flex items-center text-sm font-medium leading-6 text-gray-900">
                                Password
                              </label>
                              <div className={`flex items-center col-span-8 col-start-4 col-end-12 border-x-0 border-t-0 ${passwordFocused ?'border-b-2 border-green-400 ring-0' : ' border-b border-slate-400'} transition-colors duration-300 ease-in`}>
                              <input
                              onFocus={()=>setPasswordFocused(true)}
                              onBlur={()=>setPasswordFocused(false)}
                              className='border-none flex-1 focus:ring-0'
                              type={`${passwordVisible ? 'text' : 'password'}`} id='password' name='password' placeholder='masukkan password' required />
                              <button onClick={(e)=>{e.preventDefault(); setPasswordVisible(!passwordVisible)}}>
                                {
                                  passwordVisible ? 
                                  <EyeSlashIcon className='h-5 w-5 text-slate-500 ml-2'/>
                                  :
                                  <EyeIcon className='h-5 w-5 text-slate-500 ml-2'/>
                                }
                              </button>
                              </div>
                            </div>
                            <div className='grid grid-cols-12'>
                              <label htmlFor="confirmPassword" className="col-auto col-start-2 flex items-center text-sm font-medium leading-6 text-gray-900">
                                Ulangi password
                              </label>
                              <div className={`flex items-center col-span-8 col-start-4 col-end-12 border-x-0 border-t-0 ${confirmPasswordFocused ?'border-b-2 border-green-400 ring-0' : ' border-b border-slate-400'} transition-colors duration-300 ease-in`}>
                              <input
                              onFocus={()=>setConfirmPasswordFocused(true)}
                              onBlur={()=>setConfirmPasswordFocused(false)}
                              className='border-none flex-1 focus:ring-0'
                              type={`${confirmPasswordVisible ? 'text' : 'password'}`} id='confirmPassword' name='confirmPassword' placeholder='ulangi password' required />
                              <button onClick={(e)=>{e.preventDefault(); setConfirmPasswordVisible(!confirmPasswordVisible)}}>
                                {
                                  confirmPasswordVisible ? 
                                  <EyeSlashIcon className='h-5 w-5 text-slate-500 ml-2'/>
                                  :
                                  <EyeIcon className='h-5 w-5 text-slate-500 ml-2'/>
                                }
                              </button>
                              </div>
                            </div>
                          </div>
                          <div className='grid grid-cols-12 mt-6'>
                            <span className='col-start-2 col-span-10 text-sky-500 font-normal text-md' id='errorConfirmPasswordMessage'></span>
                          </div>
                          <div className='grid grid-cols-12 mt-6'>
                          <span className='col-start-2 col-span-10 font-normal text-md' id='addUserMessage'></span>
                          </div>
                          
                          <div className="mt-6 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                              type="submit"
                              className=
                              // {classNames( isLoading &&'bg-red-300 hover:bg-red-200 cursor-not-allowed',
                                "inline-flex w-full justify-center rounded-md bg-sky-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-400 sm:ml-3 sm:w-auto"
                                // )}
                                >
                              Add
                            </button>
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                              onClick={() => setShowUserModal(false)}
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
