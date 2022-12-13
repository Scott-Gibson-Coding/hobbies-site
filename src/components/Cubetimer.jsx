import { useState, useEffect } from 'react';
import Timer from './Timer';
import { formatTime } from '../utils/CubetimerUtils';

// Cubetimer page
const Cubetimer = () => {
    const [avg, setAvg] = useState(NaN);
    const [times, setTimes] = useState([]);

    const addTime = (newTime) => {
        setTimes([...times, newTime]);
    }

    return (
        <div className='container pl-5 pt-4'>
            <h1 className='title is-1'>Cube Timer Page</h1>
            <Timer onTimeStop={addTime} />
            <h2 className='subtitle is-5'>
                {avg ? avg.toFixed(3) : avg.toString()}
            </h2>

            <hr></hr>

            {times.map((time, index) => <p key={index}>{formatTime(time)}</p>)}
        </div>
    );
}

export default Cubetimer;