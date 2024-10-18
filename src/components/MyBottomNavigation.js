import React, { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ComputerIcon from '@mui/icons-material/Computer';
import MemoryIcon from '@mui/icons-material/Memory';
import StorageIcon from '@mui/icons-material/Storage';

const MyBottomNavigation = ({ onChange }) => {
    const [value, setValue] = useState(0);

    const labels = ['ОС', 'Процессор', 'Оперативная память'];

    const handleChange = (event, newValue) => {
        setValue(newValue);
        // console.log(labels[newValue]); // Логируем метку
        onChange(labels[newValue]); // Передаем метку в родительский компонент
    };

    const styles = {
        navigation: {
            borderRadius: '40px', // Закругленные углы
            boxShadow: '2px 2px 6px 4px rgba(0, 0, 0, 0.1)', // Тень
        }
    }
    return (
        <BottomNavigation
            showLabels
            value={value}
            onChange={handleChange}
            style={styles.navigation}
        >
            <BottomNavigationAction label={labels[0]} icon={<ComputerIcon />} />
            <BottomNavigationAction label={labels[1]} icon={<MemoryIcon />} />
            <BottomNavigationAction label={labels[2]} icon={<StorageIcon />} />
        </BottomNavigation>
    );
};

export default MyBottomNavigation;
