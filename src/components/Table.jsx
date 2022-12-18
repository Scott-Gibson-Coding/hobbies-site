import { useState, useEffect } from 'react';
import { formatTime } from '../utils/CubetimerUtils';

const Table = ({ times, onDelete }) => {
    const [tableTimes, setTableTimes] = useState([]);

    useEffect(() => {
        setTableTimes(times)
    }, [times]);

    return (
        <div>
            <table className='table is-bordered'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Solve Time</th>
                    </tr>
                </thead>

                <tbody>
                    {tableTimes.map(({ id, solve_time }, count) => (
                        <tr key={id}>
                            <td>{tableTimes.length - count}</td>
                            <td>
                                <div className='level'>
                                    <div className='level-item'>
                                        {formatTime(solve_time)}
                                    </div>
                                    <button className='bulma-delete-mixin is-small level-item ml-2'
                                        onClick={() => onDelete(id)}></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;