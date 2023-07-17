
import { getData } from "@/utils/getData";
import Image from "next/image";
import Link from "next/link";




 export default async function ProductDetail({params}) {
  const data=await getData(`${process.env.API_URL}/products/${params.productId}`);
  console.log(data);
  return data && 
   (
    <>
      <main>
        <section className="relative block h-96">
          <div className="absolute top-0 w-full h-full bg-center bg-cover bg-sky-600" >
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
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center mb-24 ">
                      <Image width={150} height={300} alt={data.title} src={data.image} className="shadow-xl rounded-lg align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 "/>
                  </div>
                </div>
                <div className="text-center mt-24">
                  <h3 className="text-lg sm:text-xl font-semibold leading-normal text-slate-700 mb-2">
                  {data && data.title}
                  </h3>
                  <div className="w-full lg:w-9/12 mx-auto px-4 mb-2 text-slate-700 mt-8">
                    <p className=" flex justify-between space-x-4 ">
                      <span className="basis-1/2 flex justify-end">
                        <span className="w-1/2 inline-block text-left font-medium">Price</span>
                      </span>
                      <span>:</span>
                      <span className="basis-1/2 text-left" >{data && data.price}</span>
                    </p>
                    <p className=" flex justify-between space-x-4 ">
                      <span className="basis-1/2 flex justify-end">
                        <span className="w-1/2 inline-block text-left font-medium">Rating</span>
                      </span>
                      <span>:</span>
                      <span className="basis-1/2 text-left" >{data && data.rating.rate}</span>
                    </p>
                    <p className=" flex justify-between space-x-4 ">
                      <span className="basis-1/2 flex justify-end">
                        <span className="w-1/2 inline-block text-left font-medium">Description</span>
                      </span>
                      <span>:</span>
                      <span className="basis-1/2 text-left" >{data && data.description}</span>
                    </p>
                  </div>
                </div>


                <div className="mt-5 py-8 border-t border-slate-200 text-center">
                  <div className="flex flex-wrap justify-center">
                      <Link
                      href={'/dashboard'}
                      className="font-normal hover:cursor-pointer text-red-600 underline hover:no-underline">
                        back
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
}


