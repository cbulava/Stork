
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
    templateUrl: 'widget-risk.component.html'
})
export class RiskComponent implements OnInit, DoCheck {
	private boxes: Array<Box> = [];
    private box: Box;
	private gridConfig: NgGridConfig;
    private boxId: number;
    private basicFields: Array<string> = ['bid', 'ask', 'low', 'high', 'fiftyTwoWkLow', 'fiftyTwoWkHigh', 'avgVolume', 'lastPrice', 'twelveMnthPct'];
    private dataService: CompleterData;
    private searchData = myGlobals.stocks;
    private showError: boolean = false;
    private httpData: Array<any>;
    private searchStr: string;

    constructor(private widgetControl: WidgetControlService,
                private completerService: CompleterService,
                private httpReq: HttpRequestService) {
        
        this.dataService = completerService.local(this.searchData, 'Symbol,Name', 'Symbol').descriptionField('Name');
        this.boxes = this.widgetControl.getBoxes;

        //this is the box you are assigned. This is set in the WidgetHolderComponent when all 
        //the widgets are assigned to their boxes based on a dashboard(future)
        this.boxId = this.widgetControl.currentInitBoxId;

        this.widgetControl.setMinSize(this.boxId, 35, 27);
        this.widgetControl.updateSize(this.boxId, 35, 27);


        //do you stock retrieval before getting your box to play with!
        //this.widgetControl.getStockData("MSFT", this.boxId, this.basicFields);
       // this.widgetControl.updateSize(this.boxId, undefined, 50);


        //the key values are known only to you so that's on you. You can use the data
        //in the html by using {{ box.data.your_key }}. You can look up pipes to 
        //fetch the data.
     }

    risky: String = "Please enter a stock to determine risk.";
    info: String;
    yh: String;
    u1m: String;
    ngrow: String;
    ctb: String;

    risk: number;

    private yearHigh: number;
    private yearLow: number;
    private bid: number;
    private ask: number;
    private lastPrice: number;
    private averageTradingVolume: number;
    private twelveMonthPct: number;
    private stock: string;

    fieldsImported: number = 0;

    searchForStock(stock: string) {
        //do you stock retrieval before getting your box to play with!
        this.stock = stock;
        this.httpReq.getStock(stock, this.basicFields).subscribe(
            response => {
                if(response.success){
                            this.widgetControl.getStockData(stock, this.boxId, this.basicFields);
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

        //setTimeout(this.importFields(), 1000);
     }


    ngDoCheck(){
        if (this.stock !== undefined) {
            this.searchStr = this.stock;
            this.importFields();
        } else {
        }
    }

    tipspopup() {
        var popup = document.getElementById('myPopup');
        popup.classList.toggle('show');
    }

    nyhpopup() {
        var popup = document.getElementById('nyhpopup');
        popup.classList.toggle('show');
    }

    u1mpopup() {
        var popup = document.getElementById('u1mpopup');
        popup.classList.toggle('show');
    }

    ngrowpopup() {
        var popup = document.getElementById('ngrowpopup');
        popup.classList.toggle('show');
    }
    ctbpopup() {
        var popup = document.getElementById('ctbpopup');
        popup.classList.toggle('show');
    }

    importFields(){
        //console.log(this.box.data);


        this.yearHigh = this.box.data["fiftyTwoWkHigh"]; 
        this.yearLow = this.box.data["fiftyTwoWkLow"];
        this.bid = this.box.data["bid"];
        this.ask = this.box.data["ask"];
        this.lastPrice = this.box.data["lastPrice"];
        this.averageTradingVolume = this.box.data["avgVolume"];
        this.twelveMonthPct = this.box.data["twelveMnthPct"];
        this.riskCalculator();
    }

    riskCalculator(){
        var localRisk = 0;
        if (this.nearYearHigh()) {
            localRisk++;
            //console.log("nearyearhigh");
        }
        if (this.under1m()){
            localRisk++;
            //console.log("under1m");
        }
        if (this.notGrowing()) {
            localRisk++;
            //console.log("notgrowing");
        }
        if (this.closertobid()) {
            localRisk++;
            //console.log("closertobid");
        }

        this.risk = localRisk;

        switch(this.risk) {
            case 0:
                this.risky = "This stock seems minimally risky.";
                this.info = "Click on any of the sentences below for explanation.";
                break;
            case 1:
                this.risky = "This stock seems slightly risky.";
                this.info = "Click on any of the sentences below for explanation.";
                break;
            case 2:
                this.risky = "This stock seems moderately risky.";
                this.info = "Click on any of the sentences below for explanation.";
                break;
            case 3:
                this.risky = "This stock seems very risky.";
                this.info = "Click on any of the sentences below for explanation.";
                break;
            case 4:
                this.risky = "This stock seems extremely risky.";
                this.info = "Click on any of the sentences below for explanation.";
                break;
            default:
                this.risky = "Cannot determine this stock's risk level.";
                break;
        }
    }
    
    //the stock is risky if its near its year high
    nearYearHigh() {
        if ((this.yearHigh - this.lastPrice) < ((this.yearHigh - this.yearLow) / 3) ) {
            this.yh = this.stock + " (price: "+this.lastPrice+") is near its year high ("+this.yearHigh+")."
            return true;
        }
        this.yh = this.stock + " (price: "+this.lastPrice+") isn't near its year high ("+this.yearHigh+")."
        return false;
    } 

    //the stock is risky if its under 1 million average trading volume
    under1m() {
        if (this.averageTradingVolume < 1000000) {
            this.u1m = this.stock + " has an average trading volume of "+this.averageTradingVolume+"."
            return true;
        }
        this.u1m = this.stock + " has an average trading volume of "+this.averageTradingVolume+"."
        return false;
    }

    //the stock is risky if it hasn't grown in the past year
    notGrowing() {
        if (this.twelveMonthPct <= 0) {
            this.ngrow = this.stock + " has declined by "+this.twelveMonthPct+"% over the past year."
            return true;
        }
        this.ngrow = this.stock + " has grown by "+this.twelveMonthPct+"% over the past year."
        return false;
    }

    //the stock is risky if it's current price is closer to the bid price than the ask price
    closertobid() {
        if (this.ask == 0 && this.bid == 0) {
            this.ctb = "Cannot determine bid/ask trends."
            return null;
        }
        if ((this.ask - this.lastPrice) < (this.lastPrice - this.bid)) {
            this.ctb = this.stock + " is closer to the bid price ("+this.bid+") than the ask price ("+this.ask+")."
            return true;
        }
        else {
            this.ctb = this.stock + " is closer to the ask price ("+this.ask+") than the bid price ("+this.bid+")."
            return false;
        }
    }

    ngOnInit() { 
                //get your box!
        this.box = this.boxes[this.boxId];
        //do your stuff!
        this.stock = this.box.stockList[0];
        this.box.name = "Risk Calculator";
    }

}