import ButtonAdd  from '@/components/ButtonAdd';
import ProductsTable from '@/components/ProductsTableGroup';
import {getData} from "@/utils/getData";



export default async function Products() { 
  const products= await getData(`${process.env.API_URL}/products`);

   return (
    <section className='flex flex-col min-h-screen'>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">Products</h1>
        </div>
      </header>
      <main className="flex-1 inline-flex">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 flex-1">
          <ProductsTable products={products}/>
          <ButtonAdd typeModal={'product'} />
        </div>
      </main>
    </section>
  )

}