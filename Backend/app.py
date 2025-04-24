from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
import datetime
import os
import uuid
from moviepy.editor import VideoFileClip
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configuration
UPLOAD_FOLDER = 'uploads'
PROCESSED_FOLDER = 'processed'
ALLOWED_EXTENSIONS = {'mp4', 'mov', 'avi', 'mkv'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['PROCESSED_FOLDER'] = PROCESSED_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 500 * 1024 * 1024  # 500MB max file size

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def process_video(input_path, output_path, start_time=None, end_time=None):
    """Process video: trim and convert if needed"""
    with VideoFileClip(input_path) as video:
        if start_time is not None and end_time is not None:
            video = video.subclip(start_time, end_time)
        video.write_videofile(output_path, codec='libx264', audio_codec='aac')

@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/status')
def status():
    return jsonify({
        'status': 'running',
        'timestamp': datetime.datetime.now().isoformat(),
        'version': '1.0.0',
        'endpoints': ['/', '/status', '/upload', '/process']
    })

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        unique_filename = f"{uuid.uuid4()}_{filename}"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
        file.save(filepath)
        
        return jsonify({
            'message': 'File uploaded successfully',
            'filename': unique_filename,
            'path': filepath
        })
    
    return jsonify({'error': 'Invalid file type'}), 400

@app.route('/process', methods=['POST'])
def process_video_endpoint():
    data = request.json
    if not data or 'filename' not in data:
        return jsonify({'error': 'No filename provided'}), 400
    
    input_filename = data['filename']
    input_path = os.path.join(app.config['UPLOAD_FOLDER'], input_filename)
    
    if not os.path.exists(input_path):
        return jsonify({'error': 'File not found'}), 404
    
    # Generate output filename
    output_filename = f"processed_{input_filename}"
    output_path = os.path.join(app.config['PROCESSED_FOLDER'], output_filename)
    
    try:
        # Get optional parameters
        start_time = data.get('start_time')
        end_time = data.get('end_time')
        
        # Process the video
        process_video(input_path, output_path, start_time, end_time)
        
        return jsonify({
            'message': 'Video processed successfully',
            'output_filename': output_filename
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Create upload and processed directories if they don't exist
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    os.makedirs(PROCESSED_FOLDER, exist_ok=True)
    
    # Get port from environment variable or use default
    port = int(os.environ.get('PORT', 9999))
    
    print(f"Starting Flask server on port {port}...")
    app.run(host='0.0.0.0', port=port)
