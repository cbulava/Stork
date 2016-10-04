import { Component, OnInit } from '@angular/core';
import { WidgetBasicComponent } from '../widget-basic/widget-basic.component';
import { HomeComponent } from '../home/home.component';
import { NgGrid, NgGridItem } from 'angular2-grid';
import { HttpRequestService } from '../shared/http-request.service';
import { NgGridConfig, NgGridItemConfig, NgGridItemEvent } from "angular2-grid";
import { WidgetControlService } from '../shared/widget-control.service';


@Component({
    moduleId: module.id,
    selector: 'edit',
    templateUrl: 'edit.component.html'
})
export class EditComponent implements OnInit {

    constructor(private widgetControl: WidgetControlService) { 

        for(let i = 0; i < 4; i++){
            this.widgetControl.getBoxes[i].config.resizable = true;
            this.widgetControl.getBoxes[i].config.draggable = true;  
        }
    }

    ngOnInit() { 

    }

}