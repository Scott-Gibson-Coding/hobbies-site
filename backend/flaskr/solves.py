from flask import (
    Blueprint, g, request, jsonify
)
from flaskr.db import get_db

solves_bp = Blueprint('solves', __name__)

@solves_bp.route('/api/solves-getall')
def getall():
    db = get_db()
    solves = db.execute(
        'SELECT * '
        'FROM solve '
        'ORDER BY id DESC'
    ).fetchall()

    data = [{
        'id': solve['id'],
        'solve_time': solve['solve_time']
    } for solve in solves]

    return data, 200

@solves_bp.route('/api/solves-create', methods=['POST'])
def create():
    data = request.json
    # ensure the entries exist
    try:
        solve_time = data['time']
    except:
        return 'Error: time must be non-empty!', 400

    db = get_db()
    db.execute(
        'INSERT INTO solve (solve_time) '
        'VALUES (?)',
        (solve_time,)
    )
    db.commit()

    new_id = db.execute(
        'SELECT id '
        'FROM solve '
        'ORDER BY id DESC'
    ).fetchone()['id']

    response = {
        'message': 'Solve create successful',
        'new_id': new_id
    }
    return response

@solves_bp.route('/api/solves-delete/<int:id>', methods=['POST'])
def delete(id):
    db = get_db()
    db.execute('DELETE FROM solve WHERE id = ?', (id,))
    db.commit()
    return 'Solve delete successful'

@solves_bp.route('/api/solves-deleteall', methods=['POST'])
def deleteall():
    db = get_db()
    db.execute('DELETE FROM solve')
    db.commit()
    return 'Solve delete all successful'
