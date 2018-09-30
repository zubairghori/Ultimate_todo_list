//
//  CreateTodo.swift
//  Marathon-ToDo
//
//  Created by Syed ShahRukh Haider on 17/09/2018.
//  Copyright © 2018 Syed ShahRukh Haider. All rights reserved.
//

import UIKit

class CreateTodo: UIViewController {
    
    @IBOutlet weak var TitleTF: UITextField!
    @IBOutlet weak var DescriptionTF: UITextView!
    @IBOutlet weak var ActionButton: Custom_Button!
    
    var segueName = ""
    var selectedIndex : Int?
    var task: Task? = nil
    
    override func viewDidLoad() {
        
        super.viewDidLoad()
        
        if segueName == "Edit"{
            self.ActionButton.setTitle("Edit", for: .normal)
            self.TitleTF.text = self.task!.title
            self.DescriptionTF.text = self.task!.description
        }
    }
    
    @IBAction func buttonAction(_ sender: Any) {
        
        if TitleTF.text?.isEmpty == false && DescriptionTF.text.isEmpty == false{
            
            if self.segueName == "Edit" {
                
                //                let url = "http://rest-nosql.herokuapp.com/todo/api/v1/tasks/\(self.task!.task_id)"
                //
                //                let params = ["task_title": self.TitleTF.text!, "task_description": self.DescriptionTF.text!,"task_done": self.task!.task_done ]
                //
                //                Alamofire.request(url, method: .put, parameters: params, encoding: JSONEncoding.default, headers: nil).responseJSON { (response) in
                //                    let alert  =  UIAlertController(title: "Success", message: "Task Edited successfully", preferredStyle: .alert)
                //                    let button = UIAlertAction(title: "OK", style: .default, handler: { (handler) in
                //                        self.navigationController?.popViewController(animated: true)
                //                    })
                //                    alert.addAction(button)
                //
                //                    self.present(alert, animated: true, completion: nil)
                //                }
            }
            else{
                
                let task = Task.init(title: self.TitleTF.text!, description: self.DescriptionTF.text!, status: "pending")
                TaskServices.createTask(task: task) { (error , response) in
                    guard (error == nil) else {
                        self.showAlert(title: "Error", message: error!)
                        return
                    }
                    self.showAlert(title: "Success", message: "Task: \(response!.title) \n created successfully.") {
                        self.navigationController?.popViewController(animated: true)
                    }
                }
            }
        }
            
        else{
            let alert  =  UIAlertController(title: "SOME FIELD IS EMPTY", message: "Please assure all field are properly filled", preferredStyle: .alert)
            let button = UIAlertAction(title: "Dismiss", style: .default, handler: nil)
            alert.addAction(button)
            
            self.present(alert, animated: true, completion: nil)
        }
    }
}
