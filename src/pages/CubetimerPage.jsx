/*
 * Author: Scott Gibson
 * Date:       12/19/22
 */

import { useState, useEffect } from 'react';
import { Timer, CubeTimerTable } from '../components';
import { formatTime, getScramble } from '../utils/CubetimerUtils';
import axios from 'axios';

/*
 * Cubetimer Page:
 *   Page meant for displaying a <Timer /> component, and displaying a list
 * of previous solves in a <CubeTimerTable /> component.
 */
const CubetimerPage = () => {
    /*
     * State vars
     *  -avg: Stores the average of the session.
     *  -times: Array of times from the session.
     *  -scramble: Random scramble for the Rubik's cube.
     */
    const [avg, setAvg] = useState(0);
    const [times, setTimes] = useState([]);
    const [scramble, setScramble] = useState('');

    /*
     * useEffect:
     *   Fetch data from solve db on rendering the page.
     */
    useEffect(() => {
        setScramble(getScramble());

        const url = 'api/solves-getall';
        axios.get(url).then((response) => {
            setTimes(() => response.data)
        }).catch((error) => {
            console.log(error);
        });
    }, [])

    /*
     * useEffect:
     *   Each time the times array is updated, calculate the average.
     */
    useEffect(() => {
        if (times.length > 0) {
            let sum = 0;
            times.forEach(({ solve_time }) => sum += solve_time);
            setAvg(() => sum / times.length)
        } else {
            setAvg(() => 0)
        }
    }, [times])

    /*
     * Callback function:
     *   Call api to add newTime to the db and prepend a new time object
     * to the times state var with the id returned by the api.
     */
    const addTimeCallback = (newTime) => {
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

    /*
     * Callback function:
     *   Removes the time with idToDelete from the times state var and
     * calls the api to delete it from the db.
     */
    const deleteCallback = (idToDelete) => {
        setTimes((times) => times.filter(({ id }) => id !== idToDelete));
        const url = `/api/solves-delete/${idToDelete}`;
        axios.post(url).catch((error) => {
            console.log(error);
        });
    }

    /*
     * handleRestart:
     *   Erase times state var array, and delete all times from the db.
     */
    const handleRestart = () => {
        setTimes([]);
        const url = '/api/solves-deleteall';
        axios.post(url).catch((error) => { console.log(error) });
    }

    return (
        <div className='container pl-5 pt-4'>
            <div className='columns'>
                {/* Left column */}
                <div className='column is-8'>
                    {/* Scramble */}
                    <h2 className='subtitle is-4'>{scramble}</h2>
                    {/* Title and Timer */}
                    <h1 className='title is-1'>Cube Timer Page</h1>
                    <Timer addTimeCallback={addTimeCallback} />
                    {/* Stats for session */}
                    <h2 className='subtitle is-5'>
                        Solves: {times.length}
                    </h2>
                    <h2 className='subtitle is-5'>
                        Average: {formatTime(avg)}
                    </h2>
                    {/* Restart session button */}
                    <button className='button is-info'
                        onClick={handleRestart}>
                        Restart Session
                    </button>
                </div>
                {/* Right column */}
                <div className='column is-4'>
                    {/* Display list of times state var */}
                    <CubeTimerTable times={times} deleteCallback={deleteCallback} />
                </div>
            </div>
            <hr></hr>
        </div>
    );
}

export default CubetimerPage;