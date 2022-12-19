from flask import (
    Blueprint, flash, g, redirect, request, url_for, jsonify
)
from flaskr.db import get_db

tasks_bp = Blueprint('tasks', __name__)

@tasks_bp.route('/api/tasks-getall')
def getall():
    db = get_db()
    tasks = db.execute(
        'SELECT * '
        'FROM task '
        'ORDER BY created DESC'
    ).fetchall()

    # create array of serializable objects to return to frontend
    data = {
        'tasks': [{
            'id': task['id'],
            'description': task['description'],
            'created': task['created']
        } for task in tasks]
    }
    return data, 200

@tasks_bp.route('/api/tasks-create', methods=['POST'])
def create():
    # get the data required to create a new task
    data = request.json
    # ensure the entries exist
    try:
        description = data['description']
    except:
        return 'Error: description must be included in POST request!', 400

    db = get_db()
    db.execute(
        'INSERT INTO task (description) '
        'VALUES (?)',
        (description,)
    )
    db.commit()

    new_id = db.execute(
        'SELECT id '
        'FROM task '
        'ORDER BY id DESC'
    ).fetchone()['id']

    response = {
        'message': 'Task create successful',
        'new_id': new_id
    }
    return response, 200

@tasks_bp.route('/api/tasks-delete/<int:id>', methods=['POST'])
def delete(id):
    db = get_db()
    db.execute('DELETE FROM task WHERE id = ?', (id,))
    db.commit()
    return 'Task delete successful'
