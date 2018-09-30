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
   
    var displayData = [[String : String]]()
    
    var ShareData = UIApplication.shared.delegate as! AppDelegate
    var tasks = [Task]() { didSet  { DispatchQueue.main.async { self.CompleteTable.reloadData() }}}
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        CompleteTable.delegate = self
        CompleteTable.dataSource = self
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        TaskServices.getAllTasks { (error, tasks) in
            guard (error == nil) else {
                return
            }
            self.tasks = tasks!.filter({ $0.status == "done" })
        }
    }
  
    @IBAction func deleteAction(_ sender: Any) {
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.tasks.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "CompleteCell", for: indexPath) as! CompleteTableViewCell
        
        tableView.separatorStyle = .none
        cell.selectionStyle = .none
        cell.backgroundColor = UIColor.clear

        let item = self.tasks[indexPath.row]
        cell.completeTitle.text = item.title
        cell.completeDescription.text = item.description
        cell.delete.tag = indexPath.row
        cell.delete.addTarget(self, action: #selector(self.deleteTask), for: .touchUpInside)
        
        cell.editButton.tag = indexPath.row
        cell.editButton.addTarget(self, action: #selector(self.edit(_:)), for: .touchUpInside)

        return cell
    }
    
    @objc func deleteTask(button : UIButton){
        let task = self.tasks[button.tag]
        
        TaskServices.deleteTask(taskid: task._id) { (error) in
            guard error == nil else { return }
            self.tasks.remove(at: button.tag)
        }
    }
    
    @objc func edit(_ sender: UIButton) {
        
        let option = UIAlertController(title: nil, message: nil, preferredStyle: .actionSheet)
        
        // COMPLETE
        let Complete = UIAlertAction(title: "Incompleted", style:.default) { (action) in
            let task = self.tasks[sender.tag]
            task.status = "pending"
            TaskServices.updateTask(task: task, completion: { (error, task) in
                guard (error == nil) else { self.showAlert(title: "Error", message: error!); return }
                if task!.status == "pending" { self.tasks.remove(at: sender.tag)}
            })
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
            let dest = segue.destination as! CreateTodo
            dest.segueName = "Edit"
            dest.selectedIndex = sender as? Int
        }
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 130
    }

    func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
    }
}

extension CompleteTableVC: IndicatorInfoProvider{
    func indicatorInfo(for pagerTabStripController: PagerTabStripViewController) -> IndicatorInfo {
        return IndicatorInfo(title: "Complete")
    }
}
