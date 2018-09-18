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
    
    
    var ShareData = UIApplication.shared.delegate as! AppDelegate
    
    var mainArray = [[String : String]]()
    
    
    
    
    
    
    override func viewDidLoad() {

        super.viewDidLoad()
       
//        ActionButton.setTitle("Edit", for: .normal)
        
//
            if segueName == "Edit"{
                
                self.ActionButton.setTitle("Edit", for: .normal)
                
          self.mainArray = ShareData.incompleteDatabse
                
                self.TitleTF.text = ShareData.incompleteDatabse[selectedIndex!]["Title"]
                self.DescriptionTF.text = ShareData.incompleteDatabse[selectedIndex!]["Description"]
                
          
            }
        
        
     
        

    }
    
    
    
    

    @IBAction func buttonAction(_ sender: Any) {
        
        if TitleTF.text?.isEmpty == false && DescriptionTF.text.isEmpty == false{
            
            
            if self.segueName == "Edit"
            {
                let value = ["Title": TitleTF.text!, "Description": DescriptionTF.text!, "Status": "Incomplete"]
                self.ShareData.incompleteDatabse[selectedIndex!] = value

                self.navigationController?.popViewController(animated: true)

            }
                
                
          else{
                
                let value = ["Title": TitleTF.text!, "Description": DescriptionTF.text!, "Status": "Incomplete"]
           
                
//
//
                self.ShareData.incompleteDatabse.append(value)
            
            
            print(ShareData.incompleteDatabse)
     
            
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
