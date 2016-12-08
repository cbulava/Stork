
import { NgGrid, NgGridItem } from 'angular2-grid';
import { HttpRequestService } from '../../shared/services/http-request.service';
import { NgGridConfig, NgGridItemConfig, NgGridItemEvent } from "angular2-grid";
import { WidgetControlService } from '../../shared/services/widget-control.service';
import { Component, OnInit, DoCheck} from '@angular/core';
import { CompleterService, CompleterData } from 'ng2-completer';
import myGlobals = require('../../widgets/widget-stocktable/globals');


interface Box {
	id: number;
	config: NgGridItemConfig;
    data: Array<any>;
	name: string;
    type: number;
    error: string;
    stockList: string[];
}

@Component({
    moduleId: module.id,
    selector: 'risk',
    templateUrl: 'widget-competitor.component.html'
})
export class WidgetCompetitorComponent implements OnInit, DoCheck {
	private boxes: Array<Box> = [];
    private box: Box;
	private gridConfig: NgGridConfig;
    private boxId: number;
    private basicFields: Array<string> = ['symbol', 'name', 'marketCap', 'fiftyTwoWkHigh', 'fiftyTwoWkHighDate', 'fiftyTwoWkLow', 'fiftyTwoWkLowDate'];
    private dataService: CompleterData;
    private searchData = myGlobals.stocks;
    private showError: boolean = false;
    private httpData: Array<any>;
    private loadOnce: boolean = true;
    private searchStr: string;
    constructor(private widgetControl: WidgetControlService,
                private completerService: CompleterService,
                private httpReq: HttpRequestService) {
        
        this.dataService = completerService.local(this.searchData, 'Symbol,Name', 'Symbol').descriptionField('Name');
        this.boxes = this.widgetControl.getBoxes;

        //this is the box you are assigned. This is set in the WidgetHolderComponent when all 
        //the widgets are assigned to their boxes based on a dashboard(future)
        this.boxId = this.widgetControl.currentInitBoxId;

        this.widgetControl.setMinSize(this.boxId, 60, 35);
        this.widgetControl.updateSize(this.boxId, 60, 35);

        //do you stock retrieval before getting your box to play with!
        //this.widgetControl.getStockData("MSFT", this.boxId, this.basicFields);
       // this.widgetControl.updateSize(this.boxId, undefined, 50);


        //the key values are known only to you so that's on you. You can use the data
        //in the html by using {{ box.data.your_key }}. You can look up pipes to 
        //fetch the data.
     }


    ngDoCheck(){
        if(this.loadOnce && this.box.stockList.length > 0){
            this.loadOnce = false;
            this.searchForStock(this.box.stockList[0]);
            this.searchStr = this.box.stockList[0];
        }
    }

    searchForStock(symbol: string){
        this.widgetControl.getCompetitorData(symbol, this.boxId, this.basicFields);
    }

    ngOnInit() { 
        //get your box!
        this.box = this.boxes[this.boxId];

        //do your stuff!
        this.box.name = "Competitor";
    }

}