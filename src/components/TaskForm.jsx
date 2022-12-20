/*
 * Author: Scott Gibson
 * Date:       12/19/22
 */

import { useState } from 'react';

/*
 * TaskForm Component:
 *   Form for creating a new task db entry.
 */
const TaskForm = ({ createTaskCallback }) => {
    /*
    * State vars
    *  -descriptionField: Is linked to text in the description textarea.
    */
    const [descriptionField, setDescriptionField] = useState('');

    /*
     * Handles logic for submitting form. Only submits form
     * if descriptionField is not empty.
     */
    const submitForm = () => {
        if (descriptionField.length > 0) {
            createTaskCallback(descriptionField);
            setDescriptionField('');
        }
    }

    return (
        <div>
            {/* textarea for inputting description. */}
            <div className='field'>
                <div className='control'>
                    <textarea className='textarea' onChange={(e) => setDescriptionField(e.target.value)}
                        value={descriptionField} placeholder='Describe task here...' />
                </div>
            </div>
            {/* Button for submitting form. */}
            <div className='control'>
                <button className='button is-primary'
                    onClick={submitForm}>Submit</button>
            </div>
        </div>
    )
}

export default TaskForm;