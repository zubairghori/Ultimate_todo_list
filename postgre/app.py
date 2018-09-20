
from concurrent import futures
import time, math, grpc, psycopg2, json
from bson.json_util import dumps, ObjectId
import todoCRUD_pb2
import todoCRUD_pb2_grpc

_ONE_DAY_IN_SECONDS = 60 * 60 * 24


conn = psycopg2.connect(host="pellefant.db.elephantsql.com",database="uomzdlzj", user="uomzdlzj", password="KK3093oXjxWozq3OhWdqVZ8LePDYurwC")

def find_one(db, id):
    cur = db.cursor()
    sql = ("SELECT * FROM TASKS WHERE id = %d" % id)
    print(sql)
    cur.execute(sql)
    task = cur.fetchone()
    if task:
        return task
    return None

def delete_one(db, id):
    cur = db.cursor()
    sql = ("DELETE FROM TASKS WHERE id = %d" % id)
    cur.execute(sql)
    conn.commit()
    cur.close()

def update(db, id, request):
    cur = db.cursor()
    sql = "UPDATE TASKS SET title = %s , description = %s, status = %s where id = %s"
    cur.execute(sql, (request.title, request.description, request.status, id))
    task = find_one(db, id)
    db.commit()
    cur.close()
    return task


class ToDoCRUD(todoCRUD_pb2_grpc.ToDoCRUDServicer):

    def __init__(self):
        self.db = conn

    def taskCreate(self, request, context):
        cur = self.db.cursor()
        sql = "INSERT INTO TASKS(title, description, status) VALUES (%s, %s, %s) RETURNING id"
        cur.execute(sql, (request.title,request.description,request.status))
        # id = cur.fetchone()[0]
        self.db.commit()
        cur.close
        task = find_one(self.db, id)
        if task:
            return todoCRUD_pb2.SingleResponse(_id=task[0], title=task[1], description=task[2], status=task[3])
        return todoCRUD_pb2.SingleResponse(_id='', title='', description='', status='')

    def taskSingle(self, request, context):
        print(request._id)
        task = find_one(self.db, request._id)
        print(task)
        if task:
            return todoCRUD_pb2.SingleResponse(_id=task[0], title=task[1], description=task[2], status=task[3])
        return todoCRUD_pb2.SingleResponse(_id='', title='', description='', status='')

    def taskDelete(self, request, context):
        delete_one(self.db, request._id)
        return todoCRUD_pb2.DeleteResponse(message="Successfully deleted :-p")

    def taskUpdate(self, request, context):
        task =update(self.db, request._id, request)
        if task:
            return todoCRUD_pb2.SingleResponse(_id=task[0], title=task[1], description=task[2], status=task[3])
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