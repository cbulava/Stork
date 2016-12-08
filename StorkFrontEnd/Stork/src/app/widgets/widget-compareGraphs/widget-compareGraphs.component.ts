
import { NgGrid, NgGridItem } from 'angular2-grid';
import { HttpRequestService } from '../../shared/services/http-request.service';
import { NgGridConfig, NgGridItemConfig, NgGridItemEvent } from "angular2-grid";
import { WidgetControlService } from '../../shared/services/widget-control.service';
import { Component, OnInit} from '@angular/core';
import { Injectable } from '@angular/core';
import { WidgetSampleComponent } from '../widget-sample/widget-sample.component';

import { ViewChild, ElementRef } from '@angular/core'


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
    selector: 'widget-compareGraphs',
    templateUrl: 'widget-compareGraphs.component.html'
    
})
export class WidgetCompareGraphsComponent implements OnInit {
	private boxes: Array<Box> = [];
    private box: Box;
    private box2: Box;
	private gridConfig: NgGridConfig;
    private boxId: number;
    private basicFields: Array<string> = ["bid", "daysLow", "daysHigh", "yearsLow", "yearsHigh", "ask", "averageDailyVolume", "daysRange"];
    private showError: boolean = false;
    private httpData: Array<any>;
    private loadOnce: boolean = true;
    private loadSecond: boolean = false;
    
    constructor(private widgetControl: WidgetControlService, private httpReq: HttpRequestService) {
        this.boxes = this.widgetControl.getBoxes;

        //this is the box you are assigned. This is set in the WidgetHolderComponent when all 
        //the widgets are assigned to their boxes based on a dashboard(future)
        this.boxId = this.widgetControl.currentInitBoxId;

        //do you stock retrieval before getting your box to play with!
        this.widgetControl.getStockData("AAPL", this.boxId, this.basicFields);
        this.widgetControl.setMinSize(this.boxId, 35, 27);
        this.widgetControl.updateSize(this.boxId, 35, 27);
                //get your box!
        this.box = this.boxes[this.boxId];
        this.box2 = this.boxes[this.boxId];

        //do your stuff!
        this.box.name = "Stock symbol to look up...";
        //this.box2.name = "Stock symbol to compare with..."
       // this.getSymbolData("AAPL");
        //this.getSymbolData2("AAPL");
        //the key values are known only to you so that's on you. You can use the data
        //in the html by using {{ box.data.your_key }}. You can look up pipes to 
        //fetch the data.
     }

    ngOnInit() { 

        
    }


    @ViewChild('dataContainer') dataContainer: ElementRef;
    @ViewChild('dataContainer2') dataContainer2: ElementRef;
//<img src="http://chart.finance.yahoo.com/z?s="+symbol.value+"&t=6m&q=l&l=on&z=s&p=m50,m200"/>
//this.dataContainer.nativeElement.innerHTML = "<img src=\"http://chart.finance.yahoo.com/z?s=APPL&t=6m&q=l&l=on&z=s&p=m50,m200\"/>";
    //loadData(symbol: string) {
       
    //}


    getSymbolData(symbol: string, valueTP: string, valueMA1: string, valueMA2: string ){
        this.httpReq.getStock(symbol, this.basicFields).subscribe(
            response => {
                if(response.success){
                            //this.box.name = symbol.concat(" Graph");
                            this.widgetControl.updateSize(this.boxId, 35, 28);
                            this.dataContainer.nativeElement.innerHTML = "<img src=\"http://chart.finance.yahoo.com/z?s="+symbol+"&t="+valueTP+"m&q=l&l=on&z=s&p=m"+valueMA1+",m"+valueMA2+"\"/>";
                            this.widgetControl.getStockData(symbol, this.boxId, this.basicFields);
                        }else{
                            alert("Look up unsuccesful. Please check your symbol and time periods and try again.");
                            //look up failed do stuff here
                        }
            },
            error => {
				this.showError = true;
				this.boxes[this.boxId].error = "Error timeout in Server. Server may be slow, or stock data is updating on Yahoo page.";
			}
        )

            
     }
     getSymbolData2(symbol2: string, valueTP2: string, valueMA12: string, valueMA22: string ){
        this.httpReq.getStock(symbol2, this.basicFields).subscribe(
            response => {
                if(response.success){
                            //this.box2.name = symbol2.concat(" Graph");
                            this.widgetControl.updateSize(this.boxId, 35, 28);
                            this.dataContainer2.nativeElement.innerHTML = "<img src=\"http://chart.finance.yahoo.com/z?s="+symbol2+"&t="+valueTP2+"m&q=l&l=on&z=s&p=m"+valueMA12+",m"+valueMA22+"\"/>";
                            this.widgetControl.getStockData(symbol2, this.boxId, this.basicFields);
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