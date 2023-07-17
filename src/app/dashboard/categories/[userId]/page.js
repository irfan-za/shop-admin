import updateAccessToken from "@/utils/updateAccessToken";
import {  PaperClipIcon, UserIcon } from "@heroicons/react/24/outline"
import { cookies } from "next/headers";
import Link from "next/link";

const getData=async(userId)=>{
  const fetchData = await fetch(`${process.env.API_URL}/api/users/${userId}`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'X-ACCESS-TOKEN': `${cookies().get('X-ACCESS-TOKEN')}`,  
    },
  });
  const result= await fetchData.json();
  console.log('✅✅User detail [userid] :',result);
  if(result.status === 200){
    return result.data;
  }
  else if(result.status === 401){
   const cookie= await updateAccessToken();
   console.log('ACCESS TOKEN =>',cookie.access_token, userId);
   const fetchData = await fetch(`${process.env.API_URL}/api/users/${userId}`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'X-ACCESS-TOKEN': `${cookie.access_token}`,  
    },
  });
  const result= await fetchData.json();
  console.log('✅User detail [userid] :',result);
  if(result.status === 200){
    return result.data;
  }
  }
  else if(result.status === 404){
    return console.log('404 not found');
  }
}


 export default async function RecapDetail({params}) {
  const data=await getData(params.userId);
  console.log('😎😎 data',data);
  

  return data && 
  // (data.status === 200 || data.status=== 401) ?  
   (
      <main className="px-4 py-6 sm:px-10 lg:px-20 container mx-auto border border-red-600">
        <div className=" border border-blue-600">
          <h3 className="text-base font-semibold leading-7 text-gray-900">Data Rekap Budi</h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">29 Mei 2020</p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Nama Lengkap</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Budi Gunawan</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Jumlah Rokok</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">12</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Aktivitas Fisik</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Berlari keliling lapangan</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Hambatan</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Teman mengajak untuk merokok</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Solusi</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                Memcoba mencari aktivitas lain agar lupa dengan rokok.
              </dd>
            </div>
          </dl>
        </div>
        <div className="mt-5 py-8 border-t border-slate-200 text-center">
          <div className="flex flex-wrap justify-center">
              <Link
              href={'/dashboard'}
              className="font-normal hover:cursor-pointer text-red-600 underline hover:no-underline">
                kembali
              </Link>
          </div>
        </div>
      </main>
  )
  // : <>loading user detail</>;
}


