"use client"

import React, { useState } from 'react';
import { Cell, Pie, PieChart } from 'recharts';
import { CategoricalChartState } from 'recharts/types/chart/generateCategoricalChart';




const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },

];

const COLORS = ['#0088FE', '#00C49F'];

export default function TransactionSuccessRate() {

  const [activeIndex, setActiveIndex] = useState(0)


  const onPieEnter = (_: CategoricalChartState, index: React.SetStateAction<number>) => {
    setActiveIndex(index)
  };

  return (
    <div className="flex flex-col rounded-lg border border-solid border-gray-10 px-7 py-5">
      <div className="flex flex-col justify-center space-y-2 text-center">
        <p className="font-CenturyGothic text-base font-bold leading-6 text-gray-80">Transaction success rate</p>
        <p>Percentage of valid transactions carried out this month</p>
      </div>

      <div>
        <PieChart width={100} height={100} onMouseEnter={onPieEnter} className='bg-orange-700'>
          <Pie
            cx={50}
            cy={50}
            data={data}
            innerRadius={40}
            outerRadius={50}
            fill="#8884d8"
            paddingAngle={0}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

        </PieChart>
      </div>

    </div>)
}