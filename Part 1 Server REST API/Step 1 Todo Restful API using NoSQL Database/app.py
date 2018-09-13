from flask import Flask,jsonify,request
from flask.ext.pymongo import PyMongo

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'todorest' 
app.config['MONGO_URI'] = 'mongodb://mohsin:password1@ds123852.mlab.com:23852/todorest'

mongo = PyMongo(app)


@app.route('/todo/api/v1/tasks', methods=['POST'])
def add():
    task = mongo.db.tasks
    task_id = request.json['task_id']
    task_title = request.json['task_title']
    task_description = request.json['task_description']
    task_done = request.json['task_done']
    task.insert({'task_id':task_id, 'task_title':task_title, 'task_description':task_description, 'task_done':task_done})
        
    return "task inserted"

if __name__ == '__main__':
    app.run(debug=True)