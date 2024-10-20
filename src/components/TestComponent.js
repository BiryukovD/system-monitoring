import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CircularProgress from '@mui/material/CircularProgress';

const CpuFrequencyChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cpuInfo, setCpuInfo] = useState(null);

  useEffect(() => {
    const fetchCpuFrequency = async () => {
      try {
        const result = await window.electronAPI.infoCPU(); // Ваш API
        setCpuInfo(result);

        const formattedData = {
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          frequency: result.speed,
        };

        setData((prevData) => [...prevData, formattedData]);
      } catch (err) {
        setError('Не удалось загрузить данные');
      } finally {
        setLoading(false);
      }
    };

    const intervalId = setInterval(fetchCpuFrequency, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {loading && !error ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
            <CircularProgress />
        </div>
      ) : error ? (
        <p style={styles.error}>{error}</p>
      ) : (
        <div>
            <div style={styles.cpuInfoContainer}>
            <p style={styles.text}><strong>Модель:</strong> {cpuInfo.brand}</p>
            <p style={styles.text}><strong>Текущая частота:</strong> {cpuInfo.speed} GHz</p>
            </div>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="frequency" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>

          {/* Отображаем информацию о CPU под графиком */}
          {/* {cpuInfo && (
            <div style={styles.cpuInfoContainer}>
              <h3 style={styles.title}>Информация о CPU:</h3>
              <p style={styles.text}><strong>Производитель:</strong> {cpuInfo.manufacturer}</p>
              <p style={styles.text}><strong>Модель:</strong> {cpuInfo.brand}</p>
              <p style={styles.text}><strong>Текущая частота:</strong> {cpuInfo.speed} GHz</p>
              <p style={styles.text}><strong>Минимальная частота:</strong> {cpuInfo.speedMin} GHz</p>
              <p style={styles.text}><strong>Максимальная частота:</strong> {cpuInfo.speedMax} GHz</p>
              <p style={styles.text}><strong>Количество ядер:</strong> {cpuInfo.cores}</p>
              <p style={styles.text}><strong>Количество физических ядер:</strong> {cpuInfo.physicalCores}</p>
              <p style={styles.text}><strong>Виртуализация:</strong> {cpuInfo.virtualization ? 'Поддерживается' : 'Не поддерживается'}</p>
            </div>
          )} */}
        </div>
      )}
    </div>
  );
};

const styles = {
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
  cpuInfoContainer: {
    display: 'flex',
    justifyContent: "space-between",
    marginTop: '20px',
    padding: '10px',
    // border: '1px solid #ccc',
    borderRadius: '5px',
  },
  title: {
    color: '#555', // Серый цвет для заголовка
  },
  text: {
    color: '#777', // Серый цвет для текста
  },
};

export default CpuFrequencyChart;
