import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const InfoCPU = () => {
    const [cpuInfo, setCpuInfo] = useState(null);

    useEffect(() => {
        const fetchCpuInfo = async () => {
            const data = await window.electronAPI.infoCPU();
            setCpuInfo(data);
        };

        // Запрашиваем данные каждые 200 мс
        const intervalId = setInterval(fetchCpuInfo, 1000);

        // Очищаем интервал при размонтировании компонента
        return () => clearInterval(intervalId);
    }, []);

    const renderCpuInfo = () => {
        if (!cpuInfo) {
            return <p className="cpuInfo">Загрузка...</p>;
        }

        const virtualizationStatus = cpuInfo.virtualization ? 'Поддерживается' : 'Не поддерживается';

        return (
            <ul className="cpuInfo">
                <li><strong>Производитель:</strong> {cpuInfo.manufacturer}</li>
                <li><strong>Модель:</strong> {cpuInfo.brand}</li>
                <li><strong>Текущая частота:</strong> {cpuInfo.speed} GHz</li>
                <li><strong>Минимальная частота:</strong> {cpuInfo.speedMin} GHz</li>
                <li><strong>Максимальная частота:</strong> {cpuInfo.speedMax} GHz</li>
                <li><strong>Количество ядер:</strong> {cpuInfo.cores}</li>
                <li><strong>Количество физических ядер:</strong> {cpuInfo.physicalCores}</li>
                <li><strong>Виртуализация:</strong> {virtualizationStatus}</li>
            </ul>
        );
    };

    return (
        <div className="container">
            {renderCpuInfo()}
        </div>
    );
};

export default InfoCPU;
