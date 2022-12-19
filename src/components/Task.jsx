const Task = ({ id, description, deleteTaskCallback }) => {
    return (
        <div className='box'>
            <div className='columns'>
                <div className='column is-6'>
                    <p>{description}</p>
                </div>
                <div className='column'>
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