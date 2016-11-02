import { NgGrid, NgGridItem } from 'angular2-grid';
import { HttpRequestService } from '../shared/http-request.service';
import { NgGridConfig, NgGridItemConfig, NgGridItemEvent } from "angular2-grid";
import { WidgetControlService } from '../shared/widget-control.service';
import { Component, OnInit} from '@angular/core';
import { CompleterService, CompleterData } from 'ng2-completer';
import myGlobals = require('./globals');


interface Box {
	id: number;
	config: NgGridItemConfig;
    data: Array<any>;
	name: string;
    type: number;
}

@Component({
    moduleId: module.id,
    selector: 'stocktable',
    templateUrl: 'widget-stocktable.component.html'
})
export class StocktableComponent implements OnInit {
	private boxes: Array<Box> = [];
    private box: Box;
	private gridConfig: NgGridConfig;
    private boxId: number;
    private searchStr: string;
    private dataService: CompleterData;
    private searchData = myGlobals.stocks;


    //private basicFields: Array<string> = ["Bid", "DaysLow", "DaysHigh", "YearsLow", "YearsHigh", "Ask", "AverageDailyVolume", "DaysRange"];

    constructor(private widgetControl: WidgetControlService, 
                private completerService: CompleterService) {
        
        this.dataService = completerService.local(this.searchData, 'Symbol,Name', 'Symbol').descriptionField('Name');
        
        this.boxes = this.widgetControl.getBoxes;

        //this is the box you are assigned. This is set in the WidgetHolderComponent when all 
        //the widgets are assigned to their boxes based on a dashboard(future)
        this.boxId = this.widgetControl.currentInitBoxId;

        //do you stock retrieval before getting your box to play with!
        //this.widgetControl.getStockData("MSFT", this.boxId, this.basicFields);


        //the key values are known only to you so that's on you. You can use the data
        //in the html by using {{ box.data.your_key }}. You can look up pipes to 
        //fetch the data.
     }

     options = [
         {name:'Name', checked:true, desc:'Name of stock'},
         {name:'Symbol', checked:true, desc:'Ticker'},
         {name:'Bid', checked:true, desc:'Maximum price buyers are willing to pay for a security'}, 
         {name:'DaysLow', checked:false, desc:'Lowest value of the day'},
         {name:'DaysHigh', checked:false, desc:'Highest value of the day'},
         {name:'YearLow', checked:false, desc:'Lowest value of the year'},
         {name:'YearHigh', checked:false, desc:'Highest value of the year'},
         {name:'Ask', checked:false, desc:'Minimum price sellers are willing to receive for a security'},
         {name:'AverageDailyVolume', checked:false, desc:'The amount of individual securities traded in a day on average'},
         {name:'DaysRange', checked:false, desc:'Lowest and highest prices of the day'},
         ]
    
    get selectedOptions() {
        return this.options
                   .filter(opt => opt.checked)
                   .map(opt => opt.name)
    }

    selectAll() {
        this.options.forEach(name => {
           name.checked = true;
        });
    }

    deselectAll() {
        this.options.forEach(name => {
           name.checked = false;
        });
    }

    searchForStock(stock: string) {
        //do you stock retrieval before getting your box to play with!
        this.widgetControl.getStockData(stock, this.boxId, this.selectedOptions);
    }

    ngOnInit() { 
        //get your box!
        this.box = this.boxes[this.boxId];

        //do your stuff!
        this.box.name = "Stock Table";

        
    }

}