//
//  CompleteTableVC.swift
//  Marathon-ToDo
//
//  Created by Syed ShahRukh Haider on 17/09/2018.
//  Copyright © 2018 Syed ShahRukh Haider. All rights reserved.
//

import UIKit
import XLPagerTabStrip

class CompleteTableVC: UIViewController, UITableViewDataSource, UITableViewDelegate {

    @IBOutlet weak var CompleteTable: UITableView!
    let appDele = UIApplication.shared.delegate as! AppDelegate
    var completedTasks:Array = Array<Task>()
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        CompleteTable.delegate = self
        CompleteTable.dataSource = self
    }
    
    
  //============ Core Data ============
    func getData(){
        let context = appDele.persistentContainer.viewContext
        do{
            completedTasks = try context.fetch(Task.fetchRequest())
            completedTasks = completedTasks.filter({ (task) -> Bool in
                return task.isCompleted
            })
        }catch{
            print("Fetch Failed")
        }
    }
    
    // ******** Table View ************
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return completedTasks.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "CompleteCell", for: indexPath) as! CompleteTableViewCell
        tableView.separatorStyle = .none
        cell.selectionStyle = .none
        cell.backgroundColor = UIColor.clear
        cell.completeTitle.text = completedTasks[indexPath.row].taskTitle
        cell.completeDescription.text = completedTasks[indexPath.row].taskDescription
        return cell
    }
    
    
    func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete{
            let context = appDele.persistentContainer.viewContext
            context.delete(completedTasks[indexPath.row])
            appDele.saveContext()
            self.completedTasks.remove(at: indexPath.row)
            self.CompleteTable.reloadData()
        }
    }
    
    // ******** Cell Selected ************
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        
        
        let option = UIAlertController(title: nil, message: nil, preferredStyle: .actionSheet)
        
        // COMPLETE
        
        let Complete = UIAlertAction(title: "Incompleted", style:.default) { (action) in
            self.completedTasks[indexPath.row].isCompleted = false
            self.appDele.saveContext()
            self.getData()
            self.CompleteTable.reloadData()
        }
        
        option.addAction(Complete)
        
        // CANCEL
        let cancel = UIAlertAction(title: "Dismiss", style: .cancel, handler: nil)
        option.addAction(cancel)
        
        self.present(option, animated: true, completion: nil)
        
    }
    
    
    override func viewWillAppear(_ animated: Bool) {
       getData()
        CompleteTable.reloadData()
        
    }
    
    
    // ****** Prepare Segue ****************
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
        if segue.identifier == "Edit_Segue"{
            
            let dest = segue.destination as! CreateTodo
            
        }
    }
    

    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 110
    }
    
    

}

extension CompleteTableVC: IndicatorInfoProvider{
    func indicatorInfo(for pagerTabStripController: PagerTabStripViewController) -> IndicatorInfo {
        return IndicatorInfo(title: "Complete")
    }
}
