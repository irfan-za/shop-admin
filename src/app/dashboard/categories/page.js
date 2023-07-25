"use client"
import ButtonAdd  from '@/components/ButtonAdd';
import ProductsTableGroup from '@/components/ProductsTableGroup';
import SkeletonNav from '@/components/ui/SkeletonNav';
import SkeletonTable from '@/components/ui/SkeletonTable';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import useSWR from 'swr'


const getData=async(url)=>{
  const res= await fetch(url)
  const data= await res.json();
  return data
}

export default function Categories() { 
  const searchParam= useSearchParams()
  const router= useRouter()
  if(!searchParam.get('category')){
    router.replace('/dashboard/categories?category=electronics')
  }

  const {data:categories}= useSWR(`${process.env.API_URL}/products/categories`, getData)
  const {data:products} = useSWR(`${process.env.API_URL}/products/category/${searchParam.get('category')}`, getData)
  console.log(searchParam.get('category'));
   return (
    <section className='flex flex-col min-h-screen'>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {
            categories ? categories.map(category => {
              return <Link 
              key={category} 
              href={`/dashboard/categories?category=${category}`}
              className={`${searchParam.get('category') === category ? 'bg-slate-900 text-white' : 'text-slate-900'} transition-colors duration-300 ease-in-out px-4 py-2 rounded-md mx-4`}
               >{category}</Link>
            })
            :
            <SkeletonNav/>
          }
        </div>
      </header>
      <main className="flex-1 inline-flex">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 flex-1">
          {
            products ?
          <ProductsTableGroup products={products}/>
          :
          <SkeletonTable/>
          }
          <ButtonAdd typeModal={'product'} />
        </div>
      </main>
    </section>
  )

}