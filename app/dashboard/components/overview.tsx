"use client"
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const data = [
  {
    name: 'Jan',
    total: Math.floor(Math.random() * 5000) + 1000,
    newIncome: Math.floor(Math.random()*2000)+250,
    lostIncome:-Math.floor(Math.random()*750)
  },
  {
    name: 'Feb',
    total: Math.floor(Math.random() * 5000) + 1000,
    newIncome: Math.floor(Math.random()*2000)+250,
    lostIncome:-Math.floor(Math.random()*750)
  },
  {
    name: 'Mar',
    total: Math.floor(Math.random() * 5000) + 1000,
    newIncome: Math.floor(Math.random()*2000)+250,
    lostIncome:-Math.floor(Math.random()*750)
  },
  {
    name: 'Apr',
    total: Math.floor(Math.random() * 5000) + 1000,
    newIncome: Math.floor(Math.random()*2000)+250,
    lostIncome:-Math.floor(Math.random()*750)
  },
  {
    name: 'May',
    total: Math.floor(Math.random() * 5000) + 1000,
    newIncome: Math.floor(Math.random()*2000)+250,
    lostIncome:-Math.floor(Math.random()*750)
  },
  {
    name: 'Jun',
    total: Math.floor(Math.random() * 5000) + 1000,
    newIncome: Math.floor(Math.random()*2000)+250,
    lostIncome:-Math.floor(Math.random()*750)
  },
  {
    name: 'Jul',
    total: Math.floor(Math.random() * 5000) + 1000,
    newIncome: Math.floor(Math.random()*2000)+250,
    lostIncome:-Math.floor(Math.random()*750)
  },
  {
    name: 'Aug',
    total: Math.floor(Math.random() * 5000) + 1000,
    newIncome: Math.floor(Math.random()*2000)+250,
    lostIncome:-Math.floor(Math.random()*750)
  },
  {
    name: 'Sep',
    total: Math.floor(Math.random() * 5000) + 1000,
    newIncome: Math.floor(Math.random()*2000)+250,
    lostIncome:-Math.floor(Math.random()*750)
  },
  {
    name: 'Oct',
    total: Math.floor(Math.random() * 5000) + 1000,
    newIncome: Math.floor(Math.random()*2000)+250,
    lostIncome:-Math.floor(Math.random()*750)
  },
  {
    name: 'Nov',
    total: Math.floor(Math.random() * 5000) + 1000,
    newIncome: Math.floor(Math.random()*2000)+250,
    lostIncome:-Math.floor(Math.random()*750)
  },
  {
    name: 'Dec',
    total: Math.floor(Math.random() * 5000) + 1000,
    newIncome: Math.floor(Math.random()*2000)+250,
    lostIncome:-Math.floor(Math.random()*750)
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey='name'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip />
        <Legend />
        <Bar
          dataKey='newIncome'
          fill='currentColor'
          radius={[4, 4, 0, 0]}
          className=' fill-slate-600'
          
        />
        <Bar
          dataKey='total'
          fill='newColor'
          radius={[4, 4, 0, 0]}
          className='fill-primary'
          
        />
        <Bar
          dataKey='lostIncome'
          fill='currentColor'
          radius={[4, 4, 0, 0]}
          className='fill-red-500'
          
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
