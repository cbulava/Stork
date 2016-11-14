import { Component, OnInit } from '@angular/core';
import { WidgetHolderComponent } from '../widget-holder/widget-holder.component';
import { HomeComponent } from '../home/home.component';
import { NgGrid, NgGridItem } from 'angular2-grid';
import { HttpRequestService } from '../shared/services/http-request.service';
import { NgGridConfig, NgGridItemConfig, NgGridItemEvent } from "angular2-grid";
import { WidgetControlService } from '../shared/services/widget-control.service';



@Component({
    moduleId: module.id,
    selector: 'edit',
    templateUrl: 'edit.component.html'
})
export class EditComponent implements OnInit {

    constructor(private widgetControl: WidgetControlService) { 

        for(let i = 0; i < this.widgetControl.getBoxes.length; i++){
            this.widgetControl.getBoxes[i].config.resizable = true;
            this.widgetControl.getBoxes[i].config.draggable = true;  
        }
    }

    ngOnInit() { 

    }

}