// CountdownTimer.js
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';

const CountdownTimer = ({ initialSeconds }) => {
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000); // Update every second

        return () => clearInterval(intervalId);
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
    };

    return <Text>{formatTime(seconds)}</Text>;
};

export default CountdownTimer;
