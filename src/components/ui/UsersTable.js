import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import PopoverMenu from "./PopoverMenu";
import { useState } from "react";

export default function UsersTable({data}) {
  
  const [sorting, setSorting] = useState([]);
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("id", {
      header: "Id",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("name", {
      header: "Nama",
      cell: (info) => (info.getValue().firstname +" "+ info.getValue().lastname),
    }),
    columnHelper.accessor("username", {
      header: "Username",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => {
        return info.getValue();
      },
    }),
    columnHelper.accessor("phone", {
      header: "No. Telpon",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("address", {
      header: "Alamat",
      cell: (info) => info.getValue().street,
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
                                  className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                  </td>
                                ))}
                                  <td className="px-4 py-4 text-sm text-right whitespace-nowrap">
                                      <PopoverMenu userId={data[row.id].id} />
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
