import { Component, OnInit } from '@angular/core';
import { NgGrid, NgGridItem } from 'angular2-grid';
import { HttpRequestService } from '../shared/http-request.service';
import { NgGridConfig, NgGridItemConfig, NgGridItemEvent } from "angular2-grid";
import { WidgetControlService } from '../shared/widget-control.service';

// class Widget { 
//     stock_data: any[];
//     widget_id: number;
// }

interface Box {
	id: number;
	config: NgGridItemConfig;
    data: Array<any>;
	name: string;
}

@Component({
    moduleId: module.id,
    selector: 'widget-basic',
    templateUrl: 'widget-basic.component.html'  
})
export class WidgetBasicComponent implements OnInit {
	private boxes: Array<Box> = [];
	private gridConfig: NgGridConfig;
	constructor(private widgetControl: WidgetControlService){
	}

	ngOnInit() {
		if(document.location.href.includes("home")){
			for(let i = 0; i < 4; i++){
				this.widgetControl.getBoxes[i].config.resizable = false;
				this.widgetControl.getBoxes[i].config.draggable = false;  
			}
		}

		this.gridConfig = this.widgetControl.getGridConfig;
		this.boxes = this.widgetControl.getBoxes;1
	}	

}