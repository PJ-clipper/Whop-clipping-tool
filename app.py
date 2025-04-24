from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def hello():
    return 'Hello, World!'

if __name__ == '__main__':
    print("Starting Flask server...")
    app.run(host='localhost', port=9999) 