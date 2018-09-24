//
//  IncompleteTableVC.swift
//  Marathon-ToDo
//
//  Created by Syed ShahRukh Haider on 17/09/2018.
//  Copyright © 2018 Syed ShahRukh Haider. All rights reserved.
//

import UIKit
import XLPagerTabStrip
import Firebase

class IncompleteTableVC: UIViewController, UITableViewDelegate,UITableViewDataSource {

    @IBOutlet weak var IncompleteTable: UITableView!
   
    var displayData = [[String : String]]()
    
    var dbRef : DatabaseReference!
    var dbHandle : DatabaseHandle!
    
    override func viewDidLoad() {
        super.viewDidLoad()

//
        IncompleteTable.delegate = self
        IncompleteTable.dataSource = self
        
//        self.firebaseFunction()
    }

  
    override func viewDidDisappear(_ animated: Bool) {
        
        displayData.removeAll()
    }
    override func viewDidAppear(_ animated: Bool) {
        
        self.firebaseFunction()
        
    }
    
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return displayData.count
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "IncompleteCell", for: indexPath) as! IncompleteTableViewCell
        
        tableView.separatorStyle = .none
        cell.selectionStyle = .none
        cell.backgroundColor = UIColor.clear

        
        cell.incompleteTitle.text = displayData[indexPath.row]["Title"]
        cell.incompleteDescription.text = displayData[indexPath.row]["Description"]
        
        return cell
    }
    
    
    
    // ******** Cell Selected ************
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        
        
        let option = UIAlertController(title: nil, message: nil, preferredStyle: .actionSheet)
        
        // EDIT
        let EditButton = UIAlertAction(title: "Edit", style: .default) { (action) in
            
            let selected = self.displayData[indexPath.row]["Title"]
            self.performSegue(withIdentifier: "Edit_Segue", sender: selected)
        }
        
        option.addAction(EditButton)
        
        
        // COMPLETE

        let Complete = UIAlertAction(title: "Completed", style:.default) { (action) in
            
            
            let title = self.displayData[indexPath.row]["Title"]
            self.dbRef.child("ToDo").child(title!).child("Status").setValue("Complete")
            self.displayData[indexPath.row]["Status"] = "Complete"

            self.displayData.remove(at: indexPath.row)
           
            
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
            
            let dest = segue.destination as! CreateTodo
            
            
            dest.segueName = "Edit"
            dest.selectedTitle = sender as? String
            
            
        }
    }

  
    
    
    
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 110
        
        
    }
    
    
    
    

    
    func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete{
            self.displayData.remove(at: indexPath.row)
            self.IncompleteTable.reloadData()
        }
    }
    
    
    func firebaseFunction (){
        
        self.displayData.removeAll()

        dbRef = Database.database().reference()
        
        dbHandle = dbRef.child("ToDo").observe(.childAdded, with: { (incompleteSnap) in
            
            
            let value = incompleteSnap.value as! [String : String]
            
            
            if value["Status"] == "Incomplete"{
                
                self.displayData.append(value)
                
                self.IncompleteTable.reloadData()
            }
            
            
        })
    }

}

extension IncompleteTableVC : IndicatorInfoProvider{
    
    func indicatorInfo(for pagerTabStripController: PagerTabStripViewController) -> IndicatorInfo {
        return IndicatorInfo(title: "Incomplete")
    }
}
