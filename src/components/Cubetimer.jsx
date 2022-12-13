import { useState, useEffect } from 'react';
import Timer from './Timer';

// Cubetimer page
const Cubetimer = () => {
    const [avg, setAvg] = useState(NaN);

    return (
        <div className='container pl-5 pt-4'>
            <h1 className='title is-1'>Cube Timer Page</h1>
            <Timer />
            <h2 className='subtitle is-5'>
                {avg ? avg.toFixed(3) : avg.toString()}
            </h2>
        </div>
    );
}

export default Cubetimer;