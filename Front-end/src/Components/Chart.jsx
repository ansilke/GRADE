import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
  } from 'recharts';
  

function Chart() {
    const data = [
        { name: 'Mentors', Total: 8 },
        { name: 'students', Total: 4 },
        { name: 'Courses', Total: 6 },
  
      ];
    
      // Custom bar shape with drop shadow
      const ShadowBar = (props) => {
        const { x, y, width, height, fill } = props;
        return (
          <>
            <defs>
               
              <filter id="bar-shadow" x="-20%" y="-20%" width="140%" height="140% ">
                <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0B1D51" />
              </filter>
            </defs>
            <rect
              x={x}
              y={y}
              width={100}
              height={height}
              fill={fill}
              rx={6}
              ry={6}
              filter="url(#bar-shadow)"
            />
          </>
        );
      };
    
      return (
        <div style={{ padding: '20px' }}>
          <BarChart width={900} height={300} data={data}>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" stroke="#0B1D51"  />
            <YAxis />
            <Tooltip wrapperStyle={{ backgroundColor: '#f5f5f5' }} />
            <Bar
              dataKey="Total"
              fill="#23597B"
              shape={<ShadowBar />}
              barSize={40}
            />
          </BarChart>
        </div>
      );
    }

    export default Chart;
