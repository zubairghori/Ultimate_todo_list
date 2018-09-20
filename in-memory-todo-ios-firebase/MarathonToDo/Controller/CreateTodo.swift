//
//  CreateTodo.swift
//  Marathon-ToDo
//
//  Created by Syed ShahRukh Haider on 17/09/2018.
//  Copyright © 2018 Syed ShahRukh Haider. All rights reserved.
//

import UIKit
import Firebase

class CreateTodo: UIViewController {

    
    
    
    @IBOutlet weak var TitleTF: UITextField!
    @IBOutlet weak var DescriptionTF: UITextView!
    @IBOutlet weak var ActionButton: Custom_Button!
    
    var segueName = ""
    var selectedTitle : String?
    
    
    var dbRef : DatabaseReference!

    override func viewDidLoad() {

        super.viewDidLoad()
       
        dbRef = Database.database().reference()
        
    
        print(selectedTitle)

            if segueName == "Edit"{
                
                self.ActionButton.setTitle("Edit", for: .normal)
                
                
                dbRef = Database.database().reference()
                
                dbRef.child("ToDo").observe(.childAdded) { (createSnap) in
                    
                    let value = createSnap.value as! [String : String]
                    
                    if value["Title"] == self.selectedTitle!{
                        
                        self.TitleTF.text = value["Title"]
                        self.DescriptionTF.text = value["Description"]
                    }
                }
              
                
          
            }
        
        
     
        

    }
    
    
    
    

    @IBAction func buttonAction(_ sender: Any) {
        
        if TitleTF.text?.isEmpty == false && DescriptionTF.text.isEmpty == false{
            
            
            if self.segueName == "Edit"
            {
               
                if selectedTitle! == TitleTF.text!{
                    self.dbRef.child("ToDo").child(selectedTitle!).child("Description").setValue(DescriptionTF.text!)
                    
                    self.navigationController?.popViewController(animated: true)
                }
                    
                else{
                    
                    self.dbRef.child("ToDo").child(selectedTitle!).removeValue()
                    self.dbRef.child("ToDo").child(TitleTF.text!).child("Title").setValue(TitleTF.text!)
                    self.dbRef.child("ToDo").child(TitleTF.text!).child("Description").setValue(DescriptionTF.text!)
                    self.dbRef.child("ToDo").child(TitleTF.text!).child("Status").setValue("Incomplete")
                    
                    self.navigationController?.popViewController(animated: true)
                }
             

            }
                
                
          else{
                
                let dic = [ "Title" : TitleTF.text!,
                            "Description" : DescriptionTF.text!,
                            "Status" : "Incomplete"
                
                ]
                
                dbRef = Database.database().reference()
                
                dbRef.child("ToDo").child(TitleTF.text!).setValue(dic)

            self.navigationController?.popViewController(animated: true)
            
                
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
