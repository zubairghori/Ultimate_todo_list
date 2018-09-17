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
    
    var buttonTitle = "ADD"
    
    override func viewDidLoad() {

        super.viewDidLoad()
       
        ActionButton.setTitle(buttonTitle, for: .normal)
        
        // Do any additional setup after loading the view.
    }

  
    


}
