import ShowRecap from "@/components/ShowRecap";
import { getUsers } from "@/utils/getData";
 

export default async function RecapPerUser() {
  const {data}= await getUsers(`${process.env.API_URL}/api/users?page=1&per_page=${process.env.PER_PAGE}}`);
  return (
    <div className="px-4 py-6 sm:px-10 lg:px-20 container mx-auto ">
      <h1>RecapPerUser</h1>
      <p>===================== ini bagian tabel ========================</p>
      <ShowRecap/>
      
    </div>
  )
}