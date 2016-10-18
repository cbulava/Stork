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
		WidgetSampleComponent
	],
    templateUrl: 'widget-holder.component.html', 
})

export class WidgetHolderComponent implements OnInit {
	private boxes: Array<Box> = [];
	private gridConfig: NgGridConfig;

	@ViewChildren('boxid', {read: ViewContainerRef}) boxids: QueryList<ViewContainerRef>;
	//@ViewChildren("boxList") private boxList: QueryList<ElementRef
	constructor(private widgetControl: WidgetControlService, private componentfactoryResolver: ComponentFactoryResolver){
	

		//this.blist.createComponent(factory);
		this.gridConfig = this.widgetControl.getGridConfig;
		this.boxes = this.widgetControl.getBoxes;

	
	}

	ngOnInit() {
		if(document.location.href.includes("home")){
			for(let i = 0; i < 4; i++){
				this.widgetControl.getBoxes[i].config.resizable = false;
				this.widgetControl.getBoxes[i].config.draggable = false;  
			}
		}
	}	

	ngAfterViewInit() {

		//Where all the boxes are filled with their respective components. 
		//let factory = this.componentfactoryResolver.resolveComponentFactory(WidgetSampleComponent);
		let temp: ViewContainerRef[];
	
		temp = this.boxids.toArray();
		for(var i = 0; i < this.boxids.length; i++){
			let factory = this.componentfactoryResolver.resolveComponentFactory(globals.factoryComponents[this.boxes[i].type](i));
			this.widgetControl.currBoxId = i;
			temp[i].createComponent(factory);
		}
		//this.blist.createComponent(factory);
    }

}