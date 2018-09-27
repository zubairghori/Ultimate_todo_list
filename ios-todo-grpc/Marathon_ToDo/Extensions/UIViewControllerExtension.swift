//
//  UIViewContrllerExtension.swift
//  Marathon_ToDo
//
//  Created by Nasrullah Khan  on 27/09/2018.
//  Copyright © 2018 Syed ShahRukh Haider. All rights reserved.
//

import UIKit

extension UIViewController {
    
    func showAlert(title: String, message: String) {
        
        // alert configuration
        let alertVC = UIAlertController(title: title, message: message, preferredStyle: .alert)
        alertVC.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.default,handler: nil))
        
        self.present(alertVC, animated: true, completion: nil)
    }
    
    func showAlert(title:String, message: String, okClick: @escaping ()->Void ){
        
        let alertVC = UIAlertController(title: title, message: message, preferredStyle: UIAlertControllerStyle.alert)
        
        alertVC.addAction(UIAlertAction(title: "OK", style: UIAlertActionStyle.default, handler: { (action) -> Void in
            okClick()
        }))
        
        self.present(alertVC, animated: true, completion: nil)
    }
    
    
    func requiredAlert(message: String) {
        
        // alert configuration
        let alertVC = UIAlertController(title: "Required", message: message, preferredStyle: UIAlertControllerStyle.alert)
        alertVC.addAction(UIAlertAction(title: "OK", style: .default,handler: nil))
        
        self.present(alertVC, animated: true, completion: nil)
    }
}
