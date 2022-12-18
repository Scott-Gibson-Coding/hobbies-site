import { useState, useEffect } from 'react';
import { Timer, Table } from '../components';
import { formatTime, getScramble } from '../utils/CubetimerUtils';
import axios from 'axios';

// Cubetimer page
const Cubetimer = () => {
    const [avg, setAvg] = useState(0);
    const [times, setTimes] = useState([]);
    const [scramble, setScramble] = useState('');

    // fetch data from solve db on page load
    useEffect(() => {
        setScramble(getScramble());

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
        setScramble(getScramble());
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

    return (
        <div className='container pl-5 pt-4'>
            <div className='columns'>
                <div className='column is-8'>
                    <h2 className='subtitle is-4'>{scramble}</h2>
                    <h1 className='title is-1'>Cube Timer Page</h1>
                    <Timer onTimeStop={addTime} />
                    <h2 className='subtitle is-5'>
                        Solves: {times.length}
                    </h2>
                    <h2 className='subtitle is-5'>
                        Average: {formatTime(avg)}
                    </h2>
                </div>
                <div className='column is-4'>
                    <Table times={times} />
                </div>
            </div>
            <hr></hr>
        </div>
    );
}

export default Cubetimer;