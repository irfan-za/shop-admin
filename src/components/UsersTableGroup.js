'use client'
import { useRef, useState } from "react";
import DatePicker from "@/components/ui/DatePicker";
import UsersTable from "./ui/UsersTable";
import UsersChart from "./ui/UsersChart";
import Pagination from "./Pagination";

export default function UsersTableGroup({users}) {
  const [data, setData] = useState(users)
  const [showDataType, setShowDataType] = useState('table')
  const [currentChart, setCurrentChart] = useState('line');
  const chartTypeRef = useRef(null);
  
  // function find data
  const findData=(e)=>{
    const inputSearch = e.target.value;
    const data = users?.filter((item)=>{
      return item.name.toLowerCase().includes(inputSearch.toLowerCase());
    })
    setData(data);
  }
  return (
    <section className="container mx-auto">
    <div className="mt-6 mb-8 md:flex md:items-center md:justify-between">
        <div className="inline-flex overflow-hidden bg-white border rounded-lg rtl:flex-row-reverse mt-4 md:mt-0">
            <DatePicker/>
        </div>
        <div className="flex items-end">
          <button value={'table'} onClick={(e)=>setShowDataType(e.target.value)}
          className={`${showDataType=='table' ? 'border-green-500 bg-green-100 bg-opacity-30' :' border-gray-300'} border-b-2 px-3 py-0.5 mt-4 md:mt-0`}>
            Tabel
          </button>
          <button value={'chart'} onClick={(e)=>setShowDataType(e.target.value)}
          className={`${showDataType=='chart' ? 'border-green-500 bg-green-100 bg-opacity-30' :' border-gray-300'} border-b-2 px-3 py-0.5 mt-4 md:mt-0`}>
            Grafik
          </button>
        </div>
        {
          showDataType==='table' ?
          (
          <div className="relative flex items-center mt-4 md:mt-0">
              <span className="absolute">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mx-3 text-gray-400 ">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
              </span>
                <input type="text" name="inputSearch" onChange={findData} placeholder="Cari data" className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5  focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
          </div>
          )
          :
          (
            <div className=" flex items-center mt-4 md:mt-0 space-x-4 text-gray-700 ">
              <label htmlFor="chartType">Tipe grafik : </label>
              <select 
              name="chartType" id="chartType" ref={chartTypeRef} 
              className="pr-8 py-0.5 border-b-2 border-green-500 bg-green-100 bg-opacity-25 rounded-md focus:outline-none focus:ring-0 focus:border-green-500 focus:border-b-2"
              onChange={()=> setCurrentChart(chartTypeRef.current?.value)}>
                <option value='line' >Line</option>
                <option value="bar" >Bar</option>
              </select>
          </div>
          )
        }
    </div>
    <div className="flex flex-col space-y-8 justify-between">
      {
        showDataType==='table' ?
        (
          <>
            <UsersTable data={data} />
            <Pagination />
          </>
        )
        :
        (
          <>
          <UsersChart currentChart={currentChart} initialData={data} />
            <span className="py-8 "> </span>
          </>
        )
      }
    </div>
</section>
  )
}
