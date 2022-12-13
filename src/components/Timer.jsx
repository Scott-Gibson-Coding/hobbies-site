import { useState, useEffect, useRef } from 'react';
import { formatTime } from '../utils/CubetimerUtils';

// Timer component
const Timer = (props) => {
    const timer = useRef(null);
    const [running, setRunning] = useState(false);
    const [total, setTotal] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);

    /* Timer starts on space up, so the user can hold spacebar as long as
    the like before starting the solve. And it stops on space down, so that
    there is no lag time between hitting space and the timer stopping.

    Unfortunately, when you hit space down, it stops the timer, and when you let
    go of space, the event listener sees that and says, "okay, we're going again!"

    To fix this, flag will be set to true when the timer is running, and will need
    to be reset once before the timer will be set off by the spacebar.
    */
    const [flag, setFlag] = useState(false);

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

    // add event listener for keydown and keyup
    useEffect(() => {
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('keydown', handleKeyDown);
        }
    })

    const handleKeyUp = (event) => {
        if (!flag && !running && event.code === 'Space') {
            setFlag(true);
            startTimer();
        } else if (flag && event.code === 'Space') {
            setFlag(false);
        }
    }

    const handleKeyDown = (event) => {
        if (running && event.code === 'Space') {
            stopTimer();
        }
    }

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
        </div>
    );
}

export default Timer;