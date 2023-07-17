'use client'
import { Line, Bar } from "react-chartjs-2"
import { CategoryScale, Chart, LineElement, BarElement, LinearScale, PointElement, Title, Legend, Filler, Tooltip } from "chart.js";
import { useEffect, useRef, useState } from "react";
import { getData } from "@/utils/getData";

  
Chart.register(CategoryScale, LineElement, BarElement, LinearScale, PointElement, Title, Legend, Filler, Tooltip );
  
export const data = {
  labels: ['day 1', 'day 2', 'day 3', 'day 4', 'day 5', 'day 6', 'day 7', 'day 8', 'day 9', 'day 10', 'day 11', 'day 12'],
    datasets: [
      {
      label: 'products sold',
      data: [12, 13, 10, 9, 6, 8, 6, 10, 11, 9, 10, 11],
      borderWidth: 2,
      borderColor: 'red',
      fill: true,
      cubicInterpolationMode: 'monotone',
    },
      {
      label: 'products stock',
      data: [1, 4, 8, 6, 10, 11, 9, 10, 6, 7, 6, 4 ],
      borderWidth: 2,
      borderColor: 'blue',
      fill: true,
      cubicInterpolationMode: 'monotone',
    },
  ]
}
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

export default function ProductsChart({currentChart}) {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({
    datasets: [],
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
        text : "Sales Chart",
        display: true,
        color: '#D0d099',
        font: {
          size: 20,
          weight: 'bold'
        }
      },
      legend:{
        display: true,
        position: 'top',
        color: 'green',

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
    <div className="-mx-4 -my-2 mt-8 md:px-6 lg:px-8 min-w-full h-32 sm:h-80 flex justify-center border border-green-500">
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
