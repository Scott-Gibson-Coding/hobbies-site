import { useState, useEffect } from 'react';
import Timer from './Timer';
import { formatTime, getScramble } from '../utils/CubetimerUtils';
import axios from 'axios';

// Cubetimer page
const Cubetimer = () => {
    const [avg, setAvg] = useState(0);
    const [times, setTimes] = useState([]);
    const [refresh, setRefresh] = useState(false);

    // fetch data from solve db on page load and refresh
    useEffect(() => {
        const url = 'api/solves-getall';
        axios.get(url).then((response) => {
            setTimes(() => response.data)
        }).catch((error) => {
            console.log(error);
        });
    }, [refresh])

    useEffect(() => {
        if (times.length > 0) {
            let sum = 0;
            times.forEach(({ solve_time }) => sum += solve_time);
            setAvg(() => sum / times.length)
        } else {
            setAvg(() => 0)
        }
    }, [times])

    const addTime = (newTime) => {
        // call create api to add a new time to the db
        const url = 'api/solves-create';
        axios.post(url, {
            time: newTime
        }).then(() => {
            setRefresh((refresh) => !refresh);
        }).catch((error) => {
            console.log(error);
        });
    }

    const handleDelete = (id) => {
        const url = `/api/solves-delete/${id}`;
        axios.post(url).then((response) => {
            setRefresh((refresh) => !refresh);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className='container pl-5 pt-4'>
            <h2 className='subtitle is-4'>{getScramble()}</h2>
            <h1 className='title is-1'>Cube Timer Page</h1>
            <Timer onTimeStop={addTime} />
            <h2 className='subtitle is-5'>
                Solves: {times.length}
            </h2>
            <h2 className='subtitle is-5'>
                Average: {formatTime(avg)}
            </h2>

            <hr></hr>

            {times.map(({ id, solve_time }) => (
                <div key={id} className='block my-2'>
                    <span>{formatTime(solve_time)}</span>
                    <span><button className='button is-small ml-3 is-danger'
                        onClick={() => handleDelete(id)}>
                        Delete
                    </button></span>
                </div>
            ))}
        </div>
    );
}

export default Cubetimer;