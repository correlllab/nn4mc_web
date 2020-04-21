from flask import Flask, render_template, request
import os
import json
import io
import nn4mc.Translator as nnTR

app = Flask(__name__)

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0 #Lame fix but fuck caching

#Weird caching fix found online: https://stackoverflow.com/questions/41144565/flask-does-not-see-change-in-js-file
def dir_last_updated(folder):
    return str(max(os.path.getmtime(os.path.join(root_path, f))
                   for root_path, dirs, files in os.walk(folder)
                   for f in files))

################################################################################
#Page serving

#Loads homepage
@app.route('/', methods=['GET'])
def homepage():
    return render_template('homepage.html',
                            last_updated=dir_last_updated('static'))

#Loads documentation page
@app.route('/', methods=['GET'])
def documentation():
    return render_template('documentation.html',
                            last_updated=dir_last_updated('static'))

################################################################################
#Get and Post

#Used by JS to send file data to python for processing
#NOTE: File is coming in as string, is converted to bytes, and
#resultant files are returned as JSON
@app.route('/postdata', methods=['POST'])
def post_file_data():
    infile = request.form['file_data'] #Get the data from JS
    # infile = json.loads(file)

    #Extract file type and data
    type = infile["type"]
    data = infile["text"]

    #Encode file as bytes and convert to BytesIO object
    byt = data.encode('utf-8')
    file_obj = io.BytesIO(byt)

    files = nnTr.translateToJSON(file_obj, type) #Translate the file

    return files #Return JSON output

#Function for testing file process
@app.route('/posttest', methods=['GET'])
def post_test_data():
    with open('test_data/sample.json') as json_file:
        files = json.load(json_file)

    return files

################################################################################
#Currently not a thing, could be used for graph visualization
@app.route('/plot/<imgdata>')
def plot(imgdata):
    pass

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
