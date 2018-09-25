//
//  IncompleteTableViewCell.swift
//  Marathon-ToDo
//
//  Created by Syed ShahRukh Haider on 17/09/2018.
//  Copyright © 2018 Syed ShahRukh Haider. All rights reserved.
//

import UIKit

class IncompleteTableViewCell: UITableViewCell {

    @IBOutlet weak var incompleteTitle: UILabel!
    
    @IBOutlet weak var incompleteDescription: UILabel!
    
    @IBOutlet weak var delete: UIButton!
    @IBOutlet weak var edit: UIButton!
}
