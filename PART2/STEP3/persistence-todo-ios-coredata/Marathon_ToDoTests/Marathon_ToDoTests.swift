//
//  Marathon_ToDoTests.swift
//  Marathon_ToDoTests
//
//  Created by Syed ShahRukh Haider on 18/09/2018.
//  Copyright © 2018 Syed ShahRukh Haider. All rights reserved.
//


    
    import XCTest
    @testable import Marathon_ToDo
    
    class Marathon_ToDoTests: XCTestCase {
        
        override func setUp() {
            super.setUp()
            // Put setup code here. This method is called before the invocation of each test method in the class.
        }
        
        
        func testNumberofSection(){
            let incompleteVC = IncompleteTableVC()
            
            let view = UITableView()
            let delegate = UIApplication.shared.delegate as! AppDelegate
            
            
            delegate.incompleteDatabse.append(["Title": "Test", "Description":"test", "Status":""])
            
            let count = delegate.incompleteDatabse.count
            
            XCTAssertEqual(incompleteVC.tableView(view, numberOfRowsInSection: count), 0)
        }
        
        
        
}
