import { Component, Input, Type, Directive , OnInit, ViewChildren, QueryList, ComponentFactoryResolver, ViewChild, ViewContainerRef} from '@angular/core';
import { NgGrid, NgGridItem } from 'angular2-grid';
import { HttpRequestService } from '../shared/services/http-request.service';
import { NgGridConfig, NgGridItemConfig, NgGridItemEvent } from "angular2-grid";
import { WidgetControlService } from '../shared/services/widget-control.service';
import { WidgetSampleComponent } from '../widgets/widget-sample/widget-sample.component';
import { StocktableComponent } from '../widgets/widget-stocktable/widget-stocktable.component';
import { WidgetShowGraphComponent } from '../widgets/widget-showGraph/widget-showGraph.component';
import { WidgetListDataComponent } from '../widgets/widget-listData/widget-listData.component';
import { WidgetCommoditiesComponent } from '../widgets/widget-commodities/widget-commodities.component';
import { WidgetCompareGraphsComponent } from '../widgets/widget-compareGraphs/widget-compareGraphs.component';
import { WidgetStockNewsComponent } from '../widgets/widget-stockNews/widget-stockNews.component';
import { RiskComponent } from '../widgets/widget-risk/widget-risk.component';
import { WidgetEmailComponent } from '../widgets/widget-email/widget-email.component';


import globals = require('../shared/globals');

// class Widget { 
//     stock_data: any[];
//     widget_id: number;
// }
interface Widget {
	id: number;
	name: string;
}

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
		WidgetSampleComponent,
		StocktableComponent,
		WidgetShowGraphComponent,
		WidgetListDataComponent, 
		WidgetCommoditiesComponent,
		WidgetCompareGraphsComponent,
		WidgetStockNewsComponent,
		RiskComponent,
		WidgetEmailComponent
	],
    templateUrl: 'widget-holder.component.html', 
})


export class WidgetHolderComponent implements OnInit {
	private boxes: Array<Box> = [];
	private removeCheckBoxes: Array<number> = [];
	private boxComps: Array<ViewContainerRef> = [];
	private gridConfig: NgGridConfig;
	
	private loadBoxCheck: boolean;
	public addBoxCheck: boolean;
	private removeBoxCheck: boolean;
	public numBoxes: number;	
	private removeBoxNum: number;
	private addBoxNum: number;

	private haveWidgets: boolean;
	private isEdit: boolean;	
    private widgetChoiceMap: Array<Widget> = [];
	private factoryComponents: Array<any> = [
    	WidgetSampleComponent
	];


	@ViewChildren('boxid', {read: ViewContainerRef}) boxids: QueryList<ViewContainerRef>;
	//@ViewChildren("boxList") private boxList: QueryList<ElementRef
	constructor(private widgetControl: WidgetControlService, private componentfactoryResolver: ComponentFactoryResolver){
		

		//for 0 type in your widget type number from getWidget
		//this.widgetControl.createTestStocks(5);
		//this.widgetControl.loadUserWidgets();
		//load widgets based on User.Id

		//this.blist.createComponent(factory);
		this.gridConfig = this.widgetControl.getGridConfig;
		this.boxes = this.widgetControl.getBoxes;

		this.numBoxes = this.boxes.length;

		//kinda archaic but I'm lazy right now
		this.widgetChoiceMap.push({id: 0, name: 'Sample Widget'});
		this.widgetChoiceMap.push({id: 1, name: 'Table Widget'});
		this.widgetChoiceMap.push({id: 2, name: 'Graph Widget'});
		this.widgetChoiceMap.push({id: 3, name: 'List Widget'});
		this.widgetChoiceMap.push({id: 4, name: 'Commodities Widget'});
		this.widgetChoiceMap.push({id: 5, name: 'Compare Graphs Widget'});
		this.widgetChoiceMap.push({id: 6, name: 'Stock News Widget'});
		this.widgetChoiceMap.push({id: 7, name: 'Risk Widget'});
		this.widgetChoiceMap.push({id: 8, name: 'Email Widget'});

		//identifiers for adding and removing boxes. Numbers are box types to remove/add
		//checks are bools for if the button has been clicked. 
		this.removeBoxNum = -1;
		this.removeBoxCheck = false;
		this.addBoxNum = -1;
		this.addBoxCheck = false;

		//get all widgets here

		for(var i = 0; i < this.boxes.length; i++){
			this.removeCheckBoxes.push(this.boxes[i].id);
		}

		if(window.document.location.href.includes("edit") == true){
			this.haveWidgets = false;
			this.isEdit = true;
		}else{
			if(this.boxes.length == 0){
				this.haveWidgets = true;
			}
			this.isEdit = false;
		}
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
			return WidgetSampleComponent;
		}
		if(i == 1){
			return StocktableComponent;
		}
		if(i == 2){
			return WidgetShowGraphComponent;
		}
		if(i == 3){
			return WidgetListDataComponent;
		}
		if(i == 4){
			return WidgetCommoditiesComponent;
		}

		if(i == 5){
			return WidgetCompareGraphsComponent;
		}
		if(i == 6){
			return WidgetStockNewsComponent;
		}
		if(i == 7) {
			return RiskComponent;
		}
		if (i == 8){
			return WidgetEmailComponent;
		}
	}

	//Remove selected box
	removeBox(){
	//check if the newBoxNum is not -1. -1 is default and means no box was selected.
		if(this.numBoxes > 0){
			this.widgetControl.removeBox(this.removeBoxNum);
			this.removeBoxCheck = true;
			this.numBoxes = this.numBoxes - 1;
			for(var i = 0; i < this.removeCheckBoxes.length; i++){
				if(this.removeCheckBoxes[i] == this.removeBoxNum){
					this.removeCheckBoxes.splice(i, 1);
				}
			}
		}
	}

	//add a new widget 
	addBox(){
		var id = 0;
		//check if the box number to be added (variable) has been set in the selector.
		//default is -1 (if nothing is selected)
		if(this.addBoxNum == -1){
			return;
		}
		//push the id of the widget to the remove checkboxes
		id = this.widgetControl.addBox(this.addBoxNum);
		this.removeCheckBoxes.push(id);
		//for the ngDoCheck, set addBoxCheck to true so the dom is refreshed. Increase
		//the number of boxes
		this.addBoxCheck = true;
		this.numBoxes = this.numBoxes + 1;
	}

	//Is called repeatedly. Manual object checks are done here. 
	ngDoCheck(){

		//check for adding widgets.
		//if addBoxCheck is set to true (by addBox()) and 
		//widget-control.service added the box container for the widget (so check length)
		//against our new box number length. 
		//Create our component in the now empty box.
		if(this.addBoxCheck && this.numBoxes == this.boxids.length){
			let temp: ViewContainerRef[];
			temp = this.boxids.toArray();
			let i = temp.length - 1;
			this.widgetControl.currBoxId = i;
			let factory = this.componentfactoryResolver.resolveComponentFactory(this.getWidget(this.boxes[i].type));
			temp[i].createComponent(factory);
			this.addBoxCheck = false;
			
		}	
		if(this.loadBoxCheck && this.widgetControl.numServBoxes == this.boxids.length){
			for(let i = 0; i < this.widgetControl.numServBoxes; i++){
				let temp: ViewContainerRef[];
				temp = this.boxids.toArray();
				this.widgetControl.currBoxId = i;
				let factory = this.componentfactoryResolver.resolveComponentFactory(this.getWidget(this.boxes[i].type));
				temp[i].createComponent(factory);
				this.loadBoxCheck = false;
				this.haveWidgets = false;
			}
			this.numBoxes = this.widgetControl.numServBoxes;

		}


	}
	ngAfterViewInit() {

		if(this.widgetControl.doLoadOnce){
			this.widgetControl.loadUserWidgets();
			this.widgetControl.doLoadOnce = false;
			this.loadBoxCheck = true;
			
		}

		//Where all the boxes are filled with their respective components. 
		let factory = this.componentfactoryResolver.resolveComponentFactory(WidgetSampleComponent);
		let temp: ViewContainerRef[];
		if(!this.boxids){
			return;
		}
		this.boxComps = this.boxids.toArray();
		temp = this.boxids.toArray();
		for(var i = 0; i < this.boxids.length; i++){
			this.widgetControl.currBoxId = i;
			let factory = this.componentfactoryResolver.resolveComponentFactory(this.getWidget(this.boxes[i].type));
			temp[i].createComponent(factory);
		}
    }
	

}