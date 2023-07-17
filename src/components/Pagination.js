import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Pagination() {
  return (
    <div className=" flex items-center justify-center border-t border-gray-300 px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
                    <Link
                      href={`/dashboard/users`}
                      className={` relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50`}
                    >
                      Previous
                    </Link>
                    <Link
                      href={`/dashboard/users`}
                      className={` relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50`}
                      >
                        Next
                    </Link>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <Link
                href={`/dashboard/users`}
                className={` relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link
              href={`/dashboard/users`}
              aria-current="page"
              className='text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 relative inline-flex items-center px-4 py-2 text-sm font-semibold'>
              1
            </Link>
              <Link
                href={`/dashboard/users`}
                className={` relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </Link>
            
          </nav>
        </div>
      </div>
      
    </div>
  )
}

