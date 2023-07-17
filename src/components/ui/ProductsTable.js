import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import PopoverMenu from "./PopoverMenu";

export default function ProductsTable({data}) {
  
  const [sorting, setSorting] = useState([]);
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("id", {
      header: "Id",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("title", {
      header: "Title",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("price", {
      header: "Price",
      cell: (info) => {
        return info.getValue();
      },
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("rating", {
      header: "Rating",
      cell: (info) => info.getValue().rate,
    }),
  ];
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  return (
    <div className="flex flex-col">
        <div className="-mx-4 -my-2">
            <div className="inline-block min-w-full py-4 align-middle md:px-6 lg:px-8">
                <div className="border border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 ">
                        <thead className="bg-gray-50 rounded-lg">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                              {headerGroup.headers.map((header) => (
                                <th key={header.id} colSpan={header.colSpan}
                                scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500">
                                {header.isPlaceholder ? null : (
                                  <div
                                    {...{
                                      className: header.column.getCanSort()
                                        ? 'cursor-pointer select-none'
                                        : '',
                                      onClick: header.column.getToggleSortingHandler(),
                                    }}
                                  >
                                    {flexRender(
                                      header.column.columnDef.header,
                                      header.getContext()
                                    )}
                                    {{
                                      asc: ' 🔼',
                                      desc: ' 🔽',
                                    }[header.column.getIsSorted()] ?? null}
                                  </div>
                                )}
                              </th>
                              ))}
                              <th scope="col" className="relative py-3.5 px-4">
                                  <span className="sr-only">Edit</span>
                              </th>                              
                            </tr>
                          ))}
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {table.getRowModel().rows.map((row) => (
                              <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                  <td key={cell.id}
                                  className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap max-w-xs truncate">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                  </td>
                                ))}
                                  <td className="px-4 py-4 text-sm text-right whitespace-nowrap">
                                      <PopoverMenu productId={parseInt(row.id)+1} />
                                      
                                  </td>                                  
                              </tr>
                            ))} 
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>   
  )
}
