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
    
    let appDele = UIApplication.shared.delegate as! AppDelegate
    var selectedTask:Task?
    
    
    var ShareData = UIApplication.shared.delegate as! AppDelegate
    
    var mainArray = [[String : String]]()
    
    
    
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        if let task = selectedTask{
            ActionButton.setTitle("Update", for: .normal)
            TitleTF.text = task.taskTitle
            DescriptionTF.text = task.taskDescription
        }
    }
    
    
    //====== Core Data ======
    
    func saveData(with title:String,description:String){
        
        let context = appDele.persistentContainer.viewContext
        let task = Task(context: context)
        task.isCompleted = false
        task.taskTitle = title
        task.taskDescription = description
        appDele.saveContext()
        
        
    }
    
    

    @IBAction func buttonAction(_ sender: Any) {
        
        if TitleTF.text?.isEmpty == false && DescriptionTF.text.isEmpty == false{

            if let task = selectedTask{
                task.taskTitle = TitleTF.text
                task.taskDescription = DescriptionTF.text
                appDele.saveContext()
                self.navigationController?.popViewController(animated: true)
            }
          else{
            saveData(with: TitleTF.text!, description: DescriptionTF.text!)
            
           navigationController?.popViewController(animated: true)
                
                
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
