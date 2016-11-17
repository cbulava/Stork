import { Injectable } from '@angular/core';
import { Component, OnInit, Type, ChangeDetectorRef, ViewChildren, QueryList, ComponentFactoryResolver, ViewChild, ViewContainerRef} from '@angular/core';
import { NgGrid, NgGridItem } from 'angular2-grid';
import { HttpRequestService } from '../services/http-request.service';
import { NgGridConfig, NgGridItemConfig, NgGridItemEvent } from "angular2-grid";
import { WidgetHolderComponent } from'../../widget-holder/widget-holder.component';



class Widget { 
    stock_data: any[];
    widget_id: number;
}

interface Box {
	id: number;
	servId: number;
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
		'margins': [5],
		'draggable': true,
		'resizable': true,
		'max_cols': 0,
		'max_rows': 0,
		'visible_cols': 0,
		'visible_rows': 0,
		'min_cols': 1,
		'min_rows': 1,
		'col_width': 1,
		'row_height': 1,
		'cascade': 'up',
		'min_width': 10,
		'min_height': 10,
		'fix_to_grid': false,
		'auto_style': true,
		'auto_resize': false,
		'maintain_ratio': false,
		'prefer_new': false,
		'zoom_on_drag': false,
		'limit_to_screen': true
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
		for (var i = 0; i < 4; i++) {
			this.boxes[i] = { id: i + 1, servId: 0, config: this._generateDefaultItemConfig(), data: [] , name: "box", error: "", type: stockId};	
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
		this.boxes.push({ id: conf.payload, servId: 0, config: conf, data: [], name: "" , error: "", type: type});
				
		this.httpReq.addWidget(localStorage["id"], [], type.toString(), 0, 1, 1, 70, 10).subscribe(
 			response => {
                if(response.success){
                    let boxServId = response.payload.results;
					this.boxes[this.boxes.length].servId = boxServId;
            	}
			 });
		return conf.payload;	
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