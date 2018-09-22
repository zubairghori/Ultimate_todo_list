from flask import Flask, render_template, jsonify , json, session, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


app = Flask(__name__)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI']='postgres://nwabmkhn:Ckfn-9UibDBRM1zM3Zji-WfQsSIyYSCc@pellefant.db.elephantsql.com:5432/nwabmkhn'

database = SQLAlchemy(app)

cors = CORS(app, resources={r'/*': {"origins": '*'}})

class Todo_App(database.Model):
    __tablename__ = 'todo'
    id = database.Column(database.Integer , primary_key=True)
    title = database.Column(database.String(20))
    description = database.Column(database.String(100))
    done = database.Column(database.Boolean)

database.create_all() # creating tables

# rounting path for add function
@app.route('/todo/api/v1.0/task/add' , methods=['POST'])
def add():              # add function.
    added = request.get_json()
    add_task = Todo_App(title = added['title'],
                       description= added['description'],
                       done = True)
    database.session.add(add_task) # insert data query
    database.session.commit()
    return jsonify({'prompt':'Added'}) # return data in jsonify format


#rounting path for view function
@app.route('/todo/api/v1.0/task/view' , methods=['GET'])
def task_view():                    #funtion for view task
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

# routing path for update function
@app.route('/todo/api/v1.0/task/update/<id>', methods=['PUT'])
def update(id):   #update function
    tasks = Todo_App.query.filter_by(id=id).first()
    if not tasks:
        return jsonify({'message': 'Empty Dictionary'})
    data = request.get_json()
    tasks.done = True
    tasks.title = data['title']
    tasks.description = data['description']

    task_list={}
    task_list['id']=tasks.id
    task_list['title']=tasks.title
    task_list['description']=tasks.description
    task_list['done'] = tasks.done
    database.session.commit()
    return jsonify(task_list)

# routing path for delete function
@app.route('/todo/api/v1.0/task/delete/<int:id>', methods=['DELETE'])
def delete(id):                                      # delete function
    tasks = Todo_App.query.filter_by(id=id).first() # first search the id
    if not tasks:
        return jsonify({'prompt': 'Empty'})
    else:
        database.session.delete(tasks) # delete query
        database.session.commit()
    return jsonify({'prompt':'Deleted'})


if __name__ == "main":
    app.run(debug = True, port = 8000)

