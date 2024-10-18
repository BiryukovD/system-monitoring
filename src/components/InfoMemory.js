import { Padding } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const InfoMemory = () => {
  const [memoryInfo, setMemoryInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMemoryInfo = async () => {
      try {
        const data = await window.electronAPI.infoMemory();
        const formattedData = [
          { name: 'Используемая память', value: parseFloat(data.used) }, // Преобразуем строку в число
          { name: 'Свободная память', value: parseFloat(data.free) },
        ];
        setMemoryInfo(formattedData);
        setLoading(false);
      } catch (err) {
        setError('Не удалось загрузить данные');
        setLoading(false);
      }
    };

    fetchMemoryInfo();
  }, []);

  const COLORS = ['#FF9999', '#99FF99']; // Ярко-пастельный красный и ярко-пастельный зеленый

  return (
    <div style={styles.container}>
      {/* <h1 style={styles.title}>Информация об оперативной памяти</h1> */}
      {loading && !error ? (
        <p style={styles.loading}>Загрузка...</p>
      ) : error ? (
        <p style={styles.error}>{error}</p>
      ) : (
        <>
         
          <PieChart width={550} height={490}>
            <Pie
              data={memoryInfo}
              // cx={300}
              // cy={300}
              labelLine={false}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
              animationDuration={0}
              // animation={false}
              label={({ name, value }) => {
                return `${value.toFixed(2)} Гб`; // Форматируем значение на диаграмме
              }}
            >
              {memoryInfo.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
    
            <Legend align='center' />
   
          </PieChart>
        </>
      )}
    </div>
  );
};

const styles =
 {
  container: {
    
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // height: '100vh',
    // paddingBottom: '200px',
    // boxSizing: 'border-box',
  },
  // title: {
  //   textAlign: 'center',
  //   // marginBottom: '20px',
  // },
  // loading: {
  //   fontSize: '18px',
  //   fontWeight: 'bold',
  //   color: '#888',
  // },
  // error: {
  //   fontSize: '18px',
  //   fontWeight: 'bold',
  //   color: 'red',
  // },
  // memoryInfo: {
  //   listStyle: 'none',
  //   padding: '0',
  //   // marginBottom: '30px',
  // },
  // listItem: {
  //   fontSize: '18px',
  //   // marginBottom: '10px',
  // },
};

export default InfoMemory;
