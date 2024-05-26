"use client"

import { Legend, RadialBar, RadialBarChart, Tooltip } from "recharts";

const data = [
    {
      name: "Outstanding Tasks",
      uv: 31.47,
      pv: 2400,
      fill: "#8884d8",
    },
    {
      name: "25-29",
      uv: 26.69,
      pv: 4567,
      fill: "#83a6ed",
    },
    {
      name: "30-34",
      uv: -15.69,
      pv: 1398,
      fill: "#8dd1e1",
    },
    
  ];
export function ProjectStats1() {
    return <RadialBarChart 
    width={730} 
    height={250} 
    innerRadius="10%" 
    outerRadius="250%" 
    data={data} 
    startAngle={180} 
    endAngle={0}
  >
    <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise={true} dataKey='uv' legendType="none"/>
    <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="right" />
    <Tooltip />
  </RadialBarChart>
}
export function ProjectStats2() {
  return <RadialBarChart 
  width={730} 
  height={250} 
  innerRadius="10%" 
  outerRadius="250%" 
  data={data} 
  startAngle={180} 
  endAngle={0}
>
  <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise={true} dataKey='uv' legendType="none"/>
  <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="right" />
  <Tooltip />
</RadialBarChart>
}
export function ProjectStats3() {
  return <RadialBarChart 
  width={730} 
  height={250} 
  innerRadius="10%" 
  outerRadius="250%" 
  data={data} 
  startAngle={180} 
  endAngle={0}
  
>
  <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise={true} dataKey='pv' legendType="none"/>
  <Legend iconSize={10} width={120} height={140} layout='radial' verticalAlign='middle' align="left" />
  <Tooltip />
</RadialBarChart>
}