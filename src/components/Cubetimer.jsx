import { useState, useEffect, useRef } from 'react';

// Cubetimer page
const Cubetimer = () => {
    const timer = useRef(null);
    const [avg, setAvg] = useState(NaN);
    const [running, setRunning] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);

    const timer_interrupt = 53;
    // timer interrupt to update the timer on screen if running
    useEffect(() => {
        if (running) {
            timer.current = setInterval(() => {
                setEndTime((time) => time + timer_interrupt);
            }, timer_interrupt);
        }

        return () => clearInterval(timer.current);
    }, [running]);

    const startTimer = () => {
        setStartTime(Date.now());
        setEndTime(Date.now());
        setRunning(true);
    }

    const stopTimer = () => {
        setEndTime(Date.now());
        setRunning(false);
    }

    return (
        <div className='container pl-5 pt-4'>
            <h1 className='title is-1'>Cube Timer Page</h1>
            <h1 className='title is-1 bulma-unselectable-mixin'>
                {formatTime(endTime - startTime)}
            </h1>
            <h2 className='subtitle is-5'>
                {avg ? avg.toFixed(3) : avg.toString()}
            </h2>
            <button className='button is-primary'
                onClick={running ? stopTimer : startTimer}>
                Start/Stop
            </button>
        </div>
    );
}

// formats an amount of milliseconds into 00:00.00
const formatTime = (time) => {
    let mills = time % 1000;
    time = (time - mills) / 1000;
    let secs = time % 60;
    let mins = Math.floor(time / 60);

    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${mills.toString().padStart(3, '0')}`;
}

export default Cubetimer;