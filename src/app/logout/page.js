'use client'
import { Fragment, useState } from 'react'
import { useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/navigation'

export default function ConfirmLogOutModal() {
  const router = useRouter()
  const logOut = async()=>{
    const fetchLogOut= await fetch(`${process.env.API_URL}/api/auth/logout`,{
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'X-ACCESS-TOKEN': `${Cookies.get('X-ACCESS-TOKEN')}`,
        'X-REFRESH-TOKEN': `${Cookies.get('X-REFRESH-TOKEN')}`,
      }
    });
    const res= await fetchLogOut.json();
    console.log('🙏logout',res);
    if(res.status === 200){
      Cookies.remove('X-ACCESS-TOKEN')
      Cookies.remove('X-REFRESH-TOKEN')
      Cookies.remove('USER-ID')
      console.log('🙏🙏logout',Cookies.get('USER-ID'));
      // document.cookies= 'X-ACCESS-TOKEN=; expires=0'
      // document.cookies= 'X-REFRESH-TOKEN=; expires=0'
      // document.cookies= 'USER-ID=; expires=0'
      router.push('/login');
    }
    else{
      // throw new Error(res.message);
      alert(res.message);
      router.push('/login');
    }
  }
  const cancelButtonRef = useRef(null)

  const [open, setOpen] = useState(true)
  if(!open){
    router.back()
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" 
      initialFocus={cancelButtonRef}
       onClose={setOpen}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6">
                  <div className="flex flex-col sm:items-start">

                    <div className="mt-3 sm:ml-4 sm:mt-0 sm:text-center w-full">
                      <Dialog.Title as="h3" className="text-lg text-center font-semibold leading-6 text-gray-900">
                      Apakah kamu yakin ingin keluar?
                      </Dialog.Title>
                        <div className="mt-6 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                          <button
                            type="button"
                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                            onClick={() => logOut()}
                          >
                            Keluar
                          </button>
                          <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            onClick={() => setOpen(false)}
                            // ref={cancelButtonRef}
                          >
                            Batal
                          </button>
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
