
from concurrent import futures
import time, math, grpc, pymongo, json
from bson.json_util import dumps, ObjectId
import todoCRUD_pb2
import todoCRUD_pb2_grpc

_ONE_DAY_IN_SECONDS = 60 * 60 * 24

pyMongo = pymongo.MongoClient("mongodb://grpc:grpc123@ds261450.mlab.com:61450/grpc")
pyMongoDB = pyMongo['grpc']
pyMongoTable = pyMongoDB['tasks']

# mydict = dict({'title': "irfan", 'description': 'abc'})
# x = pyMongoTable.insert(mydict)
# print("x")
# print(x)

class Tasks:
    def __init__(self, _id, title, description, status):
        self._id = _id
        self.title = title
        self.description = description
        self.status = status

def find_one(db, id):
    task = db.find_one({'_id': id})
    if task:
        id = json.loads(dumps(task['_id']))
        task['_id'] = id['$oid']
        return task
    return None

# def get_all(db):
#     tasks = []
#     data = db.find()
#     if data:
#         for d in data:
#             tasks.append(json.loads(dumps(d)))
#         return tasks
#     return None

def delete_one(db, id):
    task = db.delete_one({'_id': id})

def update(db, id, request):
    d = {}
    if request.title:
        d['title'] = request.title

    if request.description:
        d['description'] = request.description

    if request.status:
        d['status'] = request.status

    old = db.find_one({"_id": id})
    update = { "$set": d}
    db.update_one(old, update)
    return find_one(db, id)


class ToDoCRUD(todoCRUD_pb2_grpc.ToDoCRUDServicer):

    def __init__(self):
        self.db = pyMongoTable

    def taskCreate(self, request, context):
        id = self.db.insert({
            'title': request.title,
            'description': request.description,
            'status': request.status
        })
        task = find_one(self.db, id)
        if task:
            return todoCRUD_pb2.SingleResponse(_id=task['_id'], title=task['title'], description=task['description'], status=task['status'])
        return todoCRUD_pb2.SingleResponse(_id='', title='', description='', status='')

    def taskSingle(self, request, context):
        task = find_one(self.db, ObjectId(request._id))
        if task:
            return todoCRUD_pb2.SingleResponse(_id=task['_id'], title=task['title'], description=task['description'], status=task['status'])
        return todoCRUD_pb2.SingleResponse(_id='', title='', description='', status='')

    def taskDelete(self, request, context):
        delete_one(self.db, ObjectId(request._id))
        return todoCRUD_pb2.DeleteResponse(message="Successfully deleted :-p")

    def taskUpdate(self, request, context):
        task =update(self.db, ObjectId(request._id), request)
        if task:
            return todoCRUD_pb2.SingleResponse(_id=task['_id'], title=task['title'], description=task['description'], status=task['status'])
        return todoCRUD_pb2.SingleResponse(_id='', title='', description='', status='')

    # def tasks(self, request, context):
    #     tasks = get_all(self.db)
        
    #     for task in tasks:
    #         print(task)
    #         yield task
        

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    todoCRUD_pb2_grpc.add_ToDoCRUDServicer_to_server(
        ToDoCRUD(), server
    )
    server.add_insecure_port('[::]:50051')
    server.start()

    try:
        while True:
            time.sleep(_ONE_DAY_IN_SECONDS)
    except KeyboardInterrupt:
        server.stop(0)

if __name__ == '__main__':
    serve()