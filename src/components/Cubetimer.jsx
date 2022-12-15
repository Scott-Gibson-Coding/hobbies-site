import { useState, useEffect } from 'react';
import Timer from './Timer';
import { formatTime } from '../utils/CubetimerUtils';
import axios from 'axios';

// Cubetimer page
const Cubetimer = () => {
    const [avg, setAvg] = useState(NaN);
    const [times, setTimes] = useState([]);
    const [refresh, setRefresh] = useState(false);

    // fetch data from solve db on page load and refresh
    useEffect(() => {
        const url = 'api/solves-getall';
        axios.get(url).then((response) => {
            setTimes(response.data)
        }).catch((error) => {
            console.log(error);
        });
    }, [refresh])

    useEffect(() => {
        if (times.length > 0) {
            setAvg(times.reduce((a, b) => a + b, 0) / times.length);
        }
    }, [times])

    const addTime = (newTime) => {
        // call create api to add a new time to the db
        const url = 'api/solves-create';
        axios.post(url, {
            time: newTime
        }).then((response) => {
            setRefresh((refresh) => !refresh);
        }).catch((error) => {
            console.log(error);
        });
    }

    const handleClick = () => {
        // call create api to add a new time to the db
        const time = 5555;
        const url = 'api/solves-create';
        axios.post(url, {
            time: time
        }).then((response) => {
            setRefresh((refresh) => !refresh);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className='container pl-5 pt-4'>
            <h1 className='title is-1'>Cube Timer Page</h1>
            <Timer onTimeStop={addTime} />
            <h2 className='subtitle is-5'>
                Average: {avg ? formatTime(avg) : avg.toString()}
            </h2>

            <hr></hr>

            {times.map(({ id, solve_time }) => <p key={id}>{formatTime(solve_time)}</p>)}
        </div>
    );
}

export default Cubetimer;