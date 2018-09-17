//
//  ViewController.swift
//  Marathon-TODO
//
//  Created by Syed ShahRukh Haider on 17/09/2018.
//  Copyright © 2018 Syed ShahRukh Haider. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var MainView: UIView!
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        
        navigationController?.navigationBar.setBackgroundImage(UIImage(), for: .default)
        navigationController?.navigationBar.shadowImage = UIImage()
        
    let defaultView = UIStoryboard.init(name: "Main", bundle: nil)
        
        let calendar = defaultView.instantiateViewController(withIdentifier: "Calendar")
        
        MainView.addSubview(calendar.view)
        
    }
    @IBAction func SegmentAction(_ sender: Custom_Segment) {
        
        
        print(sender.selectedSegmentIndex)
        
        if sender.selectedSegmentIndex == 1 {
            
            
            MainView.removeAllSubviews()
            let defaultView = UIStoryboard.init(name: "Main", bundle: nil)
            
            let calendar = defaultView.instantiateViewController(withIdentifier: "normalTodo")
            
            MainView.addSubview(calendar.view)
        }
        
        else{
            
            MainView.removeAllSubviews()

            let defaultView = UIStoryboard.init(name: "Main", bundle: nil)
            
            let calendar = defaultView.instantiateViewController(withIdentifier: "Calendar")
            
            MainView.addSubview(calendar.view)
        }
    }
   
    



}

