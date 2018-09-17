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
   
    var dummyData = [TodoData]()
    
    override func viewDidLoad() {
        super.viewDidLoad()

        CompleteTable.delegate = self
        CompleteTable.dataSource = self
        
        let value1 = TodoData(Title: "first", Description: "sjvbfsdjbv;sdfbvhdbvb dfvbdsb vdsbvbdsvbdsbvdsbv", Status: "Complete")
        let value2 = TodoData(Title: "Second", Description: "sjvbfsdjbv;sdfbvhdbvb dfvbdsb vdsbvbdsvbdsbvdsbv", Status: "Complete")
        self.dummyData.append(value1)
        self.dummyData.append(value2)
        
        CompleteTable.reloadData()
     
    }


    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return dummyData.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "CompleteCell", for: indexPath) as! CompleteTableViewCell
        
        tableView.separatorStyle = .none
        cell.selectionStyle = .none
        cell.backgroundColor = UIColor.clear
        
        cell.completeTitle.text = dummyData[indexPath.row].Title
        cell.completeDescription.text = dummyData[indexPath.row].Description
        return cell
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 110
        
 
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        
        
        let value = dummyData[indexPath.row]
        performSegue(withIdentifier: "Edit_Segue", sender: value)
        
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        
        if segue.identifier == "Edit_Segue"{
            
            let dest = segue.destination as! CreateTodo
            dest.buttonTitle = "Edit"
            print(sender)
            
        }
    }
    
    func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete{
            
        }
    }

}

extension CompleteTableVC: IndicatorInfoProvider{
    func indicatorInfo(for pagerTabStripController: PagerTabStripViewController) -> IndicatorInfo {
        return IndicatorInfo(title: "Complete")
    }
}
