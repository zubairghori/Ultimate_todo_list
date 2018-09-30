//
//  TaskServices.swift
//  Marathon_ToDo
//
//  Created by Nasrullah Khan  on 25/09/2018.
//  Copyright © 2018 Syed ShahRukh Haider. All rights reserved.
//

import Foundation

class TaskServices {
    
    static let client = Todo_ToDoServiceClient.init(address: hostURL, secure: false)
    
    class func createTask(task: Task, completion: @escaping ((_ error: String?, _ task: Todo_SingleResponse?)->Void)) {
        
        var createRequest = Todo_CreateRequest()
        createRequest.title = task.title
        createRequest.description_p = task.description
        createRequest.status = task.status
        
        do {
            let task = try self.client.taskCreate(createRequest)
            completion(nil, task)
        } catch let error {
            completion(error.localizedDescription, nil)
        }
    }
    
    class func getAllTasks(completion: @escaping ((_ error: String?, _ tasks: [Task]?)->Void)) {

        let allTasksRequest = Todo_AllRequest()
        var tasks = [Task]()
        do {
            var searching = true
            let ret = try self.client.tasksAll(allTasksRequest, completion: { (response) in
                searching = false
                completion(nil, tasks)
            })
            
            do {
                while (searching) {
                    if let todoTask = try ret.receive() {
                        tasks.append(Task.init(_id: todoTask.id, title: todoTask.title, description: todoTask.description_p, status: todoTask.status))
                    }
                }
            }
            catch let error {
                 completion(error.localizedDescription, nil)
            }
        }catch let error {
             completion(error.localizedDescription, nil)
        }

    }
    
    class func updateTask(task: Task, completion: @escaping ((_ error: String?, _ task: Todo_SingleResponse?)->Void)) {
        var udpdateRequest = Todo_UpdateRequest()
        udpdateRequest.id = task._id
        udpdateRequest.title = task.title
        udpdateRequest.description_p = task.description
        udpdateRequest.status = task.status
        
        do {
            let task = try self.client.taskUpdate(udpdateRequest)
            completion(nil, task)
        } catch let error {
            completion(error.localizedDescription, nil)
        }
    }
    
    class func deleteTask(taskid: String, completion: @escaping ((_ error: String?)->Void)) {
        var deleteRequest = Todo_SingleRequest()
        deleteRequest.id = taskid
        
        do {
            let deleteResponse = try self.client.taskDelete(deleteRequest)
            print(deleteResponse)
            completion(nil)
        } catch let error {
            completion(error.localizedDescription)
        }

    }
}
