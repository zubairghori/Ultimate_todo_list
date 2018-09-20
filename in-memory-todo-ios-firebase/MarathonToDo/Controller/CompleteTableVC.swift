//
//  CompleteTableVC.swift
//  Marathon-ToDo
//
//  Created by Syed ShahRukh Haider on 17/09/2018.
//  Copyright © 2018 Syed ShahRukh Haider. All rights reserved.
//

import UIKit
import XLPagerTabStrip
import Firebase

class CompleteTableVC: UIViewController, UITableViewDataSource, UITableViewDelegate {

    @IBOutlet weak var CompleteTable: UITableView!
   

    var displayData = [[String : String]]()
    
   
    var dbRef : DatabaseReference!
    var dbHandle : DatabaseHandle!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        //
        CompleteTable.delegate = self
        CompleteTable.dataSource = self

        
        
    }
    
  
    
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return displayData.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "CompleteCell", for: indexPath) as! CompleteTableViewCell
        
        tableView.separatorStyle = .none
        cell.selectionStyle = .none
        cell.backgroundColor = UIColor.clear
        
        
        cell.completeTitle.text = displayData[indexPath.row]["Title"]
        cell.completeDescription.text = displayData[indexPath.row]["Description"]
        
        return cell
    }
    
    
    
    // ******** Cell Selected ************
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        
        
        let option = UIAlertController(title: nil, message: nil, preferredStyle: .actionSheet)
        

        
        
        // COMPLETE
        
        let Complete = UIAlertAction(title: "Incompleted", style:.default) { (action) in
            
            let title = self.displayData[indexPath.row]["Title"]
            self.dbRef.child("ToDo").child(title!).child("Status").setValue("Incomplete")
            
            self.displayData[indexPath.row]["Status"] = "Incomplete"
            
            self.displayData.remove(at: indexPath.row)
            
            self.CompleteTable.reloadData()
        }
        
        option.addAction(Complete)
        
        
        // CANCEL
        let cancel = UIAlertAction(title: "Dismiss", style: .cancel, handler: nil)
        option.addAction(cancel)
        
        self.present(option, animated: true, completion: nil)
        
        
        
    }
    
    
    override func viewDidDisappear(_ animated: Bool) {
 
        displayData.removeAll()
    }
    override func viewDidAppear(_ animated: Bool) {
    
        self.firebaseFunction()

    }
    
    
    // ****** Prepare Segue ****************
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
        if segue.identifier == "Edit_Segue"{
            
            let dest = segue.destination as! CreateTodo
            
            
            dest.segueName = "Edit"
            
            
        }
    }
    
    
    
    
    
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 110
        
        
    }
    
    
    
    
    
    
    func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete{
            self.displayData.remove(at: indexPath.row)
            self.CompleteTable.reloadData()
        }
    }
    
    
    func firebaseFunction (){
        
        self.displayData.removeAll()
        dbRef = Database.database().reference()
        
        dbHandle = dbRef.child("ToDo").observe(.childAdded, with: { (CompleteSnap) in
            
            
            let value = CompleteSnap.value as! [String : String]
            
            
            if value["Status"] == "Complete"{
                
                self.displayData.append(value)
                
                self.CompleteTable.reloadData()
            }
            
            
        })
    }


}

extension CompleteTableVC: IndicatorInfoProvider{
    func indicatorInfo(for pagerTabStripController: PagerTabStripViewController) -> IndicatorInfo {
        return IndicatorInfo(title: "Complete")
    }
}
