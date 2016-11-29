
import { NgGrid, NgGridItem } from 'angular2-grid';
import { HttpRequestService } from '../../shared/services/http-request.service';
import { NgGridConfig, NgGridItemConfig, NgGridItemEvent } from "angular2-grid";
import { WidgetControlService } from '../../shared/services/widget-control.service';
import { Component, OnInit} from '@angular/core';


interface Box {
	id: number;
	config: NgGridItemConfig;
    data: Array<any>;
	name: string;
    type: number;
}

@Component({
    moduleId: module.id,
    selector: 'widget-email',
    templateUrl: 'widget-email.component.html'
})
export class WidgetEmailComponent implements OnInit {
	private boxes: Array<Box> = [];
    private box: Box;
	private gridConfig: NgGridConfig;
    private boxId: number;
    private basicFields: Array<string> = ['low', 'high', 'fiftyTwoWkLow', 'fiftyTwoWkHigh', 'avgVolume'];

    constructor(private widgetControl: WidgetControlService) {
        this.boxes = this.widgetControl.getBoxes;

        //this is the box you are assigned. This is set in the WidgetHolderComponent when all 
        //the widgets are assigned to their boxes based on a dashboard(future)
        this.boxId = this.widgetControl.currentInitBoxId;
        this.widgetControl.updateSize(this.boxId, 40, 40);
        //do you stock retrieval before getting your box to play with!

        //the key values are known only to you so that's on you. You can use the data
        //in the html by using {{ box.data.your_key }}. You can look up pipes to 
        //fetch the data.
     }

    ngOnInit() { 
        //get your box!
        this.box = this.boxes[this.boxId];


        //do your stuff!
        var userid = localStorage.getItem('id');
        this.box.name = "Email Tracker ";
        this.widgetControl.getEmailData(userid, this.boxId);

    }

    selected(value: string){
       // this.widgetControl.getEmailData(value, this.boxId, this.basicFields);
       // console.log(this.box.data);
    }

    addValue(stock : string){
        var userid = localStorage.getItem('id');
        this.widgetControl.addEmailData(userid, stock , this.boxId);
    }
    removeValue(stock : string){
        var userid = localStorage.getItem('id');
        this.widgetControl.removeEmailData(userid, stock , this.boxId);
    }

}
