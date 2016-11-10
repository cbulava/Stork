import { Injectable } from '@angular/core';
import { Component, OnInit, Type, ChangeDetectorRef, ViewChildren, QueryList, ComponentFactoryResolver, ViewChild, ViewContainerRef} from '@angular/core';
import { NgGrid, NgGridItem } from 'angular2-grid';
import { HttpRequestService } from '../services/http-request.service';
import { NgGridConfig, NgGridItemConfig, NgGridItemEvent } from "angular2-grid";
<<<<<<< HEAD:StorkFrontEnd/Stork/src/app/shared/services/widget-control.service.ts
import { WidgetHolderComponent } from'../../widget-holder/widget-holder.component';
=======
import { WidgetListDataComponent } from '../widget-listData/widget-listData.component';
import { WidgetShowGraphComponent } from '../widget-showGraph/widget-showGraph.component';
>>>>>>> cc9935114fe6c4c733ee5486caa741cbd5b2f70b:StorkFrontEnd/Stork/src/app/shared/widget-control.service.ts



class Widget { 
    stock_data: any[];
    widget_id: number;
}

interface Box {
	id: number;
	compId: number;
	config: NgGridItemConfig;
    data: Array<any>;
	name: string;
	error: string;
	type: number;
}

@Injectable()
export class WidgetControlService {
	@ViewChildren('boxid', {read: ViewContainerRef}) boxids: QueryList<ViewContainerRef>;

    private boxes: Array<Box> = [];
	private showError: boolean = false;
    private httpData: Array<any>;
    private curNum: number = 0;
    private rgb: string = "#efefef";
    private curItemCheck: number = 0;
    private itemPositions: Array<any> = [];
	private basicStockData: Array<string> = ["Bid", "DaysLow", "DaysHigh", "YearsLow", "YearsHigh", "Ask", "AverageDailyVolume", "DaysRange"];
	private stockSymbols: Array<string> = ["MSFT", "GOOG", "AMZN", "FB"];
	public currBoxId: number = 5;
	private manualResize: boolean = false;
	private gridConfig: NgGridConfig = <NgGridConfig>{
    'margins': [9],            //  The size of the margins of each item. Supports up to four values in the same way as CSS margins. Can be updated using setMargins()
    'draggable': true,          //  Whether the items can be dragged. Can be updated using enableDrag()/disableDrag()
    'resizable': true,          //  Whether the items can be resized. Can be updated using enableResize()/disableResize()
    'max_cols': 0,              //  The maximum number of columns allowed. Set to 0 for infinite. Cannot be used with max_rows
    'max_rows': 0,              //  The maximum number of rows allowed. Set to 0 for infinite. Cannot be used with max_cols
    'visible_cols': 0,          //  The number of columns shown on screen when auto_resize is set to true. Set to 0 to not auto_resize. Will be overriden by max_cols
    'visible_rows': 0,          //  The number of rows shown on screen when auto_resize is set to true. Set to 0 to not auto_resize. Will be overriden by max_rows
    'min_cols': 1,              //  The minimum number of columns allowed. Can be any number greater than or equal to 1.
    'min_rows': 1,              //  The minimum number of rows allowed. Can be any number greater than or equal to 1.
    'col_width': 1,           //  The width of each column
    'row_height': 1,          //  The height of each row
    'cascade': 'up',            //  The direction to cascade grid items ('up', 'right', 'down', 'left')
    'min_width': 10,           //  The minimum width of an item. If greater than col_width, this will update the value of min_cols
    'min_height': 10,          //  The minimum height of an item. If greater than row_height, this will update the value of min_rows
    'fix_to_grid': false,       //  Fix all item movements to the grid
    'auto_style': true,         //  Automatically add required element styles at run-time
    'auto_resize': false,       //  Automatically set col_width/row_height so that max_cols/max_rows fills the screen. Only has effect is max_cols or max_rows is set
    'maintain_ratio': false,    //  Attempts to maintain aspect ratio based on the colWidth/rowHeight values set in the config
    'prefer_new': false,        //  When adding new items, will use that items position ahead of existing items
	'zoom_on_drag': false,
    'limit_to_screen': false,   //  When resizing the screen, with this true and auto_resize false, the grid will re-arrange to fit the screen size. Please note, at present this only works with cascade direction up.
};
		



    constructor(private httpReq: HttpRequestService, private componentfactoryResolver: ComponentFactoryResolver) {
		//manually creating boxes and fill them with compoment type 0 (change type to that of your component number to test for now)
        // for (var i = 0; i < 4; i++) {
		// 	this.boxes[i] = { id: i + 1, compId: 0, config: this._generateDefaultItemConfig(), data: [] , name: "box", error: "", type: 0};	
		// 	//this.getStockData(this.stockSymbols[i], i, this.basicStockData);		
		// }
		//modify box component data here
    }

	createTestStocks(stockId: number){
		for (var i = 0; i < 1; i++) {
			this.boxes.push({ id: i + 1, compId: 0, config: this._generateDefaultItemConfig(), data: [] , name: "box", error: "", type: stockId});	
			//this.getStockData(this.stockSymbols[i], i, this.basicStockData);		
		}
	}



    ngOnInit() {
        
    }
    ngOnViewInit() {

    }

	refreshWidgetHolder() {

	}

	get ratioDisabled(): boolean {
		return (this.gridConfig.max_rows > 0 && this.gridConfig.visible_cols > 0) ||
			(this.gridConfig.max_cols > 0 && this.gridConfig.visible_rows > 0) ||
			(this.gridConfig.visible_cols > 0 && this.gridConfig.visible_rows > 0);
	}
	
	get itemCheck(): number {
		return this.curItemCheck;
	}
	
	set itemCheck(v: number) {
		console.log(v);
		this.curItemCheck = v;
	}
	
	get curItem(): NgGridItemConfig {
		return this.boxes[this.curItemCheck] ? this.boxes[this.curItemCheck].config : {};
	}
	
    get getBoxes(): Box[] {
        return this.boxes;
    }

    get getGridConfig(): NgGridConfig {
        return this.gridConfig;
    }

	addBox(type: number): number {
		const conf: NgGridItemConfig = this._generateDefaultItemConfig();
		conf.payload = this.curNum++;
<<<<<<< HEAD:StorkFrontEnd/Stork/src/app/shared/services/widget-control.service.ts
		this.boxes.push({ id: conf.payload, compId: 1, config: conf, data: [], name: "" , error: "", type: type});
		return conf.payload;
=======
		this.boxes.push({ id: conf.payload, compId: 1, config: conf, data: [], name: "" , error: "", type: 0});
		
>>>>>>> cc9935114fe6c4c733ee5486caa741cbd5b2f70b:StorkFrontEnd/Stork/src/app/shared/widget-control.service.ts
	}
	
	removeBox(id: number): void {
		// if (this.boxes[this.curItemCheck]) {
		// 	this.boxes.splice(this.curItemCheck, 1);
		// }
		
		if(id < 0){
			return;
		}
		for(var i = 0; i < this.boxes.length; i++){
			if(this.boxes[i]["id"] == id){
				this.boxes.splice(i, 1);
			}
		}
		// if(this.boxes[id]){
		// 	this.boxes.splice(id, 1);
		// }
		
	}

	
	updateItem(index: number, event: NgGridItemEvent): void {
		// Do something here
		var i = 3 + 3;
	}
	
	onDrag(index: number, event: NgGridItemEvent): void {
		this.boxes[index].config["col"] = event.col;
		this.boxes[index].config["row"] = event.row;
		// Do something here
	}
	
	onResize(index: number, event: NgGridItemEvent): void {
		this.boxes[index].config["sizex"] = event.sizex;
		this.boxes[index].config["sizey"] = event.sizey;
		// Do something here
	}
	
	setMinSize(index: number, x: number = undefined, y: number = undefined): void{
		if(x != undefined){
			this.boxes[index].config['minCols'] = x;
		}
		if(y != undefined){
			this.boxes[index].config['minRows'] = y;
		}
	}
	
	private _generateDefaultItemConfig(): NgGridItemConfig {
		return {  'col': 1, 'row': 1, 'sizex': 70, 'sizey': 10, 'minCols':30, 'minRows':10, 'resizable':true, 'draggable':true};
	}

	updateSize(index: number, x = 70, y = 10): void{
		//only change if not changed by user
		if(this.boxes[index].config['sizex'] == 70 && this.boxes[index].config['sizey'] == 10){
			this.boxes[index].config['sizex'] = x;
			this.boxes[index].config['sizey'] = y;
		}
	}

	get currentInitBoxId(): number {
		return this.currBoxId;
	}

	//Stock symbol and widget index to save it to
    getStockData(stock: string, boxIndex: number, fields: any[]){
        let httpData: Array<any>;
		this.httpReq.getStock(stock, fields).subscribe(
 			response => {
                if(response.success){
                    this.boxes[boxIndex].data = response.payload.results;
                }else{
					this.showError = true;
					this.boxes[boxIndex].error = response.message;
                    //retrieval failed for some reason
                }
            }, 
			error => {
				this.showError = true;
				this.boxes[boxIndex].error = "Error timeout in Server. Server may be slow, or stock data is updating on Yahoo page.";
			}
		);
    }
}