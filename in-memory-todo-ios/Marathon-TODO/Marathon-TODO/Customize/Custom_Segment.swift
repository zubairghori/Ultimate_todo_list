//
//  Custom_Segment.swift
//  Appxiety
//
//  Created by Syed ShahRukh Haider on 04/09/2018.
//  Copyright © 2018 Syed ShahRukh Haider. All rights reserved.
//

import UIKit

@IBDesignable
class Custom_Segment: UIControl {

    
    var buttons = [UIButton]()
    var selector : UIView!
    var selectedSegmentIndex = 0
    @IBInspectable
    var borderWidth : CGFloat = 0{
        
        didSet{
            layer.borderWidth = borderWidth
        }
    }
    
    @IBInspectable var border_color : UIColor = UIColor.clear {
        
        didSet{
            layer.borderWidth = 1
            
            layer.borderColor = border_color.cgColor
        }
    }
    
    @IBInspectable
    var commaSeparatedButtonTitle : String = ""{
        
        didSet{
            updateView()
        }
    }
    
    @IBInspectable
    var textColor: UIColor = .lightGray{
        
        didSet{
            updateView()
        }
    }
    
    
    @IBInspectable
    var selectorColor : UIColor = .blue{
        
        didSet{
            updateView()
        }
    }
    
    
    @IBInspectable
    var selectorTextColor : UIColor = .white{
        
        didSet{
            updateView()
        }
    }
    
    func updateView(){
        
        buttons.removeAll()
        subviews.forEach{$0.removeFromSuperview()}
        
        
        
        
        let buttonTitles = commaSeparatedButtonTitle.components(separatedBy: ",")
        
        for buttonTitle in buttonTitles{
            let button = UIButton(type: .system)
            button.setTitle(buttonTitle, for: .normal)
            button.setTitleColor(textColor, for: .normal)
            button.addTarget(self, action: #selector(buttonTapped(button:)), for: .touchUpInside )
            buttons.append(button)
        }
        
        buttons[0].setTitleColor(selectorTextColor, for: .normal )
        
        let   selectorWidth = frame.width/CGFloat(buttonTitles.count)
        selector = UIView(frame: CGRect(x: 0, y: 0, width: selectorWidth, height: frame.height))
        selector.layer.cornerRadius = frame.height/2
        selector.backgroundColor = selectorColor
        addSubview(selector)
        
        let stack = UIStackView(arrangedSubviews: buttons)
        stack.axis = .horizontal
        stack.alignment = .fill
        stack.distribution = .fillProportionally
        addSubview(stack)
        stack.translatesAutoresizingMaskIntoConstraints = false
        stack.topAnchor.constraint(equalTo: self.topAnchor).isActive = true
        stack.bottomAnchor.constraint(equalTo: self.bottomAnchor).isActive = true
        stack.rightAnchor.constraint(equalTo: self.rightAnchor).isActive = true
        stack.leftAnchor.constraint(equalTo: self.leftAnchor).isActive = true

    }
    
    override func draw(_ rect: CGRect){
        layer.cornerRadius = frame.height/2
    }
    
    
    @objc func buttonTapped(button: UIButton){
        for (buttonIndex, btn) in buttons.enumerated(){
            
            btn.setTitleColor(textColor, for: .normal)
            
            if btn == button{
                
                selectedSegmentIndex = buttonIndex
                let selectorInitialPosition = frame.width/CGFloat(buttons.count) * CGFloat(buttonIndex)
                
               
                
                UIView.animate(withDuration: 0.3) {
                    self.selector.frame.origin.x = selectorInitialPosition
                }
                btn.setTitleColor(selectorTextColor, for: .normal)
            }
        }
        sendActions(for: .valueChanged)
    }
 
}
