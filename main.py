from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)

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

#Loads test page
@app.route('/test', methods=['GET'])
def test():
    return render_template('test.html')

#Used by JS to send file data to python for processing
@app.route('/postdata', methods=['POST'])
def post_file_data():
    file = request.form['file_data']

    #Process the file here and then send back other data

    return file

#Currently not a thing, could be used for graph visualization
@app.route('/plot/<imgdata>')
def plot(imgdata):
    pass

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
