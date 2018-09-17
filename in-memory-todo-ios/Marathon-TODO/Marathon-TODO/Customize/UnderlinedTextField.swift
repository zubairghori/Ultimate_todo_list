

import UIKit

@IBDesignable
class UnderlinedTextField: UITextField, UITextFieldDelegate {
    
    let red = UIColor(red: 234.0/255.0, green: 36.0/255.0, blue: 37.0/255.0, alpha: 1.0)
    
    @IBInspectable var width: CGFloat = 0.0
    @IBInspectable var color: UIColor = UIColor(red: 234.0/255.0, green: 36.0/255.0, blue: 37.0/255.0, alpha: 0.5)
    @IBInspectable var placeholderColor: UIColor = UIColor(red: 234.0/255.0, green: 36.0/255.0, blue: 37.0/255.0, alpha: 0.5)
    @IBInspectable var icon:UIImage?
    @IBInspectable var iconIndent:Int=0
    @IBInspectable var icony:CGFloat=0
    @IBInspectable var indentation:CGFloat=20
    
    
    
    override func draw(_ rect: CGRect) {
        self.delegate = self
        self.clipsToBounds = true
        self.layer.cornerRadius = self.frame.height / 2
        self.layer.borderColor = UIColor.lightGray.cgColor
        self.layer.borderWidth = 1.0
        let underline = CALayer()
        underline.borderColor = color.cgColor
        underline.frame = CGRect(x: 0, y: self.frame.size.height - width, width:  self.frame.size.width, height: self.frame.size.height)
        underline.borderWidth = width
        self.layer.addSublayer(underline)
        self.layer.masksToBounds = true
        
        if(self.attributedPlaceholder?.string != nil){
            let placholderString = NSMutableAttributedString(string: self.attributedPlaceholder!.string, attributes: [NSAttributedStringKey.foregroundColor:placeholderColor])
            self.attributedPlaceholder = placholderString
        }
        
        if(icon != nil){
            if(iconIndent>0){
                let imageView = UIImageView(frame: CGRect(x: iconIndent, y: 0, width: 20, height: 20))
                imageView.center.y=self.icony
                imageView.contentMode=UIViewContentMode.scaleAspectFit
                imageView.image = icon?.withRenderingMode(UIImageRenderingMode.alwaysTemplate)
                self.addSubview(imageView)
                print(imageView.frame)
            }
            else{
                let imageView = UIImageView(frame: CGRect(x: 0, y: 0, width: 27, height: 20))
                imageView.contentMode=UIViewContentMode.scaleAspectFit
                imageView.image = icon?.withRenderingMode(UIImageRenderingMode.alwaysTemplate)
                self.leftView = imageView
                self.leftViewMode = UITextFieldViewMode.always
                self.addSubview(imageView)
            }
        }
        
    }
    
    
    override func textRect(forBounds bounds: CGRect) -> CGRect {
        return CGRect(x: indentation, y: bounds.origin.y, width: bounds.width, height: bounds.height)
    }

    override func editingRect(forBounds bounds: CGRect) -> CGRect {
        return CGRect(x: indentation, y: bounds.origin.y, width: bounds.width, height: bounds.height)
    }
    
    func textFieldDidBeginEditing(_ textField: UITextField) {
        self.layer.borderColor = UIColor.blue.cgColor
    }
    
    func textFieldDidEndEditing(_ textField: UITextField) {
        self.layer.borderColor = UIColor.lightGray.cgColor
    }

}


extension UIColor {
    
    convenience init(hexColor: String) {
        let scannHex = Scanner(string: hexColor)
        var rgbValue: UInt64 = 0
        scannHex.scanLocation = 0
        scannHex.scanHexInt64(&rgbValue)
        let r = (rgbValue & 0xff0000) >> 16
        let g = (rgbValue & 0xff00) >> 8
        let b = rgbValue & 0xff
        self.init(
            red: CGFloat(r) / 0xff,
            green: CGFloat(g) / 0xff,
            blue: CGFloat(b) / 0xff, alpha: 1
        )
    }
}


