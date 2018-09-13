from flask import Flask,jsonify,request
from flask.ext.pymongo import PyMongo

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'todorest' 
app.config['MONGO_URI'] = 'mongodb://mohsin:password1@ds123852.mlab.com:23852/todorest'

mongo = PyMongo(app)


@app.route('/todo/api/v1/tasks',methods=['GET'])
def all_tasks():
    task = mongo.db.tasks

    output=[]

    for a in task.find():

        output.append({'task_id':a['task_id'],'task_title':a['task_title'],'task_description': a['task_description'],'task_done': a['task_done']})

    return jsonify({'result':output})

@app.route('/todo/api/v1/tasks/<task_id>',methods=['GET'])
def one_task(task_id):
    task = mongo.db.tasks
    a=task.find_one({'task_id':task_id})


    if a:
        output={'task_title':a['task_title'],'task_description':a['task_description'], 'task_done':a['task_done']}
    else :
        output="no results found"
    return jsonify({'result':output})

@app.route('/todo/api/v1/tasks', methods=['POST'])
def add():
    task = mongo.db.tasks
    task_id = request.json['task_id']
    task_title = request.json['task_title']
    task_description = request.json['task_description']
    task_done = request.json['task_done']
    task.insert({'task_id':task_id, 'task_title':task_title, 'task_description':task_description, 'task_done':task_done})
        
    return "task inserted"



@app.route('/todo/api/v1/tasks/<task_id>',methods=['DELETE'])
def delete_task(task_id):
    task = mongo.db.tasks
    a={'task_id':task_id}

    task.delete_one(a)
    return "task deleted"

@app.route('/todo/api/v1/tasks/<task_id>',methods=['PUT'])
def update_task_title(task_id):
    task = mongo.db.tasks

    update=task.find_one({'task_id':task_id})
    task_title = request.json['task_title']

    update['task_title']= task_title

    task.save(update)
    return 'title updated'

if __name__ == '__main__':
    app.run(debug=True)