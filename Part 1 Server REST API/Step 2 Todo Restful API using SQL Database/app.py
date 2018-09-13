from flask import Flask, jsonify , json, session, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI']='postgres://nwabmkhn:Ckfn-9UibDBRM1zM3Zji-WfQsSIyYSCc@pellefant.db.elephantsql.com:5432/nwabmkhn'

database = SQLAlchemy(app)

class Todo_App(database.Model):
    __tablename__ = 'todo'
    id = database.Column(database.Integer , primary_key=True)
    title = database.Column(database.String(20))
    description = database.Column(database.String(100))
    done = database.Column(database.Boolean)

database.create_all() # creating tables

@app.route('/todo/api/v1.0/task/add' , methods=['POST']) 
def add():              # add function.
    add = request.get_json()
    add_task =Todo_App(title=add['title'],
                       description=add['description'],
                       done=True)
    database.session.add(add_task) # insert data query
    database.session.commit()
    return jsonify ({'prompt':'Added'}) # return data in jsonify format