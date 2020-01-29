import errno
import os
import signal
import socket
import webapp2

class HomePage(webapp2.RequestHandler):

    def get(self):
        self.response.headers["Content-Type"] = "text/plain"
        self.response.write("Congratulations, it's a web app!")

class nn4mcProcessor(webapp2.RequestHandler):

    def post(self):
        self.response.headers["Content-Type"] = "text/html"
        self.response.write(welcome_string)


routes = [('/', HomePage), ('/process', nn4nn4mcProcessor)]

nn4mc_app = webapp2.WSGIApplication(routes, debug=True)
