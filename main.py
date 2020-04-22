from flask import Flask, render_template, request
import os
import json
import io
import nn4mc.translator as nnTr

app = Flask(__name__)
app.config.from_object('config')

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
    return render_template('homepage.html')

#Loads documentation page
@app.route('/documentation', methods=['GET'])
def documentation():
    return render_template('documentation.html')

################################################################################
#Get and Post

#Used by JS to send file data to python for processing
#NOTE: File is coming in as string, is converted to bytes, and
#resultant files are returned as JSON
@app.route('/translateFile', methods=['POST'])
def post_file_data():
    type = request.form['user_title']
    infile = request.files['model_file'].read()

    #Encode file as bytes and convert to BytesIO object
    file_obj = io.BytesIO(infile)

    files = nnTr.translatePlain(file_obj, type) #Translate the file

    # return files #Return JSON output

    #Return homepage template w/ cards
    return render_template('homepage.html', files=files, hide='false')

#Function for testing file process
@app.route('/jsontest', methods=['GET'])
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
    # app.run(host='127.0.0.1', port=8080, debug=True)
    app.run()
