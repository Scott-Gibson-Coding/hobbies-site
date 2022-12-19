import { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ taskFormCallback }) => {
    const [description, setDescription] = useState('');

    const submitForm = () => {
        if (description.length > 0) {
            taskFormCallback(description);
            setDescription('');
        }
    }

    return (
        <div>
            <div className='field'>
                <div className='control'>
                    <textarea className='textarea' value={description}
                        onChange={(e) => setDescription(e.target.value)} placeholder='Describe task here...' />
                </div>
            </div>
            <div className='control'>
                <button className='button is-primary'
                    onClick={submitForm}>Submit</button>
            </div>
        </div>
    )
}

export default TaskForm;