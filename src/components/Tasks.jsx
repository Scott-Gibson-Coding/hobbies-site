import { useState, useEffect } from 'react';
import axios from 'axios';

// Tasks page
const Tasks = () => {
    const [tasks, setTasks] = useState([]);

    // on rendering the page, fetch the tasks from the db
    useEffect(() => {
        const url = '/api/tasks';
        axios.get(url).then((response) => {
            let data = response.data;
            setTasks(data['tasks']);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <div className='container pl-5 pt-4'>
            <h1 className='title'>Tasks Page</h1>
            {tasks.map((task) => (
                <div className='block' key={task.id}>
                    <h1 className='title is-4' >{task.title}</h1>
                    <h1 className='subtitle is-6'>{task.body}</h1>
                </div>
            ))}
        </div>
    );
}

export default Tasks;