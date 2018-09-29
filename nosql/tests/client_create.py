from __future__ import print_function
import grpc
import todo_pb2
import todo_pb2_grpc

title = "this is another title"
description = 'this is another description'
status = 'pending'


def run():
    with grpc.insecure_channel('localhost:50051') as channel:
        stub = todo_pb2_grpc.ToDoStub(channel)
        response = stub.taskCreate(todo_pb2.CreateRequest(title=title, description=description, status=status))
    print(response)

if __name__ == '__main__':
    run()