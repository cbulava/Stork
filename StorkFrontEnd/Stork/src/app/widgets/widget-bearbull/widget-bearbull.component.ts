
import { NgGrid, NgGridItem } from 'angular2-grid';
import { HttpRequestService } from '../../shared/services/http-request.service';
import { NgGridConfig, NgGridItemConfig, NgGridItemEvent } from "angular2-grid";
import { WidgetControlService } from '../../shared/services/widget-control.service';
import { Component, OnInit} from '@angular/core';
import { AutofillComponent } from '../../shared/components/autofill.component';


interface Box {
	id: number;
	config: NgGridItemConfig;
    data: Array<any>;
	name: string;
    type: number;
}

@Component({
    moduleId: module.id,
    selector: 'bearbull',
    templateUrl: 'widget-bearbull.component.html'
})
export class BearBullComponent implements OnInit {
	private boxes: Array<Box> = [];
    private box: Box;
	private gridConfig: NgGridConfig;
    private boxId: number;
    private basicFields: Array<string> = ["tick"];

    constructor(private widgetControl: WidgetControlService) {
        this.widgetControl.setMinSize(this.boxId, 35, 27);
        this.widgetControl.updateSize(this.boxId, 35, 27);
        this.boxes = this.widgetControl.getBoxes;

        //this is the box you are assigned. This is set in the WidgetHolderComponent when all 
        //the widgets are assigned to their boxes based on a dashboard(future)
        this.boxId = this.widgetControl.currentInitBoxId;

        //do you stock retrieval before getting your box to play with!
        this.widgetControl.getStockData("MSFT", this.boxId, this.basicFields);
       // this.widgetControl.updateSize(this.boxId, undefined, 50);


        //the key values are known only to you so that's on you. You can use the data
        //in the html by using {{ box.data.your_key }}. You can look up pipes to 
        //fetch the data.
     }

    ngOnInit() { 
                //get your box!
        this.box = this.boxes[this.boxId];

        //do your stuff!
        this.box.name = "Your Component Name (w/e)";
    }

}