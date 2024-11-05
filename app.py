from flask import Flask, render_template, request, jsonify, send_from_directory
import os

app = Flask(__name__)

# Definisci la cartella di upload base
BASE_UPLOAD_FOLDER = "C:/Users/Fabio/Desktop/folder organizer/data"

# Route principale per caricare la pagina HTML
@app.route('/')
def index():
    return render_template('index.html')

# Endpoint per caricare i file
@app.route('/upload/<folder_name>', methods=['POST'])
def upload_file(folder_name):
    folder_path = os.path.join(BASE_UPLOAD_FOLDER, folder_name)
    os.makedirs(folder_path, exist_ok=True)

    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    file_path = os.path.join(folder_path, file.filename)
    file.save(file_path)
    return jsonify({"success": True, "file_path": file_path}), 200

# Endpoint per rinominare una cartella
@app.route('/rename-folder', methods=['POST'])
def rename_folder():
    old_name = request.json.get('old_name')
    new_name = request.json.get('new_name')
    
    old_path = os.path.join(BASE_UPLOAD_FOLDER, old_name)
    new_path = os.path.join(BASE_UPLOAD_FOLDER, new_name)
    
    if os.path.exists(new_path):
        return jsonify({"error": "Folder with the new name already exists."}), 400
    
    os.rename(old_path, new_path)
    return jsonify({"success": True}), 200

# Endpoint per ottenere la lista dei file in una cartella
@app.route('/list-files/<folder_name>', methods=['GET'])
def list_files(folder_name):
    folder_path = os.path.join(BASE_UPLOAD_FOLDER, folder_name)
    if not os.path.exists(folder_path):
        return jsonify({"error": "Folder does not exist."}), 404
    
    files = os.listdir(folder_path)
    return jsonify({"files": files}), 200

# Endpoint per servire i file
@app.route('/files/<folder_name>/<filename>')
def serve_file(folder_name, filename):
    folder_path = os.path.join(BASE_UPLOAD_FOLDER, folder_name)
    return send_from_directory(folder_path, filename)

# Esegui l'app Flask
if __name__ == "__main__":
    app.run(debug=True)
