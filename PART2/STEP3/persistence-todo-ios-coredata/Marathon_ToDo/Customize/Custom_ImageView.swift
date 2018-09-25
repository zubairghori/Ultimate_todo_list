//
//  Custom_ImageView.swift
//  Gleepads
//
//  Created by Syed ShahRukh Haider on 19/03/2018.
//  Copyright © 2018 Syed ShahRukh Haider. All rights reserved.
//

import UIKit

@IBDesignable class Custom_ImageView: UIImageView {

    @IBInspectable
    var C_Radius : CGFloat = 0 {
        didSet{
            layer.cornerRadius = C_Radius
            layer.masksToBounds = true
        }
        
    }
    
    @IBInspectable
    var shadowRadius: CGFloat {
        get {
            return layer.shadowRadius
        }
        set {
            layer.shadowRadius = newValue
        }
    }
    
    @IBInspectable
    var shadowOpacity: Float {
        get {
            return layer.shadowOpacity
        }
        set {
            layer.shadowOpacity = newValue
        }
    }
    
    @IBInspectable
    var shadowOffset: CGSize {
        get {
            return layer.shadowOffset
        }
        set {
            layer.shadowOffset = newValue
        }
    }
    
    @IBInspectable
    var shadowColor: UIColor? {
        get {
            if let color = layer.shadowColor {
                return UIColor(cgColor: color)
            }
            return nil
        }
        set {
            if let color = newValue {
                layer.shadowColor = color.cgColor
            } else {
                layer.shadowColor = nil
            }
        }
    }
    
    @IBInspectable var border_color : UIColor = UIColor.clear {
        
        didSet{
            layer.borderWidth = 1
            
            layer.borderColor = border_color.cgColor
        }
    }
    
    @IBInspectable var border_width : CGFloat = 0{
        didSet{
            
            layer.borderWidth = border_width
        }
        
    }

}
