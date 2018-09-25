//
//  ViewController.swift
//  Marathon-ToDo
//
//  Created by Syed ShahRukh Haider on 17/09/2018.
//  Copyright © 2018 Syed ShahRukh Haider. All rights reserved.
//

import UIKit
import XLPagerTabStrip

class ViewController: ButtonBarPagerTabStripViewController {

    override func viewDidLoad() {
        
        self.loadDesign()
        super.viewDidLoad()
    }

    override func viewControllers(for pagerTabStripController: PagerTabStripViewController) -> [UIViewController] {
        let child1 = UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: "Complete")
        let child2 = UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: "Incomplete")

        return [child1, child2]
    }

    func loadDesign(){
        
        self.settings.style.selectedBarBackgroundColor = UIColor.black
        self.settings.style.buttonBarBackgroundColor = UIColor(red: 80/255, green: 190/255, blue: 190/255, alpha: 1)
        self.settings.style.buttonBarItemBackgroundColor = UIColor(red: 80/255, green: 190/255, blue: 190/255, alpha: 1)
        self.settings.style.selectedBarBackgroundColor = .white
        self.settings.style.buttonBarItemFont = .boldSystemFont(ofSize: 13)
        self.settings.style.selectedBarHeight = 2.0
        self.settings.style.buttonBarMinimumLineSpacing = 0
        self.settings.style.buttonBarItemTitleColor = .white
        self.settings.style.buttonBarItemsShouldFillAvailableWidth = true
        self.settings.style.buttonBarLeftContentInset = 10
        self.settings.style.buttonBarRightContentInset = 10
        
        changeCurrentIndexProgressive = {(oldCell: ButtonBarViewCell?, newCell : ButtonBarViewCell?, progressPercentage: CGFloat, changeCurrentIndex : Bool, animate : Bool) -> Void in
            
            guard changeCurrentIndex == true else {return}
            oldCell?.label.textColor = UIColor.white
            newCell?.label.textColor = UIColor.white
            
        }
    }
    
    override func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAtIndexPath indexPath: IndexPath) -> CGSize {
        return CGSize(width: collectionView.frame.width/2, height: collectionView.frame.height)
    }
}
