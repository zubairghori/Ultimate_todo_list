//
//  ConfigureUserInterface.swift
//  HospitalApplication
//
//  Created by Danish Rehman on 03/07/2018.
//  Copyright © 2018 Danish Rehman. All rights reserved.
//

import Foundation
import UIKit

public class ConfigureUserInterface: NSObject{
    
    
    public static func configureNavigationBar(navBar : UINavigationBar){
        navBar.setBackgroundImage(UIImage(), for: .default)
        navBar.shadowImage = UIImage()
        navBar.isTranslucent = true
        navBar.backgroundColor = UIColor.clear
    }
    
}
