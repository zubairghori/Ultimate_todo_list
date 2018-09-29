from __future__ import print_function
import grpc
import todo_pb2
import todo_pb2_grpc

id = 17
title = "this is updated title again"
description = "this is updated description again"
status = "pending"

def run():
    with grpc.insecure_channel('localhost:50051') as channel:
        stub = todo_pb2_grpc.ToDoStub(channel)
        response = stub.taskUpdate(todo_pb2.UpdateRequest(_id=id, title=title, description=description, status=status))
    print(response)

if __name__ == '__main__':
    run()