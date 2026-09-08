import { useState } from 'react'
import './App.css'
import SumTime from './component/SumTime.tsx'
import TimeChart from './component/TimeChart.tsx'
import History from './component/History.tsx'
import Register from './component/Register.tsx'
import type {dataType} from './type/type.ts'
import {defaultData} from './data/data.ts'

function App() {
  const [data, setData] = useState<dataType[]>(defaultData)

  return (
    <div className='p-5'>
    <p className='text-xl'>Weekly Study Log</p>
    <div className='block md:flex md:gap-12 mt-10'>
      <div className='md:w-3/4 h-full space-y-6'>
        <SumTime 
          data={data}
        />
        <TimeChart
          data={data}
        />
        <History 
          data={data}
          setData={setData}
        />
      </div>
      <div className='mt-8 md:w-1/4 h-full'>
        <Register 
          data={data}
          setData={setData}
        />
      </div>
    </div>
    </div>
  )
}

export default App
