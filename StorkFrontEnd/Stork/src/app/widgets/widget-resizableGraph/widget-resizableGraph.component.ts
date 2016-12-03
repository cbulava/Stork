
import { NgGrid, NgGridItem } from 'angular2-grid';
import { HttpRequestService } from '../../shared/services/http-request.service';
import { NgGridConfig, NgGridItemConfig, NgGridItemEvent } from "angular2-grid";
import { WidgetControlService } from '../../shared/services/widget-control.service';
import { Component, OnInit, DoCheck} from '@angular/core';
import { Injectable } from '@angular/core';
import { WidgetSampleComponent } from '../widget-sample/widget-sample.component';
import { CompleterService, CompleterData } from 'ng2-completer';
import myGlobals = require('../../widgets/widget-stocktable/globals');

import { ViewChild, ElementRef } from '@angular/core'

interface Box {
	id: number;
	config: NgGridItemConfig;
    data: Array<any>;
	name: string;
    type: number;
    error: string;
}

@Component({
    moduleId: module.id,
    selector: 'widget-resizableGraph',
    templateUrl: 'widget-resizableGraph.component.html'
})
export class ResizableGraphComponent implements OnInit, DoCheck {
	private boxes: Array<Box> = [];
    private box: Box;
	private gridConfig: NgGridConfig;
    private boxId: number;
    private basicFields: Array<string> = ["bid", "daysLow", "daysHigh", "yearsLow", "yearsHigh", "ask", "averageDailyVolume", "daysRange"];
    private showError: boolean = false;
    private httpData: Array<any>;
    private dataService: CompleterData;
    private searchData = myGlobals.stocks;

    
    constructor(private widgetControl: WidgetControlService, 
                private completerService: CompleterService,
                private httpReq: HttpRequestService) {
        this.dataService = completerService.local(this.searchData, 'Symbol,Name', 'Symbol').descriptionField('Name');
        this.boxes = this.widgetControl.getBoxes;

        //this is the box you are assigned. This is set in the WidgetHolderComponent when all 
        //the widgets are assigned to their boxes based on a dashboard(future)
        this.boxId = this.widgetControl.currentInitBoxId;

        //do you stock retrieval before getting your box to play with!
        this.widgetControl.getStockData("AAPL", this.boxId, this.basicFields);
        this.widgetControl.setMinSize(this.boxId, 20, 25);
        this.widgetControl.updateSize(this.boxId, 25, 25);
                //get your box!
        this.box = this.boxes[this.boxId];

        //do your stuff!
        this.box.name = "Resizable Graph Widget";
        //this.getSymbolData("AAPL");
        //the key values are known only to you so that's on you. You can use the data
        //in the html by using {{ box.data.your_key }}. You can look up pipes to 
        //fetch the data.
     }

    ngDoCheck(){
    
    }

    ngOnInit() { 
        
    }
    public timeframe = String;

    timeframes = [
         {value:'1d', display:'1 day'},
         {value:'5d', display:'1 week'},
         {value:'1m', display:'1 month'}, 
         {value:'3m', display:'3 months'},
         {value:'6m', display:'6 months'},
         {value:'1y', display:'1 year'},
         {value:'5y', display:'5 years'},
    ]


    @ViewChild('dataContainer') dataContainer: ElementRef;
//<img src="http://chart.finance.yahoo.com/z?s="+symbol.value+"&t=6m&q=l&l=on&z=s&p=m50,m200"/>
//this.dataContainer.nativeElement.innerHTML = "<img src=\"http://chart.finance.yahoo.com/z?s=APPL&t=6m&q=l&l=on&z=s&p=m50,m200\"/>";
    loadData(symbol: string) {
       
    }

    getSymbolData(symbol: string){
        this.httpReq.getStock(symbol, this.basicFields).subscribe(
            response => {
                if(response.success){
                            this.dataContainer.nativeElement.innerHTML = "<img src=\"http://chart.finance.yahoo.com/z?s="+symbol+"&t="+this.timeframe+"&q=l&l=on&z=s&p=m50,m200\" style=\"width:100%; height:100%\"/>";
                            this.widgetControl.getStockData(symbol, this.boxId, this.basicFields);
                        }else{
                            alert("Look up unsuccessful. Please check your symbol and try again.");
                            //look up failed do stuff here
                        }
            },
            error => {
				this.showError = true;
				this.boxes[this.boxId].error = "Error timeout in Server. Server may be slow, or stock data is updating on Yahoo page.";
			}
        )

            
     }

}