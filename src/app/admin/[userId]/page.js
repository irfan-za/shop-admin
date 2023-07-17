
import { EnvelopeIcon, UserIcon } from "@heroicons/react/24/outline"
import Link from "next/link";
import { cookies } from "next/headers";
import updateAccessToken from "@/utils/updateAccessToken";


const getData = async(userId)=>{
  const fetchData= await fetch(`${process.env.API_URL}/api/users/${userId}`,{
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'X-ACCESS-TOKEN': `${cookies().get('X-ACCESS-TOKEN')?.value}`,
      'X-REFRESH-TOKEN': `${cookies().get('X-REFRESH-TOKEN')?.value}`,
    }
  });
  const res= await fetchData.json();
  if(res.status === 200){
    return res.data;
  }else if(res.status === 401){
    const cookie=await updateAccessToken();
    const fetchData= await fetch(`${process.env.API_URL}/api/users/${userId}`,{
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'X-ACCESS-TOKEN': `${cookie.access_token}`,
        'X-REFRESH-TOKEN': `${cookie.refresh_token}`,
      }
    });
    const res= await fetchData.json();
    if(res.status === 200){
      return res.data;
    }
  }
  else{
    throw new Error(res.message);
  }
}

export default async function AdminProfile({params}) {
  const data= await getData(params.userId)
  console.log('✅',data); 

  
  return data ?
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
                      <img alt="foto profil admin" src="https://images.unsplash.com/photo-1603696774412-ce509eec411f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=872&h=872" className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"/>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-xl sm:text-3xl font-semibold leading-normal text-slate-700 mb-2">
                  {data && data.name}
                  </h3>
                  <div className="flex justify-center items-center text-sm leading-normal mt-0 mb-2 text-slate-400 font-bold">
                    <UserIcon className="w-6 h-6 mr-2 text-lg text-slate-400"/>{data && data.role.name ? data.role.name : '-'}
                  </div>
                  <div className="flex justify-center items-center mb-2 text-slate-600 mt-10">
                    <EnvelopeIcon className="w-6 h-6 mr-2 text-lg text-slate-400"/>{data && data.email}
                  </div>
                  <p className="text-slate-600 ">Telepon : {data && data.phone ? data.phone : "-"}</p>
                  <p className="text-slate-600 ">Gender : {data && data.gender ? data.gender : '-'}</p>
                </div>
                <div className="mt-10 py-10 border-t border-slate-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4 flex justify-between space-x-4">
                      <Link
                      href={'/dashboard'}
                      className="font-normal hover:cursor-pointer text-slate-700 underline hover:no-underline basis-1/2 text-end">
                        kembali ke dashboard
                      </Link>
                      <span>|</span>
                      <Link
                        href={'/logout'}
                        className="font-normal hover:cursor-pointer text-red-600 underline hover:no-underline basis-1/2 text-start">
                          keluar
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
  : <>loading...</>
}



// export default async function AdminProfile({params}) {
//   return <>hoho</>
// }