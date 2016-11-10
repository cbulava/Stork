
import { NgGrid, NgGridItem } from 'angular2-grid';
import { HttpRequestService } from '../shared/http-request.service';
import { NgGridConfig, NgGridItemConfig, NgGridItemEvent } from "angular2-grid";
import { WidgetControlService } from '../shared/widget-control.service';
import { Component, OnInit} from '@angular/core';
import { Injectable } from '@angular/core';
import { WidgetSampleComponent } from '../widget-sample/widget-sample.component';




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
    selector: 'widget-listData',
    templateUrl: 'widget-listData.component.html'
    
})
export class WidgetListDataComponent implements OnInit {
	private boxes: Array<Box> = [];
    private box: Box;
	private gridConfig: NgGridConfig;
    private boxId: number;
    private basicFields: Array<string> = ["Bid", "DaysLow", "DaysHigh", "YearsLow", "YearsHigh", "Ask", "AverageDailyVolume", "DaysRange"];
    private showError: boolean = false;
    private httpData: Array<any>;
    
    constructor(private widgetControl: WidgetControlService, private httpReq: HttpRequestService) {
        this.boxes = this.widgetControl.getBoxes;

        //this is the box you are assigned. This is set in the WidgetHolderComponent when all 
        //the widgets are assigned to their boxes based on a dashboard(future)
        this.boxId = this.widgetControl.currentInitBoxId;
        
        //do you stock retrieval before getting your box to play with!
        this.widgetControl.getStockData("AAPL", this.boxId, this.basicFields);

        //get your box!
        this.box = this.boxes[this.boxId];

        //do your stuff!
        this.box.name = "Stock symbol to look up...";
        



        //the key values are known only to you so that's on you. You can use the data
        //in the html by using {{ box.data.your_key }}. You can look up pipes to 
        //fetch the data.
     }

    ngOnInit() { 
        
    }


    getSymbolData(symbol: string){
        this.httpReq.getStock(symbol, this.basicFields).subscribe(
            response => {
                if(response.success){
                            this.widgetControl.getStockData(symbol, this.boxId, this.basicFields);
                        }else{
                            alert("Look up unsuccesful. Please check your symbol and try again.");
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