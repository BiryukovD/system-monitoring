import React, { useState, useEffect }  from 'react'

const InfoCPU = () => {
    const [cpuInfo, setCpuInfo] = useState(null);
  
    useEffect(() => {
      const fetchCpuInfo = async () => {
        const data = await window.electronAPI.infoCPU();
        setCpuInfo(data);
      };
  
      fetchCpuInfo();
    }, []);
  
    return (
      <div className="container">
        {/* <h1 style={ {textAlign: "center"} } className="title">Информация о ЦП</h1> */}
        {cpuInfo ? (
          <ul className="cpuInfo">
            {Object.entries(cpuInfo).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {String(value)}
              </li>
            ))}
          </ul>
        ) : (
          <p className="cpuInfo">Загрузка...</p>
        )}
      </div>
    );
  };
export default InfoCPU