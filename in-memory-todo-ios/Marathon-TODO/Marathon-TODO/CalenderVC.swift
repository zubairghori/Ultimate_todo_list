//
//  CalenderVC.swift
//  Gleepads
//
//  Created by Syed ShahRukh Haider on 04/04/2018.
//  Copyright © 2018 Syed ShahRukh Haider. All rights reserved.
//

import UIKit
import CVCalendar

class CalenderVC: UIViewController, CVCalendarViewDelegate,CVCalendarMenuViewDelegate, UITableViewDataSource,UITableViewDelegate {
    
    
    
    func presentationMode() -> CalendarMode {
        return .monthView
    }
        func firstWeekday() -> Weekday {
        return .monday
    }
    

    
 
    
    @IBOutlet weak var todoLIst: UITableView!
    
    @IBOutlet weak var calendarMenu: CVCalendarMenuView!
    
    @IBOutlet weak var calendarView: CVCalendarView!
    
    var selectedIndex = [Int]()

    
    var dummyData  = ["first","Second","Third","forth","fifth","Sixth","seventh"]
    
    override func viewDidLoad() {
        super.viewDidLoad()

        calendarView.delegate = self
        calendarMenu.delegate = self
        

        todoLIst.dataSource = self
        todoLIst.delegate = self
        
        todoLIst.allowsMultipleSelection = true
        
        todoLIst.reloadData()
        
       
        
    }

    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        
        calendarMenu.commitMenuViewUpdate()
        calendarView.commitCalendarViewUpdate()
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return dummyData.count
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "calendarCell", for: indexPath) as! calendarCell
        cell.backgroundColor = UIColor.clear
        tableView.separatorStyle = .none
        cell.selectionStyle = .none
        cell.TodoText.text = dummyData[indexPath.row]
        
        if self.selectedIndex.contains(indexPath.row){
            cell.todoStatus.backgroundColor = UIColor(hexColor: "8BD27D")
        }else{
            cell.todoStatus.backgroundColor = UIColor.white
        }
        
        return cell
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        
        let  check = tableView.cellForRow(at: indexPath) as! calendarCell
        check.todoStatus.backgroundColor = UIColor(hexColor: "8BD27D")
        self.selectedIndex.append(indexPath.row)
        
        print(self.selectedIndex)
        
        
    }
    
    func tableView(_ tableView: UITableView, didDeselectRowAt indexPath: IndexPath) {
        
        
        
        if let i = self.selectedIndex.index(of: indexPath.row) {
            let check = tableView.cellForRow(at: indexPath) as! calendarCell
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
