import MessageForm from "@/components/MessageForm";
import ShowRecap from "@/components/ShowRecap";
import {  UserIcon } from "@heroicons/react/24/outline"
import { cookies } from "next/headers";
import Link from "next/link";

const getData=async(userId)=>{
}


 export default async function UserDetail({params}) {
  const data=await getData(params.userId);
  console.log('😎😎 data',data);
  

  return data && 
  // (data.status === 200 || data.status=== 401) ?  
   (
    <>
      <main>
        <section className="relative block h-96">
          <div className="absolute top-0 w-full h-full bg-center bg-cover bg-bg-admin" >
            <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
          </div>
          <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style={{transform: 'translateZ(0px)'}}>
            <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
              <polygon className="text-slate-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-slate-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center mb-24">
                    <div className="relative">
                      <img alt="foto profil user" src="https://images.unsplash.com/photo-1603696774412-ce509eec411f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=872&h=872" className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"/>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-xl sm:text-3xl font-semibold leading-normal text-slate-700 mb-2">
                  {data && data.name}
                  </h3>
                  <div className="w-full lg:w-9/12 mx-auto px-4 mb-2 text-slate-700 mt-10">
                    <p className=" flex justify-between space-x-4 ">
                      <span className="basis-1/2 flex justify-end">
                        <span className="w-1/3 inline-block text-left font-medium">Price</span>
                      </span>
                      <span>:</span>
                      <span className="basis-1/2 text-left" >{data && data.price}</span>
                    </p>
                    <p className=" flex justify-between space-x-4 ">
                      <span className="basis-1/2 flex justify-end">
                        <span className="w-1/3 inline-block text-left font-medium">Rating</span>
                      </span>
                      <span>:</span>
                      <span className="basis-1/2 text-left" >{data && data.rating.rate}</span>
                    </p>
                    <p className=" flex justify-between space-x-4 ">
                      <span className="basis-1/2 flex justify-end">
                        <span className="w-1/3 inline-block text-left font-medium">Description</span>
                      </span>
                      <span>:</span>
                      <span className="basis-1/2 text-left" >{data && data.description}</span>
                    </p>
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-slate-200 text-center">
                  <div className="flex flex-wrap flex-col justify-center">
                      <h4 className="font-semibold text-lg">Kontak : </h4>
                      <div className="w-full lg:w-9/12 mx-auto px-4 my-3 text-slate-700">
                        <p className=" flex justify-between space-x-4 ">
                          <span className="basis-1/2 flex justify-end">
                            <span className="w-1/3 inline-block text-left font-medium">Email</span>
                          </span>
                          <span>:</span>
                          <span className="basis-1/2 text-left" >{data && data.email}</span>
                        </p>
                        <p className=" flex justify-between space-x-4 ">
                          <span className="basis-1/2 flex justify-end">
                            <span className="w-1/3 inline-block text-left font-medium">No. Telpon</span>
                          </span>
                          <span>:</span>
                          <span className="basis-1/2 text-left" >{data && data.phone}</span>
                        </p>
                        <p className=" flex justify-between space-x-4 ">
                          <span className="basis-1/2 flex justify-end">
                            <span className="w-1/3 inline-block text-left font-medium">Alamat</span>
                          </span>
                          <span>:</span>
                          <span className="basis-1/2 text-left" >{data && data.address}</span>
                        </p>
                      </div>
                  </div>
                </div>
                <MessageForm noTelpon={data && data.phone} />
                <div className="mt-10 py-10 border-t border-slate-200 text-center">
                  <div className="flex flex-wrap flex-col justify-center">
                      <h4 className="font-semibold text-lg">Data Rekap {data && data.name}: </h4>
                      <div className="w-full lg:w-9/12 mx-auto px-4 my-3 text-slate-700">
                        <div className="flex justify-between items-center space-x-4">
                          <span className="basis-1/2 flex justify-end ">
                            <label for="pesan" className="w-1/3 inline-block text-left font-medium">Data Rekap</label>
                          </span>
                          <span>:</span>
                          <span className="basis-1/2 flex items-center ">
                            <Link
                            href={`/dashboard/users/${data.id}/recap`}
                            target="_blank"
                             className="py-1 px-4 rounded-md bg-sky-500 hover:bg-sky-600 text-white font-medium cursor-pointer" >
                              Lihat disini
                            </Link>
                          </span>
                        </div>
                      </div>
                  </div>
                </div>


                
                <p>lihat data rekap budi</p>
                link ke halaman seluruh data rekap budi [isi tabel dan chart]
                <div className="mt-5 py-8 border-t border-slate-200 text-center">
                  <div className="flex flex-wrap justify-center">
                      <Link
                      href={'/dashboard/users'}
                      className="font-normal hover:cursor-pointer text-red-600 underline hover:no-underline">
                        kembali
                      </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
  // : <>loading user detail</>;
}


