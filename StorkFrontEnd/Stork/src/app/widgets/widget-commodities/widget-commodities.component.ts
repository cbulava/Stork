
import { NgGrid, NgGridItem } from 'angular2-grid';
import { HttpRequestService } from '../../shared/services/http-request.service';
import { NgGridConfig, NgGridItemConfig, NgGridItemEvent } from "angular2-grid";
import { WidgetControlService } from '../../shared/services/widget-control.service';
import { Component, OnInit} from '@angular/core';


interface Box {
	id: number;
	config: NgGridItemConfig;
    data: Array<any>;
	name: string;
    type: number;
    stockList: string[];
}


@Component({
    moduleId: module.id,
    selector: 'widget-commodities',
    templateUrl: 'widget-commodities.component.html'
})
export class WidgetCommoditiesComponent implements OnInit {
	private boxes: Array<Box> = [];
    private box: Box;
	private gridConfig: NgGridConfig;
    private boxId: number;
    private basicFields: Array<string> = ['low', 'high', 'fiftyTwoWkLow', 'fiftyTwoWkHigh', 'avgVolume'];
    private loadOnce: boolean = true;
    private selectedValue: string = "";
    private values = {
     "GCZ16": "Gold",
     "SIX16": "Silver",
     "HGX16": "Copper",
     "PLX16": "Platinum",
     "PAX16": "Palladium",
     "CLZ16": "Crude Oil", 
     "HOZ16": "Heating Oil",
     "RBZ16": "Gas",
     "NGZ16": "Natural Gas",
     "CBF17": "Crude Oil Brent",
     "ZKZ16": "Ethanol",
     "ZWZ16": "Wheat",
     "ZCZ16": "Corn",
     "ZSX16": "Soybeans",
     "ZMZ16": "Soybean Meal",
     "ZLZ16": "Soybean Oil",
     "ZOZ16": "Oats",
     "ZRX16": "Rough Rice",
     "KEX16": "Red Wheat",
     "MWZ16": "Spring Wheat",
     "RSX16": "Canola",
     "LEX16": "Live Cattle", 
     "GFX16": "Feeder Cattle",
     "HEZ16": "Lean Hogs",
     "DLX16": "Milk",
     "CTZ16": "Cotton #2",
     "OJX16": "Orange Juice",
     "SBH17": "Sugar",
     "KCZ16": "Coffee",
     "CCZ16": "Cocoa",
     "LSX16": "Lumber"
    };
    constructor(private widgetControl: WidgetControlService) {
        this.boxes = this.widgetControl.getBoxes;

        //this is the box you are assigned. This is set in the WidgetHolderComponent when all 
        //the widgets are assigned to their boxes based on a dashboard(future)
        this.boxId = this.widgetControl.currentInitBoxId;
        this.widgetControl.updateSize(this.boxId, 40, 13);
        //do you stock retrieval before getting your box to play with!

        //the key values are known only to you so that's on you. You can use the data
        //in the html by using {{ box.data.your_key }}. You can look up pipes to 
        //fetch the data.
     }

    ngOnInit() { 
        //get your box!
        this.box = this.boxes[this.boxId];


        //do your stuff!
        this.box.name = "Commodities";
        this.selectedValue = this.values[this.box.stockList[0]];
        //this.selected("Gold");
    }

    ngDoCheck() {
        if(this.box.stockList.length > 0 && this.loadOnce){
            this.loadOnce = false;
            //this.selectedValue = this.box.stockList[0];
            this.selected(this.box.stockList[0]);
            this.selectedValue = this.values[this.box.stockList[0]];
        }
    }

    selected(value: string){
        this.widgetControl.getStockData(value, this.boxId, this.basicFields);
        this.selectedValue = this.values[this.box.stockList[0]];
        //console.log(this.box.data);
    }

}
