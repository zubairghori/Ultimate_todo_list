from flask import Flask, render_template, jsonify , json, session, request
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

# rounting path for add task
@app.route('/todo/api/v1.0/task/add' , methods=['POST'])
def add():              # add function.
    added = request.get_json()
    add_task = Todo_App(title = added['title'],
                       description= added['description'],
                       done = True)
    database.session.add(add_task) # insert data query
    database.session.commit()
    return jsonify({'prompt':'Added'}) # return data in jsonify format



#rounting path for view
@app.route('/todo/api/v1.0/task/view' , methods=['GET'])

#funtion for view task
def task_view():
    task = Todo_App.query.all() #fetching data for db
    list_of_task =[] #empty array
    """
    iterating over the 'task' to get each column value and 
    appening it into the 'list_of_task'. then jsonify the 
    final result that will be show on the screen. 
    """
    for item in task:
        item_data={}
        item_data['id'] = item.id
        item_data['title'] = item.title
        item_data['description'] = item.description
        item_data['done'] = item.done
        list_of_task.append(item_data) #appending each into the dicnary opject

    return jsonify({'task': list_of_task}) #jsonify the result


if __name__ == "main":
    app.run(debug = True, port = 8000)

