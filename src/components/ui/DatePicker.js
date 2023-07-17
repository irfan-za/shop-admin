"use client"

import { format } from "date-fns";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { id } from 'date-fns/locale';

export default function DatePicker() {
  const [range, setRange] = useState(null);
  const [show, setShow] = useState(false);

  let footer = <p className="mt-4 font-medium text-center">Pilih tanggal terlebih dahulu.</p>;
  if (range?.from) {
    console.log(range.from, range.to);
    if (!range.to) {
      footer = <p className="mt-4 font-medium text-center">{format(range.from, 'PP')}</p>;
    } else if (range.to) {
      footer = (
        <p className="mt-4 font-medium text-center">
          {format(range.from, 'PP')} – {format(range.to, 'PP')}
        </p>
      );
    }
  }

  return (
    <div>
      <button onClick={()=>setShow(!show)} className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm rounded-md">{show ? (range? 'Oke': 'Pilih tanggal') : 'Pilih tanggal'}</button>
      <br />
      {
         show && (
           <DayPicker
           className="absolute z-10 p-4 rounded-lg bg-gray-100 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60 border border-gray-200"
             defaultMonth={new Date()}
             mode="range"
             min={2}
             max={30}
             locale={id}
             selected={range}
             onSelect={setRange}
             modifiersClassNames={{
              selected: 'selected',
              today: 'today',
              range_start: 'range-start',
              range_end: 'range-end',
            }}
            modifiersStyles={{
              disabled: { fontSize: '75%' }
            }}
             footer={footer}
           />
         )
      }

    </div>
  );
}
