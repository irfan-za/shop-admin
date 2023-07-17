import { Popover, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment, useState } from "react";
import ConfirmDeleteModal from "../ConfirmDeleteModal";
import EditUserModal from "../EditUserModal";


export default function PopoverMenu({productId}) {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  return (
    <Popover className="relative">
          <>
            <Popover.Button
              className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                </svg>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
                <Popover.Panel className="z-10 inline-block absolute -top-4 left-0 transform bg-white border border-gray-300 rounded-lg shadow-xl transition-all">
                  <div className="flex flex-col items-center justify-center text-sm text-gray-500">
                  <Link 
                    href={`/dashboard/products/${productId}`}
                    className="cursor-pointer text-center w-full py-2 px-4 hover:bg-sky-500 hover:text-white hover:font-normal hover:rounded-t-lg pt-2">
                      Detail
                    </Link>
                    <hr className="border-t border-gray-300 w-full" />
                    <button onClick={()=>setEdit(true)} className="w-full py-2 px-4 hover:bg-sky-500 hover:text-white hover:font-normal">
                      Edit
                    </button>
                    <hr className="border-t border-gray-300 w-full" />
                    <button onClick={()=>setOpen(true)} className="w-full py-2 px-4 hover:bg-red-500 hover:text-white hover:font-normal hover:rounded-b-lg">
                      Delete
                    </button>
                  </div>
                </Popover.Panel>
            </Transition>
          </>


          <EditUserModal open={edit} setOpen={setEdit} productId={productId} />
          <ConfirmDeleteModal open={open} setOpen={setOpen} productId={productId} />
      </Popover>
  )
}
