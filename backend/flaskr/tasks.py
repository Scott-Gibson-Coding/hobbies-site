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
            'title': task['title'],
            'body': task['body'],
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
        title = data['title']
        body = data['body']
    except:
        return 'Error: title and body must be non-empty!', 400

    db = get_db()
    db.execute(
        'INSERT INTO task (title, body) '
        'VALUES (?, ?)',
        (title, body)
    )
    db.commit()
    return 'Task create successful', 200

@tasks_bp.route('/api/tasks-delete/<int:id>', methods=['POST'])
def delete(id):
    db = get_db()
    db.execute('DELETE FROM task WHERE id = ?', (id,))
    db.commit()
    return 'Task delete successful'
