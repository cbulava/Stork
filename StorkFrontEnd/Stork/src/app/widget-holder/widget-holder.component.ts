import { Component, Input, Type, Directive , OnInit, ViewChildren, QueryList, ComponentFactoryResolver, ViewChild, ViewContainerRef} from '@angular/core';
import { NgGrid, NgGridItem } from 'angular2-grid';
import { HttpRequestService } from '../shared/http-request.service';
import { NgGridConfig, NgGridItemConfig, NgGridItemEvent } from "angular2-grid";
import { WidgetControlService } from '../shared/widget-control.service';
import { WidgetSampleComponent } from '../widget-sample/widget-sample.component';
import { WidgetListDataComponent } from '../widget-listData/widget-listData.component';
import { WidgetShowGraphComponent } from '../widget-showGraph/widget-showGraph.component';

import globals = require('../shared/globals');

// class Widget { 
//     stock_data: any[];
//     widget_id: number;
// }


interface Box {
	id: number;
	config: NgGridItemConfig;
    data: Array<any>;
	name: string;
	type: number;
}

@Directive({
  selector: '[boxid]'
})
class BoxId{
  @Input() h: number;
  constructor(public elementRef: ViewContainerRef) {
  }
}	

@Component({
    moduleId: module.id,
    selector: 'widget-holder',
	entryComponents: [
		WidgetSampleComponent, WidgetListDataComponent, WidgetShowGraphComponent
	],
    templateUrl: 'widget-holder.component.html', 
})

export class WidgetHolderComponent implements OnInit {
	private boxes: Array<Box> = [];
	private gridConfig: NgGridConfig;
	
	//global for which widget
	private widgetNum = 2;
	//0 = widget-sample
	//1 = widget-listData
	//2 = widget-showGraph

	private factoryComponents: Array<any> = [
    	WidgetSampleComponent, WidgetListDataComponent, WidgetShowGraphComponent
	];


	@ViewChildren('boxid', {read: ViewContainerRef}) boxids: QueryList<ViewContainerRef>;
	//@ViewChildren("boxList") private boxList: QueryList<ElementRef
	constructor(private widgetControl: WidgetControlService, private componentfactoryResolver: ComponentFactoryResolver){
	
		//for 0 type in your widget type number from getWidget
		//specify widgetNum
		this.widgetControl.createTestStocks(this.widgetNum);
		//this.widgetControl.createTestStocks(1);

		//this.blist.createComponent(factory);
		this.gridConfig = this.widgetControl.getGridConfig;
		this.boxes = this.widgetControl.getBoxes;

	
	}

	ngOnInit() {
		if(document.location.href.includes("home")){
			for(let i = 0; i < this.widgetControl.getBoxes.length; i++){
				this.widgetControl.getBoxes[i].config.resizable = false;
				this.widgetControl.getBoxes[i].config.draggable = false;  
			}
		}
		if(document.location.href.includes("edit")){
			for(let i = 0; i < this.widgetControl.getBoxes.length; i++){
				this.widgetControl.getBoxes[i].config.resizable = true;
				this.widgetControl.getBoxes[i].config.draggable = true;  
			}
		}
	}	

//add your widgets here. return the Type identified by the import at the top
	getWidget(i: number): any{
		if(i == 0){
			//return WidgetSampleComponent;
			//return WidgetListDataComponent;
		}
		if(i == 1){
			//insert component
			//return WidgetListDataComponent;
		}
		if(i == 2){
			//insert component
			return WidgetShowGraphComponent;
		}
	}

	ngAfterViewInit() {

		//Where all the boxes are filled with their respective components. 
		if(this.widgetNum == 0)
		{
			let factory = this.componentfactoryResolver.resolveComponentFactory(WidgetSampleComponent);
		}
		else if (this.widgetNum == 1)
		{
			let factory = this.componentfactoryResolver.resolveComponentFactory(WidgetListDataComponent);
		}
		else if (this.widgetNum == 2)
		{
			let factory = this.componentfactoryResolver.resolveComponentFactory(WidgetShowGraphComponent);
		}
		let temp: ViewContainerRef[];
	
		temp = this.boxids.toArray();
		for(var i = 0; i < this.boxids.length; i++){
			this.widgetControl.currBoxId = i;
			let factory = this.componentfactoryResolver.resolveComponentFactory(this.getWidget(this.boxes[i].type));
			temp[i].createComponent(factory);
		}
    }

}