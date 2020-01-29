import webapp2

class HomePage(webapp2.RequestHandler):

    def get(self):
        self.response.headers["Content-Type"] = "text/plain"
        self.response.write("Congratulations, it's a web app!")
