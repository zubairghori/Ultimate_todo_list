from __future__ import print_function
import grpc
import todoCRUD_pb2
import todoCRUD_pb2_grpc

id = "5ba0a00ba71a6235384ede36"
title = "this is updated title"
description = "this is updated description"
status = "pending"

def run():
    with grpc.insecure_channel('localhost:50051') as channel:
        stub = todoCRUD_pb2_grpc.ToDoCRUDStub(channel)
        response = stub.taskUpdate(todoCRUD_pb2.UpdateRequest(_id=id, title=title, description=description, status=status))
    print(response)

if __name__ == '__main__':
    run()