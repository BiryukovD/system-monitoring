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
            height: '80vh',

            // backgroundColor: '#f0f0f0',
            // margin: 50,
            // padding: '50',
            // border: "1px solid black"
            // borderRadius: "80px"
        },
        card: {
            // border: "1px solid black",
            // padding: '20px',
            // borderRadius: '30px', // Закругленные углы
            // boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', // Тень
            backgroundColor: '#fff', // Цвет фона рамки
            maxWidth: '600px', // Максимальная ширина
            width: '100%', // Ширина на весь контейнер
        },
        title: {
            fontSize: '2.5rem',
            marginBottom: '20px',
                border: "1px solid black"
            // textAlign: 'center',
        },
        osInfo: {
            listStyleType: 'none',
            padding: 0,
            fontSize: '1.2rem',
            textAlign: 'center',

        },
        osInfoItem: {
            margin: '10px 0',
            borderRadius: '30px', // Закругленные углы
            boxShadow: '1px 1px 1px 2px rgba(0, 0, 0, 0.1)', 
            // border: "0.1px solid black"
        },
        loadingText: {
            fontSize: '1.5rem',
        },
    };

    return (
        <div>
            <div>
                {/* <h1 style={styles.title}>Информация о системе</h1> */}
                {osInfo ? (
                    <ul style={styles.osInfo}>
                        {Object.entries(osInfo).map(([key, value]) => (
                            <li key={key} style={styles.osInfoItem}>
                                <strong>{key}:</strong> {String(value)}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p style={styles.loadingText}>Загрузка...</p>
                )}
            </div>
        </div>
    );
};

export default InfoOS;

