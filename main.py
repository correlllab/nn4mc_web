from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

#Loads homepage
@app.route('/', methods=['GET'])
def homepage():
    return render_template('homepage.html')

#Loads test page
@app.route('/test', methods=['GET'])
def test():
    return render_template('test.html')

# #Loading screen while file is being processed
# @app.route('/loading', methods=['GET'])
# def loading():
#     return render_template('loading_screen.html')

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
