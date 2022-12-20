/*
 * Author: Scott Gibson
 * Date:       12/19/22
 */

import { useState, useEffect } from 'react';
import { formatTime } from '../utils/CubetimerUtils';

/*
 * CubeTimerTable Component:
 *   Renders each time as a row in a bulma table.
 */
const CubeTimerTable = ({ times, deleteCallback }) => {
    /*
     * State vars
     *  -tableTimes: Array of times to render in the table. Ordered
     * from oldest to most recent.
     */
    const [tableTimes, setTableTimes] = useState([]);

    /*
     * useEffect:
     *   Render times array whenever it's updated.
     */
    useEffect(() => {
        setTableTimes(times)
    }, [times]);

    return (
        <div>
            <table className='table is-bordered'>
                {/* Table head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Solve Time</th>
                    </tr>
                </thead>

                {/* Table rows */}
                <tbody>
                    {tableTimes.map(({ id, solve_time }, count) => (
                        <tr key={id}>
                            <td>{tableTimes.length - count}</td>
                            <td>
                                <div className='level'>
                                    {/* Solve time */}
                                    <div className='level-item'>
                                        {formatTime(solve_time)}
                                    </div>
                                    {/* Delete mixin */}
                                    <button className='bulma-delete-mixin is-small level-item ml-2'
                                        onClick={() => deleteCallback(id)}></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CubeTimerTable;