import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgGrid, NgGridItem } from 'angular2-grid';
import { HttpRequestService } from '../shared/http-request.service';
import { NgGridConfig, NgGridItemConfig, NgGridItemEvent } from "angular2-grid";


class Widget { 
    stock_data: any[];
    widget_id: number;
}

interface Box {
	id: number;
	config: NgGridItemConfig;
    data: Array<any>;
	name: string;
}

@Injectable()
export class WidgetControlService {
    private boxes: Array<Box> = [];

    private httpData: Array<any>;
    private curNum: number = 5;
    private rgb: string = "#efefef";
    private curItemCheck: number = 0;
    private itemPositions: Array<any> = [];
	private basicStockData: Array<string> = ["Bid", "DaysLow", "DaysHigh", "YearsLow", "YearsHigh", "Ask", "AverageDailyVolume", "DaysRange"];
	private stockSymbols: Array<string> = ["MSFT", "GOOG", "AMZN", "FB"];
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


    constructor(private httpReq: HttpRequestService) {
        for (var i = 0; i < 4; i++) {
			this.boxes[i] = { id: i + 1, config: this._generateDefaultItemConfig(), data: [] , name: this.stockSymbols[i]};			
		}
		


        this.httpReq.getStock("MSFT", this.basicStockData).subscribe(data => this.boxes[0].data = data.payload.results );
        this.httpReq.getStock("GOOG", this.basicStockData).subscribe(data => this.boxes[1].data = data.payload.results );
		this.httpReq.getStock("AMZN", this.basicStockData).subscribe(data => this.boxes[2].data = data.payload.results );
		this.httpReq.getStock("FB", this.basicStockData).subscribe(data => this.boxes[3].data = data.payload.results );

    }

    ngOnInit() {
        
    }
    ngOnViewInit() {

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

	addBox(): void {
		const conf: NgGridItemConfig = this._generateDefaultItemConfig();
		conf.payload = this.curNum++;
		this.boxes.push({ id: conf.payload, config: conf, data: [], name: "" });
	}
	
	removeBox(): void {
		if (this.boxes[this.curItemCheck]) {
			this.boxes.splice(this.curItemCheck, 1);
		}
	}
	
	updateItem(index: number, event: NgGridItemEvent): void {
		// Do something here
	}
	
	onDrag(index: number, event: NgGridItemEvent): void {
		// Do something here
	}
	
	onResize(index: number, event: NgGridItemEvent): void {
		// Do something here
	}
	
	private _generateDefaultItemConfig(): NgGridItemConfig {
		return {  'col': 1, 'row': 1, 'sizex': 70, 'sizey': 10, 'minCols':30, 'minRows':10, 'resizable':false, 'draggable':false};
	}

    getStockData(stock: string){
        
    }
}