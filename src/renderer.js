import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Info } from '@mui/icons-material';
// import './App.css';  

import MyBottomNavigation from './components/MyBottomNavigation';
import InfoOS from './components/InfoOS';
import InfoCPU from './components/InfoCPU'
import InfoMemory from './components/InfoMemory'
import { border } from '@mui/system';




const App = () => {
    const [currentTab, setcurrentTab] = useState('ОС')

    const handleChange = (data) => {
        setcurrentTab(data)
        console.log(data)
    }

    const styles = {
      container: {
        // border: "1px solid black",
        marginTop: "3px"

      },
      content: {
            borderRadius: '40px', // Закругленные углы
            boxShadow: '2px 2px 6px 4px rgba(0, 0, 0, 0.1)', // Тень
            padding: "1% 20%" ,
            marginTop: "4%",
            // backgroundColor: "blue"
      }
    }

  return (
    <div style={styles.container}>
    <MyBottomNavigation onChange={handleChange}/>
    <div style={styles.content}>
    {currentTab === "ОС" && <InfoOS/>}
    {currentTab === "Процессор" && <InfoCPU/>}
    {currentTab === "Оперативная память" && <InfoMemory/>}
    </div>
 </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
