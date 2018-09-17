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
   
    var dummyData = [TodoData]()
    
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()

//
        IncompleteTable.delegate = self
        IncompleteTable.dataSource = self
        
        
        let value1 = TodoData(Title: "Third", Description: "sjvbfsdjbv;sdfbvhdbvb dfvbdsb vdsbvbdsvbdsbvdsbv", Status: "Incomplete")
        let value2 = TodoData(Title: "Fourth", Description: "sjvbfsdjbv;sdfbvhdbvb dfvbdsb vdsbvbdsvbdsbvdsbv", Status: "Incomplete")
        
        self.dummyData.append(value1)
        self.dummyData.append(value2)
        IncompleteTable.reloadData()
 
        
   
       
        
        
    }


    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return dummyData.count
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "IncompleteCell", for: indexPath) as! IncompleteTableViewCell
        
        tableView.separatorStyle = .none
        cell.selectionStyle = .none
        cell.backgroundColor = UIColor.clear

        
        cell.incompleteTitle.text = dummyData[indexPath.row].Title
        cell.incompleteDescription.text = dummyData[indexPath.row].Description
        
        return cell
    }

  
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 110
        
        
    }

    
    func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete{
            
        }
    }

}

extension IncompleteTableVC : IndicatorInfoProvider{
    
    func indicatorInfo(for pagerTabStripController: PagerTabStripViewController) -> IndicatorInfo {
        return IndicatorInfo(title: "Incomplete")
    }
}
