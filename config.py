from google.appengine.ext import vendor

DEBUG = False #Make sure to set to false in production
SEND_FILE_MAX_AGE_DEFAULT = 0 #Lame fix but not sure what else to do

vendor.add('flask')
