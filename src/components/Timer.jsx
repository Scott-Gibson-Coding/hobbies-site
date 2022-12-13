import { useState, useEffect, useRef } from 'react';
import { formatTime } from '../utils/CubetimerUtils';

// Timer component
const Timer = (props) => {
    const timer = useRef(null);
    const [running, setRunning] = useState(false);
    const [total, setTotal] = useState(0);
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

    // on setTotal, return that time to the parent component. if total is 0,
    // assume this to be a false start and don't return anything.
    useEffect(() => {
        if (total > 0) {
            props.onTimeStop(total);
        }
    }, [total])

    const startTimer = () => {
        setStartTime(Date.now());
        setEndTime(Date.now());
        setRunning(true);
    }

    const stopTimer = () => {
        setTotal(Date.now() - startTime);
        setRunning(false);
    }

    return (
        <div className='columns is-vcentered is-mobile'>
            <div className='column is-narrow'>
                <h1 className='title is-1 bulma-unselectable-mixin'>
                    {running ? formatTime(endTime - startTime) : formatTime(total)}
                </h1>
            </div>
            <div className='column'>
                <button className='button is-primary'
                    onClick={running ? stopTimer : startTimer}>
                    Start/Stop
                </button>
            </div>
        </div>
    );
}

export default Timer;