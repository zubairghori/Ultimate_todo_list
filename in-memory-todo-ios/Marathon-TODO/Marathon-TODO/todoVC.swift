//
//  todoVC.swift
//  Marathon-TODO
//
//  Created by Syed ShahRukh Haider on 17/09/2018.
//  Copyright © 2018 Syed ShahRukh Haider. All rights reserved.
//

import UIKit

class todoVC: UIViewController, UITableViewDataSource,UITableViewDelegate {

    
    @IBOutlet weak var DATELABEL: UILabel!
    @IBOutlet weak var todoList: UITableView!
    
    var selectedIndex = [Int]()

    
    var dummyData  = ["first","Second","Third","forth","fifth","Sixth","seventh"]

    
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        
        let currentDate = Date()
        
        let date = DateFormatter()
        date.dateFormat = "MM/dd/yyyy"
        
       self.DATELABEL.text = date.string(from: currentDate)
        
        
        
        todoList.dataSource = self
        todoList.delegate = self
        todoList.allowsMultipleSelection = true
        todoList.reloadData()
    }

    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return dummyData.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "todoTC", for: indexPath) as! todoTC
        cell.backgroundColor = UIColor.clear
        tableView.separatorStyle = .none
        cell.selectionStyle = .none
        cell.todoTitle.text = dummyData[indexPath.row]
        
        if self.selectedIndex.contains(indexPath.row){
            cell.todoStatus.backgroundColor = UIColor(hexColor: "8BD27D")
        }else{
            cell.todoStatus.backgroundColor = UIColor.white
        }
        
        return cell
    }
    
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        
        let  check = tableView.cellForRow(at: indexPath) as! todoTC
        check.todoStatus.backgroundColor = UIColor(hexColor: "8BD27D")
        self.selectedIndex.append(indexPath.row)
        
        print(self.selectedIndex)
        
        
    }
    
    func tableView(_ tableView: UITableView, didDeselectRowAt indexPath: IndexPath) {
        
        
        
        if let i = self.selectedIndex.index(of: indexPath.row) {
            let check = tableView.cellForRow(at: indexPath) as! todoTC
            check.todoStatus.backgroundColor = UIColor.white
            self.selectedIndex.remove(at: i)
            
            
        }
        
        print(self.selectedIndex)
        
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 75
    }
    
    func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
        
        if editingStyle == .delete{
            
        }
    }

}
