'use client'
import { Line, Bar } from "react-chartjs-2"
import { CategoryScale, Chart, LineElement, BarElement, LinearScale, PointElement, Title, Legend, Filler, Tooltip } from "chart.js";
import { useEffect, useRef, useState } from "react";

  
Chart.register(CategoryScale, LineElement, BarElement, LinearScale, PointElement, Title, Legend, Filler, Tooltip );

const createGradientBackgroundRed=(ctx, area)=>{
  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
  gradient.addColorStop(0, 'rgba(252, 108, 135, 0.01)');
  gradient.addColorStop(1, 'rgba(252, 108, 135, 0.4)');
  return gradient;
}
const createGradientBackgroundBlue=(ctx, area)=>{
  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
  gradient.addColorStop(0, 'rgba(14, 165, 233, 0.01)');
  gradient.addColorStop(1, 'rgba(14, 165, 233, 0.4)');
  return gradient;
}

export default function UsersChart({currentChart, initialData}) {
  console.log(initialData);
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [data, setData] = useState({
    labels: initialData.map((currentData)=>{return currentData.name}),
      datasets: [
        {
        label: 'Usia',
        data: initialData.map((currentData)=>{return currentData.birth_date}),
        borderWidth: 2,
        borderColor: 'red',
        fill: true,
        cubicInterpolationMode: 'monotone',
      },
        {
        label: 'jumlah uang',
        data: [1, 4, 8, 6, 10, 11, 9, 10, 6, 7, 6, 4 ],
        borderWidth: 2,
        borderColor: 'blue',
        fill: true,
        cubicInterpolationMode: 'monotone',
      },
    ]
  });


  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) {
      return;
    }
    
    
  
    const chartData = {
      ...data,
      datasets: data.datasets.map((dataset, i) =>  {
        if(currentChart === 'bar'){
          if(i === 0){
            return ({
            ...dataset,
            borderWidth: 1,
            backgroundColor: 'rgba(252, 108, 135, 0.4)',
          })
        }
        else if(i === 1){
          return ({
            ...dataset,
            borderWidth: 1,
            backgroundColor: 'rgba(14, 165, 233, 0.4)',
          })
          }
        }
        else if(i === 0){
          return ({
          ...dataset,
          backgroundColor: createGradientBackgroundRed(chart.ctx, chart.chartArea),
        })
        }
        else if(i === 1){
          return ({
          ...dataset,
          backgroundColor: createGradientBackgroundBlue(chart.ctx, chart.chartArea),
        })
        }
      })
    };

    setChartData(chartData);
  }, [currentChart]);

  
  const options= {
    responsive: true,
    scales: {
      y: {
          // min : 0,
          // max : 20,
          ticks: {
            beginAtZero: true,
            stepSize: 1
          }
        }
    },
    plugins: {
      title: {
        text : "Grafik Usia",
        display: true,
        color: '#0071f2',
        font: {
          size: 20,
          weight: 'bold'
        }
      },
      legend:{
        display: true,
        position: 'top',
        labels:{
          color: 'blue',
          usePointStyle: true,
          pointStyle: 'rect',
        },
      }
    },
    animations: {
      tension: {
        duration: 1000,
        easing: 'easeInBounce',
        from: 1,
        to: 0,
        loop: true
      }
    },
    transitions: {
      show: {
        animations: {
          x: {
            from: 200
          },
          y: {
            from: 1000
          }
        }
      },
      hide: {
        animations: {
          x: {
            to: 200
          },
          y: {
            to: 1000
          }
        }
      },
      active: {
        animations: {
          properties: 'easeInCubic'
        }
      }
    }
  }
  return (
    <div className="-mx-4 -my-2 mt-8 md:px-6 lg:px-8 min-w-full h-32 sm:h-80 flex justify-center">
        {
          currentChart ==='line' ?
          <Line
          datasetIdKey='id'
          data={chartData}
          width={500} 
          height={300} 
          options={options}
          ref={chartRef}
          />
          :
          <Bar
          datasetIdKey='id'
          data={chartData}
          width={500} 
          height={300} 
          options={options}
          ref={chartRef}
            />
        }
    </div>
  )
}
