'use client'

import clearForm from "@/utils/clearForm";
import { useRouter } from "next/navigation";

export default function MessageForm({noTelpon}) {
  const router = useRouter()
  const kirimPesan=(e)=>{
    let message=e.target.pesan.value;
    e.preventDefault();
    console.log(typeof(message));
    if(noTelpon){
    // if(!noTelpon){
      alert('Tidak ada no telpon penerima!')
    }
    else if(message !==''){
      message= encodeURI(message);
      window.open(`https://api.whatsapp.com/send?phone=628560290494&text=${message}`, '_blank');
      // router.push(`https://api.whatsapp.com/send?phone=${noTelpon}&text=${message}`)
      console.log(message);
    }
    // clearForm(e);
  }
  return (
    <div className="mt-10 py-10 border-t border-slate-200 text-center">
      <div className="flex flex-wrap flex-col justify-center">
          <h4 className="font-semibold text-lg">Pesan Ke Remaja: </h4>
          <form action="" method="POST" onSubmit={kirimPesan}>
            <div className="w-full lg:w-9/12 mx-auto px-4 my-3 text-slate-700">
                <div className="flex justify-between space-x-4">
                  <span className="basis-1/2 flex justify-end ">
                    <label for="pesan" className="w-1/3 inline-block text-left font-medium">Pesan</label>
                  </span>
                  <span>:</span>
                  <span className="basis-1/2 text-left">
                    <textarea type="text" name="pesan"id="" cols="30" rows="4" className="border focus:border-2 box-border rounded-md border-slate-400 focus:border-green-400 focus:ring-0 transition-colors duration-300 ease-in " />
                  </span>
                </div>
                <div className=" flex justify-between space-x-4 ">
                <span className="basis-1/2 "></span>
                  <span className="basis-1/2 ">
                    <button type="submit" className="py-1 px-4 rounded-md mt-6 bg-sky-500 hover:bg-sky-600 text-white font-medium cursor-pointer" >
                      Kirim pesan
                    </button>
                  </span>
                </div>
            </div>
          </form>
      </div>
    </div>
  )
}
