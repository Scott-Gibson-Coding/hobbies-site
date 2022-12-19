import { useState, useEffect } from 'react';
import axios from 'axios';
import { Task, TaskForm } from '../components';

// Tasks page
const Tasks = () => {
    const [tasks, setTasks] = useState([]);

    // on rendering the page, fetch the tasks from the db
    useEffect(() => {
        const url = '/api/tasks-getall';
        axios.get(url).then((response) => {
            let data = response.data;
            setTasks(data['tasks']);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const onCreateCallback = (description) => {
        // call create form api
        const url = '/api/tasks-create';
        axios.post(url, {
            description: description,
        }).then((response) => {
            let new_id = response.data['new_id'];
            setTasks((tasks) => [{ id: new_id, description: description }, ...tasks]);
        }).catch((error) => {
            console.log(error);
        });
    }

    const onDeleteCallback = (idToDelete) => {
        setTasks((tasks) => tasks.filter(({ id }) => id !== idToDelete));
        const url = `/api/tasks-delete/${idToDelete}`;
        axios.post(url).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div>
            <div className='section py-3'>
                <h1 className='title'>
                    Tasks Page
                </h1>
                <TaskForm taskFormCallback={onCreateCallback} />
            </div>
            <hr></hr>
            <div className='section py-3'>
                {tasks.map(({ id, description }) => (
                    <Task key={id} id={id} description={description}
                        deleteTaskCallback={onDeleteCallback} />
                ))}
            </div>
        </div>

    );
}

export default Tasks;