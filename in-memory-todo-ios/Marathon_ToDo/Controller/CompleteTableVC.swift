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
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        //
        CompleteTable.delegate = self
        CompleteTable.dataSource = self
        
        
        
        if  ShareData.incompleteDatabse.isEmpty == false{
            self.displayData = ShareData.completeDatabase
            
        }
        
        
        
        
        CompleteTable.reloadData()
        
        
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
            
            
            
            self.displayData[indexPath.row]["Status"] = "Incomplete"
            self.ShareData.incompleteDatabse.append(self.displayData[indexPath.row])
            
            self.ShareData.completeDatabase.remove(at: indexPath.row)
            self.displayData.remove(at: indexPath.row)
            
            self.CompleteTable.reloadData()
        }
        
        option.addAction(Complete)
        
        
        // CANCEL
        let cancel = UIAlertAction(title: "Dismiss", style: .cancel, handler: nil)
        option.addAction(cancel)
        
        self.present(option, animated: true, completion: nil)
        
        
        
    }
    
    
    override func viewWillAppear(_ animated: Bool) {
        self.displayData = ShareData.completeDatabase
        CompleteTable.reloadData()
        
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
        return 110
        
        
    }
    
    
    
    
    
    
    func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete{
            self.displayData.remove(at: indexPath.row)
            self.ShareData.completeDatabase.remove(at: indexPath.row)
            self.CompleteTable.reloadData()
        }
    }

}

extension CompleteTableVC: IndicatorInfoProvider{
    func indicatorInfo(for pagerTabStripController: PagerTabStripViewController) -> IndicatorInfo {
        return IndicatorInfo(title: "Complete")
    }
}
