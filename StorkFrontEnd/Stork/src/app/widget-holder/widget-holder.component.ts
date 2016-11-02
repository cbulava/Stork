import { WidgetCommoditiesComponent} from '../widget-commodities/widget-commodities.component';
import { Component, Input, Type, Directive , OnInit, ViewChildren, QueryList, ComponentFactoryResolver, ViewChild, ViewContainerRef} from '@angular/core';
import { NgGrid, NgGridItem } from 'angular2-grid';
import { HttpRequestService } from '../shared/http-request.service';
import { NgGridConfig, NgGridItemConfig, NgGridItemEvent } from "angular2-grid";
import { WidgetControlService } from '../shared/widget-control.service';
import { WidgetSampleComponent } from '../widget-sample/widget-sample.component';


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
		WidgetCommoditiesComponent
	],
    templateUrl: 'widget-holder.component.html', 
})

export class WidgetHolderComponent implements OnInit {
	private boxes: Array<Box> = [];
	private gridConfig: NgGridConfig;

	private factoryComponents: Array<any> = [
    	WidgetCommoditiesComponent
	];


	@ViewChildren('boxid', {read: ViewContainerRef}) boxids: QueryList<ViewContainerRef>;
	//@ViewChildren("boxList") private boxList: QueryList<ElementRef
	constructor(private widgetControl: WidgetControlService, private componentfactoryResolver: ComponentFactoryResolver){
	
		//for 0 type in your widget type number from getWidget
		this.widgetControl.createTestStocks(0);

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
	getWidget(i: number){
		if(i == 0){
			return WidgetCommoditiesComponent;
		}
		if(i == 1){
			//insert component
		}
		if(i == 2){
			//insert component
		}
	}

	ngAfterViewInit() {

		//Where all the boxes are filled with their respective components. 
		let factory = this.componentfactoryResolver.resolveComponentFactory(WidgetCommoditiesComponent);
		let temp: ViewContainerRef[];
	
		temp = this.boxids.toArray();
		for(var i = 0; i < this.boxids.length; i++){
			this.widgetControl.currBoxId = i;
			let factory = this.componentfactoryResolver.resolveComponentFactory(this.getWidget(this.boxes[i].type));
			temp[i].createComponent(factory);
		}
    }

}