// import React, { useState, useEffect } from 'react';

// const InfoOS = () => {
//     const [osInfo, setOsInfo] = useState(null);
  
//     useEffect(() => {
//       const fetchOsInfo = async () => {
//         const data = await window.electronAPI.infoOS();
//         setOsInfo(data);
//       };
  
//       fetchOsInfo();
//     }, []);
  
//     return (
//       <div className="container">
//         {/* <h1 style={ {textAlign: "center"} } className="title">Информация о системе</h1> */}
//         {osInfo ? (
//           <ul className="osInfo">
//             {Object.entries(osInfo).map(([key, value]) => (
//               <li key={key}>
//                 <strong>{key}:</strong> {String(value)}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="osInfo">Загрузка...</p>
//         )}
//       </div>
//     );
// };

// export default InfoOS;
import React, { useState, useEffect } from 'react';


const InfoOS = () => {
    const [osInfo, setOsInfo] = useState(null);

    useEffect(() => {
        const fetchOsInfo = async () => {
            const data = await window.electronAPI.infoOS();
            setOsInfo(data);
        };

        fetchOsInfo();
    }, []);

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            // height: '80vh',
        },
        card: {
            backgroundColor: '#fff',
            maxWidth: '600px',
            width: '100%',
            padding: '20px',
            // borderRadius: '30px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        },
        title: {
            fontSize: '2.5rem',
            marginBottom: '20px',
            textAlign: 'center',
        },
        osInfo: {
            listStyleType: 'none',
            padding: 0,
            fontSize: '1.2rem',
            textAlign: 'center',
        },
        osInfoItem: {
            margin: '10px 0',
            borderRadius: '5px',
            boxShadow: '1px 1px 2px 2px rgba(0, 0, 0, 0.1)',
            padding: '10px 30px',
            color: '#777', 
            
        },
        loadingText: {
            fontSize: '1.5rem',
        },
    };

    const renderOsInfo = () => {
        if (!osInfo) {
            return <p style={styles.loadingText}>Загрузка...</p>;
        }

        const uefiStatus = osInfo.uefi ? 'Используется' : 'Не используется';

        return (
            <ul style={styles.osInfo}>
                <li style={styles.osInfoItem}><strong>Платформа:</strong> {osInfo.platform}</li>
                <li style={styles.osInfoItem}><strong>Дистрибутив:</strong> {osInfo.distro}</li>
                <li style={styles.osInfoItem}><strong>Версия:</strong> {osInfo.release}</li>
                <li style={styles.osInfoItem}><strong>Кодовое имя:</strong> {osInfo.codename}</li>
                <li style={styles.osInfoItem}><strong>Ядро:</strong> {osInfo.kernel}</li>
                <li style={styles.osInfoItem}><strong>Разрядность:</strong> {osInfo.arch}</li>
                <li style={styles.osInfoItem}><strong>Имя хоста:</strong> {osInfo.hostname}</li>
                <li style={styles.osInfoItem}><strong>Серийный номер:</strong> {osInfo.serial}</li>
                <li style={styles.osInfoItem}><strong>UEFI:</strong> {uefiStatus}</li>
            </ul>
        );
    };

    return (
        <div style={styles.container}>
            
                {/* <h1 style={styles.title}>Информация о системе</h1> */}
                {renderOsInfo()}
    
        </div>
    );
};

export default InfoOS;


