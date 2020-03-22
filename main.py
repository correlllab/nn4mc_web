from flask import Flask, render_template, request, jsonify, redirect, make_response, url_for
import os
import json

app = Flask(__name__)

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0 #Lame fix but fuck caching

#Weird caching fix found online: https://stackoverflow.com/questions/41144565/flask-does-not-see-change-in-js-file
def dir_last_updated(folder):
    return str(max(os.path.getmtime(os.path.join(root_path, f))
                   for root_path, dirs, files in os.walk(folder)
                   for f in files))

#Loads homepage
@app.route('/', methods=['GET'])
def homepage():
    return render_template('homepage.html',
                            last_updated=dir_last_updated('static'))

#Used by JS to send file data to python for processing
@app.route('/postdata', methods=['POST'])
def post_file_data():
    file = request.form['file_data']

    #Process the file here and then send back other data
    files = json.dumps('hi')

    return files

#Currently not a thing, could be used for graph visualization
@app.route('/plot/<imgdata>')
def plot(imgdata):
    pass

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
