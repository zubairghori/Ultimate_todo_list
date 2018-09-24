//
//  IncompleteTableVC.swift
//  Marathon-ToDo
//
//  Created by Syed ShahRukh Haider on 17/09/2018.
//  Copyright © 2018 Syed ShahRukh Haider. All rights reserved.
//

import UIKit
import XLPagerTabStrip

class IncompleteTableVC: UIViewController, UITableViewDelegate,UITableViewDataSource {

    
    @IBOutlet weak var IncompleteTable: UITableView!
    
    let appDele = UIApplication.shared.delegate as! AppDelegate
   
    var incompletedTasks:Array = Array<Task>()
    
 
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        IncompleteTable.delegate = self
        IncompleteTable.dataSource = self
    }
    
    override func viewDidAppear(_ animated: Bool) {
        IncompleteTable.reloadData()
    }

    
    override func viewWillAppear(_ animated: Bool) {
        getData()
        IncompleteTable.reloadData()
    }
    
    
    // ******** Core Data ************
    
    func getData(){
        let context = appDele.persistentContainer.viewContext
        do{
            incompletedTasks = try context.fetch(Task.fetchRequest())
            incompletedTasks = incompletedTasks.filter({ (task) -> Bool in
                return !task.isCompleted
            })
        }catch{
            print("Fetch Failed")
        }
    }
    
    // ******** Table View ************
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return incompletedTasks.count
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "IncompleteCell", for: indexPath) as! IncompleteTableViewCell
        tableView.separatorStyle = .none
        cell.selectionStyle = .none
        cell.backgroundColor = UIColor.clear
        cell.incompleteTitle.text = incompletedTasks[indexPath.row].taskTitle
        cell.incompleteDescription.text = incompletedTasks[indexPath.row].taskDescription
        return cell
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 110
    }
    
    
    // ******** Cell Selected ************
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        
        
        let option = UIAlertController(title: nil, message: nil, preferredStyle: .actionSheet)
        
        // EDIT
        let EditButton = UIAlertAction(title: "Edit", style: .default) { (action) in
            
            let selectedIndex = indexPath.row
            self.performSegue(withIdentifier: "Edit_Segue", sender: self.incompletedTasks[indexPath.row])
        }
        
        option.addAction(EditButton)
        
        
        // COMPLETE

        let Complete = UIAlertAction(title: "Completed", style:.default) { (action) in
            
            self.incompletedTasks[indexPath.row].isCompleted = true
            self.appDele.saveContext()
            self.getData()
            
            self.IncompleteTable.reloadData()
        }
        
        option.addAction(Complete)
        
        
        // CANCEL
        let cancel = UIAlertAction(title: "Dismiss", style: .cancel, handler: nil)
        option.addAction(cancel)
        
        self.present(option, animated: true, completion: nil)

        
    }
    
    
    
    // ****** Prepare Segue ****************
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
        if segue.identifier == "Edit_Segue"{
        let destination = segue.destination as! CreateTodo
            destination.selectedTask = sender as! Task
            
        }
    }

  
    
    
    
    

    
    func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete{
            let context = appDele.persistentContainer.viewContext
            context.delete(incompletedTasks[indexPath.row])
            appDele.saveContext()
            getData()
            self.IncompleteTable.reloadData()
        }
    }

}

extension IncompleteTableVC : IndicatorInfoProvider{
    
    func indicatorInfo(for pagerTabStripController: PagerTabStripViewController) -> IndicatorInfo {
        return IndicatorInfo(title: "Incomplete")
    }
}
