/*
 * Author: Scott Gibson
 * Date:       12/19/22
 */

/*
 * Task Component:
 *   Displays the task description followed by a delete button
 * in a box.
 */
const Task = ({ id, description, deleteTaskCallback }) => {
    return (
        <div className='box'>
            <div className='columns'>
                <div className='column is-6'>
                    {/* Task description. */}
                    <p>{description}</p>
                </div>
                <div className='column'>
                    {/* Delete task button. */}
                    <button className='button is-danger'
                        onClick={() => deleteTaskCallback(id)}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Task;