import ShowRecap from "@/components/ShowRecap";
import { getData } from "@/utils/getData";
 

export default async function RecapPerUser() {
  const {data}= await getData(`${process.env.API_URL}/users/1}`);
  return (
    <div className="px-4 py-6 sm:px-10 lg:px-20 container mx-auto ">
      <h1>RecapPerUser</h1>
      <p>===================== ini bagian tabel ========================</p>
      <ShowRecap/>
      
    </div>
  )
}