# Ultimate_todo_list

1) git clone -b grpc-api https://github.com/zubairghori/Ultimate_todo_list.git grpc-api
2) cd grpc-api/nosql
3) In terminal run this command to start grpc server "python app.py"
4) In another terminal run this command to start flask "python web_client.py"
5) To create a task call this api with "POST" method "localhost:5000/api/v1.0/create" in json format send these data (title, description, status) it will return every thing that has been inserted including unqiue id
6) To view any specific task call this api with "GET" method "localhost:5000/api/v1.0/task/uniqueID" it will return data in json format
7) To update any specific task call this api with "PUT" method "localhost:5000/api/v1.0/task/uniqueID" in json format send these data (title, description, status) it will return every thing that has been updated including unqiue id
8) To Delete any specific task call this api with "DELETE" method "localhost:5000/api/v1.0/task/uniqueID"
