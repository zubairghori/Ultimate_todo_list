from flask import Flask, Response, jsonify, request
import sys, json
from bson.json_util import dumps
from google.protobuf.json_format import MessageToJson
from client_wrapper import ServiceClient

import todoCRUD_pb2 as todoCRUD
import todoCRUD_pb2_grpc as todoCRUDGrpc

app = Flask(__name__)
app.config['tasks'] = ServiceClient(todoCRUDGrpc, 'ToDoCRUDStub', 'localhost', 50051)

@app.route('/api/v1.0/task/<id>', methods=['PUT', 'GET', 'DELETE'])
def task(id):

    requestCRUD = todoCRUD.SingleRequest(_id=int(id))

    if(request.method == 'DELETE'):
        def delete_task():
            response = app.config['tasks'].taskDelete(requestCRUD)
            return "Task Deleted :p"
        return Response(delete_task())

    elif(request.method == 'PUT'):
        _data = request.get_json(silent=True)
        requestCRUD = todoCRUD.UpdateRequest(_id=int(id), title=_data['title'], description=_data['description'], status = _data['status'])
        def update():
            response = app.config['tasks'].taskUpdate(requestCRUD)
            return MessageToJson(response)

        return Response(update(), content_type='application/json')

    else:
        def get_task():
            response = app.config['tasks'].taskSingle(requestCRUD)
            return MessageToJson(response)
            
        return Response(get_task(), content_type='application/json')

@app.route('/api/v1.0/create', methods=["POST"])
def create_taks():

    _data = request.get_json(silent=True)
    if (request.data):
        if "title" in _data :
            requestCRUD = todoCRUD.CreateRequest(title=_data['title'], description=_data['description'], status = _data['status'])

        def create():
            response = app.config['tasks'].taskCreate(requestCRUD)
            return MessageToJson(response)

        return Response(create(), content_type='application/json')

    return Response("Some error found", content_type='application/json')


if __name__ == '__main__':
    app.run(debug=True)
