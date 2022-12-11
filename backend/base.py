from flask import Flask

app = Flask(__name__)

@app.route('/api')
def api():
    return 'Stand in for backend api routes.'
