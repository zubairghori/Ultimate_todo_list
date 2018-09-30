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
                
                self.task = Task.init(_id: self.task!._id, title: self.TitleTF.text!, description: self.DescriptionTF.text!, status: self.task!.status)
                
                TaskServices.updateTask(task: task!, completion: { (error, task) in
                    guard (error == nil) else { self.showAlert(title: "Error", message: error!); return }
                    self.navigationController?.popViewController(animated: true)
                })
                
            }else{
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
