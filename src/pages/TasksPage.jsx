/*
 * Author: Scott Gibson
 * Date:       12/19/22
 */

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Task, TaskForm } from '../components';

/*
 * Tasks Page:
 *   Contains a <TaskForm /> that allows the user to create new tasks. Each task
 * will be displayed on the page in a <Task /> component.
 * 
 * User:
 *   The user can create new tasks. The user can delete tasks.
 * 
 * Functionality to add:
 *   <TaskForm /> highlights description field red if submit attempts to create an
 * empty task.
 *   Tasks are split into columns. [Not Started, In Progress, Done]
 *   Tasks are colored by column.  [Red,         Yellow,      Green]
 *   Tasks can be edited.
 *   Tasks can be moved between adjacent columns.
 *   <TaskGroup /> components can be created. Breaking a larger task into smaller
 * subtasks. TaskGroup can be moved to Done column once all subtasks are completed.
 *   <TaskGroup /> renders with a progress bar in the tasks page.
 *   TaskGroup page renders subtasks in a page with similar/identical ui as Tasks page.
 */
const TasksPage = () => {
    /*
     * State vars
     *  -tasks: Array of tasks to render on the screen.
     */
    const [tasks, setTasks] = useState([]);

    /*
     * useEffect:
     *   On rendering the page, fetch all tasks from the db and store in tasks state.
     */
    useEffect(() => {
        const url = '/api/tasks-getall';
        axios.get(url).then((response) => {
            let data = response.data;
            setTasks(data['tasks']);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    /*
     * Callback function:
     *   Creates a new task with the provided description string, stores it
     * locally in the tasks state var, and calls the api to store it in task db.
     */
    const createTaskCallback = (description) => {
        const url = '/api/tasks-create';
        axios.post(url, {
            description: description,
        }).then((response) => {
            // Read the newly created task id from the api response json.
            // Then push the new task to the front of the tasks state var.
            let new_id = response.data['new_id'];
            setTasks((tasks) => [{ id: new_id, description: description }, ...tasks]);
        }).catch((error) => {
            console.log(error);
        });
    }

    /*
     * Callback function:
     *   Removes the task with idToDelete locally from tasks state var, 
     * And calls the api to delete it from task db.
     */
    const deleteTaskCallback = (idToDelete) => {
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
                {/* Render the <TaskForm /> component for creating a new task. */}
                <TaskForm createTaskCallback={createTaskCallback} />
            </div>
            <hr></hr>
            <div className='section py-3'>
                {/* Map each task to a <Task /> component. */}
                {tasks.map(({ id, description }) => (
                    <Task key={id} id={id} description={description}
                        deleteTaskCallback={deleteTaskCallback} />
                ))}
            </div>
        </div>

    );
}

export default TasksPage;