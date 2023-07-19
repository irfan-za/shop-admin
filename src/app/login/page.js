'use client'
import clearForm from "@/utils/clearForm";
import { useRouter } from "next/navigation";
import Image from "next/image";
  

export default function Login(){
  const router=useRouter();

  const login =async(e)=>{
    e.preventDefault();
    const res= await fetch(`${process.env.API_URL}/auth/login`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Connection': 'keep-alive',
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value
    })
    })
    if(res.ok){
      const result = await res.json();
      // set cookies
      const d = new Date();
      d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000)); // Menambahkan 7 hari dalam milidetik
      const expires = "expires=" + d.toUTCString();
      document.cookie = "token=123; " + expires + ";";
      
      statusMessage.classList.remove('text-red-600');
      statusMessage.classList.add('text-green-600');
      statusMessage.innerHTML='successfully logged in!';
      router.push('/dashboard')
    }else{
      statusMessage.classList.remove('text-green-600');
      statusMessage.classList.add('text-red-600');
      statusMessage.innerHTML='Username or password incorect!'
    }
    
    clearForm(e);
  }
  
  

  
  return(
      <body className="h-screen flex flex-col md:flex-row md:items-center" >

          <div className="hidden md:inline justify-center md:w-1/2 h-full overflow-hidden bg-sky-200">
            <p className="text-lg max-w-xs mx-auto my-44 ">Data collection and monitoring of product data is easier with
              <b className="text-red-500"> Shop Admin</b>
            </p>
            <Image width={300} height={500} src={"/assets/girlSignIn.svg"} alt="" className="absolute bottom-10 left-6 z-10" />
            <Image width={800} height={1600} src={"/assets/shape.svg"} alt="" className="relative bottom-36 -left-24 rotate-90" />

          </div>

          <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 md:w-1/2">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="" method="POST" onSubmit={login}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="johnd"
                  requisky
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-sky-600 hover:text-sky-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="m38rmF$"
                  requisky
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className='grid grid-cols-12 mt-6'>
                <span className='col-start-2 col-span-10 font-normal text-md' id='statusMessage'></span>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-sky-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              >
                Login
              </button>
            </div>
          </form>

        </div>
          </div>
      </body>
  )
}




