/*
 * Author: Scott Gibson
 * Date:       12/19/22
 */

import { useState, useEffect, useRef } from 'react';
import { formatTime } from '../utils/CubetimerUtils';

/*
 * Timer Component:
 *   Uses setInterval to create a timer that updates at a set interval
 * rate. On space keyup event, the timer starts, and on space keydown
 * the timer will stop.
 */
const Timer = ({ addTimeCallback }) => {
    /*
     * State vars
     *  -timer: Keeps track of the page interval used to frequently
     * update the endTime state var.
     *  -running: Boolean flag, set to true if timer is running.
     *  -total: Set this value once the timer is stopped. This will be the
     * time rendered on screen, and the time returned via a callback function.
     *  -startTime: Remembers when the timer started to serve as an offset.
     *  -endTime: Setting this to the current time, then subtracting startTime
     * should give the time elapsed like a stopwatch would.
     */
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

    /*
     * useEffect:
     *   When running is set to true, a new interval is created to update
     * the endTime every timer_interrupt ms.
     */
    const timer_interrupt = 53;
    useEffect(() => {
        if (running) {
            timer.current = setInterval(() => {
                setEndTime((time) => time + timer_interrupt);
            }, timer_interrupt);
        }

        return () => clearInterval(timer.current);
    }, [running]);

    /*
     * useEffect:
     *   Add event listeners for keyup and keydown.
     */
    useEffect(() => {
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('keydown', handleKeyDown);
        }
    })

    /*
     * useEffect:
     *   When total is set to, if it is non-zero return that time to
     * the Cubetimer Page to render and send to the db.
     */
    useEffect(() => {
        if (total > 0) {
            addTimeCallback(total);
        }
    }, [total])


    /*
     * handleKeyUp:
     *   If the key is space, check that running is set to false,
     * and if so start the timer.
     */
    const handleKeyUp = (event) => {
        if (!flag && !running && event.code === 'Space') {
            setFlag(true);
            startTimer();
        } else if (flag && event.code === 'Space') {
            setFlag(false);
        }
    }

    /*
     * handleKeyDown:
     *   If the key is space, check that running is set to true,
     * and if so stop the timer.
     */
    const handleKeyDown = (event) => {
        if (running && event.code === 'Space') {
            stopTimer();
        }
    }

    /*
     * startTimer
     */
    const startTimer = () => {
        setStartTime(Date.now());
        setEndTime(Date.now());
        setRunning(true);
    }

    /*
     * stopTimer
     */
    const stopTimer = () => {
        setTotal(Date.now() - startTime);
        setRunning(false);
    }

    return (
        <div className='block'>
            <h1 className='title is-1 bulma-unselectable-mixin'>
                {/* Render time elapsed if running, otherwise render total. */}
                {running ? formatTime(endTime - startTime) : formatTime(total)}
            </h1>
        </div>
    );
}

export default Timer;