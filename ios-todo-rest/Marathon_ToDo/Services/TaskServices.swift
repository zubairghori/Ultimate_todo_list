//
//  TaskServices.swift
//  Marathon_ToDo
//
//  Created by Nasrullah Khan  on 25/09/2018.
//  Copyright © 2018 Syed ShahRukh Haider. All rights reserved.
//

import Foundation
import Alamofire
import SwiftyJSON

class TaskServices {
    
    class func createTask(task: Task, completion: @escaping ((_ error: String?)->Void)) {
        let url = "http://rest-nosql.herokuapp.com/todo/api/v1/tasks"
        
        let params = [
            "task_id": task.task_id,
            "task_title": task.task_title,
            "task_description": task.task_description,
            "task_done": task.task_done
        ]
        
        Alamofire.request(url, method: .post, parameters: params, encoding: JSONEncoding.default, headers: nil).responseJSON { (response) in
            completion(nil)
        }
    }
    
    class func getAllTasks(completion: @escaping ((_ error: String?, _ tasks: [Task]?)->Void)) {
        let url = "http://rest-nosql.herokuapp.com/todo/api/v1/tasks"
        Alamofire.request(url, method: .get, parameters: nil, encoding: JSONEncoding.default, headers: nil).responseJSON { (response) in
            do {
                let json = try? JSON(data: response.data!)
                let result = json?["result"]
                let tasks = try JSONDecoder().decode([Task].self, from: result!.rawData())
                completion(nil, tasks)
            }catch let error {
                completion(error.localizedDescription, nil)
            }
        }
    }
    
    class func updateTask(task: Task, completion: @escaping ((_ error: String?)->Void)) {
        let url = "http://rest-nosql.herokuapp.com/todo/api/v1/tasks/\(task.task_id)"
        let params = [
            "task_title": task.task_title,
            "task_description": task.task_description,
            "task_done": task.task_done
        ]
        Alamofire.request(url, method: .put, parameters: params, encoding: JSONEncoding.default, headers: nil).responseJSON { (response) in
            completion(nil)
        }
    }
    
    class func deleteTask(task: Task, completion: @escaping ((_ error: String?)->Void)) {
        let url = "http://rest-nosql.herokuapp.com/todo/api/v1/tasks/\(task.task_id)"
        Alamofire.request(url, method: .delete, parameters: nil, encoding: JSONEncoding.default, headers: nil).responseJSON { (response) in
            completion(nil)
        }
    }
}
