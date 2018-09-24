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
   
    var displayData = [[String : String]]()
    
    
    var ShareData = UIApplication.shared.delegate as! AppDelegate
    
    
    override func viewDidLoad() {
        super.viewDidLoad()

//
        IncompleteTable.delegate = self
        IncompleteTable.dataSource = self
        
        

        if  ShareData.incompleteDatabse.isEmpty == false{
            self.displayData = ShareData.incompleteDatabse

        }
        
        
        
        
        IncompleteTable.reloadData()
  
        
    }

    override func viewDidAppear(_ animated: Bool) {
        
        IncompleteTable.reloadData()
        
    }

    override func viewWillAppear(_ animated: Bool) {
        self.displayData = ShareData.incompleteDatabse
        IncompleteTable.reloadData()

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
        
        cell.delete.tag = indexPath.row
        cell.edit.tag = indexPath.row
        
        cell.delete.addTarget(self, action: #selector(self.deleteTask), for: .touchUpInside)
        cell.edit.addTarget(self, action: #selector(editTask), for: .touchUpInside)
        return cell
    }
    
    @objc func deleteTask(button : UIButton){
        
        let index = button.tag
        self.displayData.remove(at: index)
        self.ShareData.incompleteDatabse.remove(at: index)
        self.IncompleteTable.reloadData()
    }
    
    @objc func editTask(button : UIButton) {
        
        
        let index = button.tag
        
        let option = UIAlertController(title: nil, message: nil, preferredStyle: .actionSheet)

        // EDIT
        let EditButton = UIAlertAction(title: "Edit", style: .default) { (action) in

            let selectedIndex = index
            self.performSegue(withIdentifier: "Edit_Segue", sender: selectedIndex)
        }

        option.addAction(EditButton)


        // COMPLETE

        let Complete = UIAlertAction(title: "Completed", style:.default) { (action) in



            self.displayData[index]["Status"] = "Complete"
            self.ShareData.completeDatabase.append(self.displayData[index])

            self.displayData.remove(at: index)
            self.ShareData.incompleteDatabse.remove(at: index)


            self.IncompleteTable.reloadData()
        }

        option.addAction(Complete)


        // CANCEL
        let cancel = UIAlertAction(title: "Dismiss", style: .cancel, handler: nil)
        option.addAction(cancel)

        self.present(option, animated: true, completion: nil)
        
        
    }
    
    
    // ******** Cell Selected ************
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        
        
//        let option = UIAlertController(title: nil, message: nil, preferredStyle: .actionSheet)
//
//        // EDIT
//        let EditButton = UIAlertAction(title: "Edit", style: .default) { (action) in
//
//            let selectedIndex = indexPath.row
//            self.performSegue(withIdentifier: "Edit_Segue", sender: selectedIndex)
//        }
//
//        option.addAction(EditButton)
//
//
//        // COMPLETE
//
//        let Complete = UIAlertAction(title: "Completed", style:.default) { (action) in
//
//
//
//            self.displayData[indexPath.row]["Status"] = "Complete"
//            self.ShareData.completeDatabase.append(self.displayData[indexPath.row])
//
//            self.displayData.remove(at: indexPath.row)
//            self.ShareData.incompleteDatabse.remove(at: indexPath.row)
//
//
//            self.IncompleteTable.reloadData()
//        }
//
//        option.addAction(Complete)
//
//
//        // CANCEL
//        let cancel = UIAlertAction(title: "Dismiss", style: .cancel, handler: nil)
//        option.addAction(cancel)
//
//        self.present(option, animated: true, completion: nil)
        
     
        
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
