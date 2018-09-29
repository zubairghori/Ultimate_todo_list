from __future__ import print_function
import grpc
import todo_pb2
import todo_pb2_grpc


def run():
    with grpc.insecure_channel('localhost:50051') as channel:
        stub = todo_pb2_grpc.ToDoStub(channel)
        response = stub.tasksAll(todo_pb2.AllRequest())
        for res in response:
            print(res)

if __name__ == '__main__':
    run()