//
//  IncompleteTableVC.swift
//  Marathon-ToDo
//
//  Created by Syed ShahRukh Haider on 17/09/2018.
//  Copyright © 2018 Syed ShahRukh Haider. All rights reserved.
//

import UIKit
import XLPagerTabStrip

class IncompleteTableVC: UIViewController {
    
    @IBOutlet weak var IncompleteTable: UITableView!
    
    var displayData = [[String : String]]()
    var ShareData = UIApplication.shared.delegate as! AppDelegate
    var tasks = [Task]() { didSet  { DispatchQueue.main.async { self.IncompleteTable.reloadData() }}}
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        IncompleteTable.delegate = self
        IncompleteTable.dataSource = self
        
        if  ShareData.incompleteDatabse.isEmpty == false{
            self.displayData = ShareData.incompleteDatabse
        }
        
        IncompleteTable.reloadData()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        self.displayData = ShareData.incompleteDatabse
        
        TaskServices.getAllTasks { (error, tasks) in
            guard (error == nil) else {
                return
            }
            self.tasks = tasks!.filter({ $0.status == "pending" })
        }

    }
    
    @objc func deleteTask(button : UIButton){
        let task = self.tasks[button.tag]
        
        TaskServices.deleteTask(taskid: task._id) { (error) in
            guard error == nil else { return }
            self.tasks.remove(at: button.tag)
        }
    }
    
    @objc func editTask(button : UIButton) {

        let alert = UIAlertController(title: nil, message: nil, preferredStyle: .actionSheet)
        
        // EDIT
        let EditButton = UIAlertAction(title: "Edit", style: .default) { (action) in
            self.performSegue(withIdentifier: "Edit_Segue", sender: self.tasks[button.tag])
        }
        alert.addAction(EditButton)
        
        //COMPLETE
        let Complete = UIAlertAction(title: "Completed", style:.default) { (action) in
            let task = self.tasks[button.tag]
            task.status = "done"
            TaskServices.updateTask(task: task, completion: { (error, task) in
                guard (error == nil) else { self.showAlert(title: "Error", message: error!); return }
                if task!.status == "done" { self.tasks.remove(at: button.tag)}
            })
        }
        alert.addAction(Complete)
        
        // CANCEL
        let cancel = UIAlertAction(title: "Dismiss", style: .cancel, handler: nil)
        alert.addAction(cancel)
        
        self.present(alert, animated: true, completion: nil)
    }
    
    // ****** Prepare Segue ****************
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "Edit_Segue"{
            let dest = segue.destination as! CreateTodo
            dest.segueName = "Edit"
            dest.task = sender as? Task
        }
    }
}

extension IncompleteTableVC: UITableViewDataSource, UITableViewDelegate {
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.tasks.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "IncompleteCell", for: indexPath) as! IncompleteTableViewCell
        
        tableView.separatorStyle = .none
        cell.selectionStyle = .none
        cell.backgroundColor = UIColor.clear
        
        let task = self.tasks[indexPath.row]
        
        cell.incompleteTitle.text = task.title
        cell.incompleteDescription.text = task.description
        
        cell.delete.tag = indexPath.row
        cell.edit.tag = indexPath.row
        
        cell.delete.addTarget(self, action: #selector(self.deleteTask), for: .touchUpInside)
        cell.edit.addTarget(self, action: #selector(editTask), for: .touchUpInside)
        return cell
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 130
    }
    
    func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete{
            self.displayData.remove(at: indexPath.row)
            self.ShareData.incompleteDatabse.remove(at: indexPath.row)
            self.IncompleteTable.reloadData()
        }
    }
}

extension IncompleteTableVC : IndicatorInfoProvider{
    
    func indicatorInfo(for pagerTabStripController: PagerTabStripViewController) -> IndicatorInfo {
        return IndicatorInfo(title: "Incomplete")
    }
}
