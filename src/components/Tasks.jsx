import { useState, useEffect } from 'react';
import axios from 'axios';

// Tasks page
const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [refresh, setRefresh] = useState(false); // DEBUG: inefficient, use to refresh contents of page
    const [title, setTitle] = useState('Temp title');
    const [body, setBody] = useState('Sample body text');

    // on rendering the page, fetch the tasks from the db
    useEffect(() => {
        const url = '/api/task-getall';
        axios.get(url).then((response) => {
            let data = response.data;
            setTasks(data['tasks']);
        }).catch((error) => {
            console.log(error);
        });
    }, [refresh]);

    const handleCreate = () => {
        const url = '/api/task-create';
        axios.post(url, {
            title: title,
            body: body
        }).then((response) => {
            console.log(response);
            // refresh contents of page
            setRefresh((refresh) => !refresh);
        }).catch((error) => {
            console.log(error);
        });
    }

    const handleDelete = (id) => {
        const url = `/api/task-delete/${id}`;
        axios.post(url).then((response) => {
            console.log(response);
            // refresh contents of page
            setRefresh((refresh) => !refresh);
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className='container pl-5 pt-4'>
            <h1 className='title'>Tasks Page</h1>
            <div className='column is-6'>
                <button className='block button is-success is-large is-fullwidth'
                    onClick={handleCreate}>
                    Create Task
                </button>
                {tasks.map((task) => (
                    <nav className='block' key={task.id}>
                        <nav className='level'>
                            <div className='level-item'>
                                <h1 className='title is-4' >{task.title}</h1>
                            </div>
                            <div className='level-item'>
                                <button className='button is-danger'
                                    onClick={() => handleDelete(task.id)}>
                                    Delete
                                </button>
                            </div>
                        </nav>
                        <h1 className='subtitle is-6'>{task.body}</h1>
                    </nav>
                ))}
            </div>
        </div>
    );
}

export default Tasks;