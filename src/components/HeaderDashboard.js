'use client'
import { Fragment } from 'react'
import {useState} from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import {  Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import ConfirmLogOutModal from './ConfirmLogOutModal';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';



function HeaderDashboard() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const user = {
    name : 'Admin',
    email : 'admin@gmail.com',
    imageUrl: '/profile.jpg',
  }
  return (
    <>
      {
        open ? 
        <ConfirmLogOutModal open={open} setOpen={setOpen} />
        :''
      }
     <Disclosure as="nav" className="bg-gray-800">
              {({ open }) => (
                <>
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                    <span className='block md:hidden'></span>
                        <div className="hidden md:block">
                          <div className="ml-10 flex items-baseline space-x-4">
                              <Link
                                href={'/dashboard'}
                                className={cn(pathname!=='/dashboard' && 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                  'rounded-md px-3 py-2 text-sm font-medium', pathname==='/dashboard' && 'bg-gray-900 text-white')}>
                                Products
                              </Link>
                              <Link
                                href={'/dashboard/categories'}
                                className={cn(pathname!=='/dashboard/categories' && 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                  'rounded-md px-3 py-2 text-sm font-medium', pathname==='/dashboard/categories' && 'bg-gray-900 text-white')}>
                                Categories
                              </Link>
                              <Link
                                href={'/dashboard/users'}
                                className={cn(pathname!=='/dashboard/users' && 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                  'rounded-md px-3 py-2 text-sm font-medium', pathname==='/dashboard/users' && 'bg-gray-900 text-white')}>
                                Users
                              </Link>
                          </div>
                        </div>
                      <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                          {/* Profile dropdown */}
                          <Menu as="div" className="relative ml-3">
                            <div>
                              <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span className="sr-only">Open user menu</span>
                                <Image 
                                width={32}
                                height={32}
                                src={user.imageUrl} 
                                alt="user profile"
                                style={{ borderRadius: '50%',}}
                                 />
                              </Menu.Button>
                            </div>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                  <Menu.Item>
                                      <a
                                        href={`/admin/1`}
                                        className='hover:bg-gray-200 block px-4 py-2 text-sm text-gray-700'>
                                        Your Profile
                                      </a>
                                  </Menu.Item>
                                  <Menu.Item>
                                      <button
                                        onClick={()=>setOpen(true)}
                                        className='w-full text-left hover:bg-gray-200 block px-4 py-2 text-sm text-gray-700'>
                                        logout
                                      </button>
                                  </Menu.Item>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </div>
                      </div>
                      <div className="-mr-2 flex md:hidden">
                        {/* Mobile menu button */}
                        <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open main menu</span>
                          {open ? (
                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                          ) : (
                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                          )}
                        </Disclosure.Button>
                      </div>
                    </div>
                  </div>

                  <Disclosure.Panel className="md:hidden">
                    <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                        <Disclosure.Button
                          as="a"
                          href={'/dashboard'}
                          className={cn('text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium')}>
                          Products
                        </Disclosure.Button>
                        <Disclosure.Button
                          as="a"
                          href={'/dashboard/categories'}
                          className={cn('text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium')}>
                          Categories
                        </Disclosure.Button>
                        <Disclosure.Button
                          as="a"
                          href={'/dashboard/users'}
                          className={cn('text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium')}>
                          Users
                        </Disclosure.Button>
                    </div>
                    <div className="border-t border-gray-700 pb-3 pt-4">
                      <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                          <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                        </div>
                        <div className="ml-3">
                          <div className="text-base font-medium leading-none text-white">{user.name}</div>
                          <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                        </div>
                      </div>
                      <div className="mt-3 space-y-1 px-2">
                            <Disclosure.Button
                              as='a'
                              href={`/admin/1`}
                              className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                              Your Profile
                            </Disclosure.Button>
                            <Disclosure.Button
                              as='button'
                              onClick={()=>setOpen(true)}
                              className="w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                              Logout
                            </Disclosure.Button>
                      </div>
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
    </>
  )
}

export default HeaderDashboard