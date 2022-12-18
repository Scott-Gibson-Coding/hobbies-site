import { useState, useEffect } from 'react';
import axios from 'axios';
import { formatTime } from '../utils/CubetimerUtils';

const Table = ({ times }) => {
    const [tableTimes, setTableTimes] = useState([]);

    useEffect(() => {
        setTableTimes(times)
    }, [times]);

    const handleDelete = (idToDelete) => {
        setTableTimes((tableTimes) => tableTimes.filter(({ id }) => id !== idToDelete));
        const url = `/api/solves-delete/${idToDelete}`;
        axios.post(url).catch((error) => {
            console.log(error);
        });
    }
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
                                        onClick={() => handleDelete(id)}></button>
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