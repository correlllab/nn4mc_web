#!/usr/bin/python3.8

#This is the main server file for nn4mc_web
#NOTE: This is currently set up for deployment
#on Google app engine.
from flask import Flask, render_template, request
import os
import json
import io
import nn4mc.translator as nnTr

app = Flask(__name__)
app.config.from_object('config')

#Weird caching fix found online: https://stackoverflow.com/questions/41144565/flask-does-not-see-change-in-js-file
#NOTE: May not need this anymore, consider removing
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

################################################################################
#Get and Post

#This function is used by the form to send user uploaded files and data
#NOTE: The file is coming in as a filetype object is read to a string
#and then converted to bytesio for use in nn4mc.
#NOTE: Need to update this for multiple types
@app.route('/translateFile', methods=['POST'])
def post_file_data():
    type = request.form['model_type'] #Request model type
    infile = request.files['model_file'].read() #Request file(s)

    #Encode file as bytes and convert to BytesIO object
    file_obj = io.BytesIO(infile)

    files = nnTr.translatePlain(file_obj, type) #Translate the file

    #Return homepage template w/ cards
    return render_template('homepage.html', files=files, processed='true')

################################################################################
#NOTE: May need to update this for deployment
if __name__ == '__main__':
    app.debug = True
    app.run()
