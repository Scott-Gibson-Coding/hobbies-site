import { useState, useEffect } from 'react';
import Timer from './Timer';
import { formatTime, getScramble } from '../utils/CubetimerUtils';
import axios from 'axios';

// Cubetimer page
const Cubetimer = () => {
    const [avg, setAvg] = useState(0);
    const [times, setTimes] = useState([]);

    // fetch data from solve db on page load
    useEffect(() => {
        const url = 'api/solves-getall';
        axios.get(url).then((response) => {
            setTimes(() => response.data)
        }).catch((error) => {
            console.log(error);
        });
    }, [])

    // each time the times array is updated, calculate the average
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
        // DEBUG: I'm unsure why this works, but setting the times array
        //        twice doesn't add two elements, but it makes the set on
        //        screen considerably faster than waiting for the db to return
        //        an id. So we set it to -1 first, then update it when the db
        //        finishes creating a new time.
        setTimes([{ 'id': -1, 'solve_time': newTime }, ...times])
        // call create api to add a new time to the db
        const url = 'api/solves-create';
        axios.post(url, {
            time: newTime
        }).then((response) => {
            let newId = response.data['new_id'];
            setTimes([{ 'id': newId, 'solve_time': newTime }, ...times])
        }).catch((error) => {
            console.log(error);
        });
    }

    const handleDelete = (idToDelete) => {
        setTimes(times.filter(({ id }) => id != idToDelete));
        const url = `/api/solves-delete/${idToDelete}`;
        axios.post(url).catch((error) => {
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

            <div className='column is-2'>
                {times.map(({ id, solve_time }) => (
                    <div key={id} className='block level'>
                        <span className='level-item'>{formatTime(solve_time)}</span>
                        <button className='bulma-delete-mixin is-small level-item'
                            onClick={() => handleDelete(id)}></button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Cubetimer;