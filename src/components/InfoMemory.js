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
          { name: 'Используемая память', value: parseFloat(data.used) },
          { name: 'Свободная память', value: parseFloat(data.free) },
        ];
        setMemoryInfo(formattedData);
      } catch (err) {
        setError('Не удалось загрузить данные');
      } finally {
        setLoading(false);
      }
    };

    // Выполняем запрос при рендеринге компонента
    fetchMemoryInfo();
  }, []);

  const COLORS = ['#FF9999', '#99FF99'];

  return (
    <div style={styles.container}>
      {loading && !error ? (
        <p style={styles.loading}>Загрузка...</p>
      ) : error ? (
        <p style={styles.error}>{error}</p>
      ) : (
        <PieChart width={550} height={490}>
          <Pie
            data={memoryInfo}
            labelLine={false}
            outerRadius={160}
            fill="#8884d8"
            dataKey="value"
            animation
            label={({ name, value }) => {
              return `${value.toFixed(2)} Гб`;
            }}
            isAnimationActive={true}
          >
            {memoryInfo.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend align='center' />
        </PieChart>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#888',
  },
  error: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'red',
  },
};

export default InfoMemory;
