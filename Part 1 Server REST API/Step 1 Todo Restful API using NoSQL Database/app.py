from flask import Flask,jsonify,request
from flask.ext.pymongo import PyMongo

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'todorest' 
app.config['MONGO_URI'] = 'mongodb://mohsin:password1@ds123852.mlab.com:23852/todorest'

mongo = PyMongo(app)