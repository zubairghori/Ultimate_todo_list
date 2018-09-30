//
//  Task.swift
//  Marathon_ToDo
//
//  Created by Nasrullah Khan  on 30/09/2018.
//  Copyright © 2018 Syed ShahRukh Haider. All rights reserved.
//

import Foundation

class Task {
    var _id: String
    var title: String
    var description: String
    var status: String
    
    init(title: String, description: String, status: String) {
        self.title = title
        self.description = description
        self.status = status
        self._id = "auto"
    }
    
    init(_id: String, title: String, description: String, status: String) {
        self.title = title
        self.description = description
        self.status = status
        self._id = _id
    }
}
