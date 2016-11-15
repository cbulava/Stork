import { NgGrid, NgGridItem } from 'angular2-grid';
import { HttpRequestService } from '../../shared/services/http-request.service';
import { NgGridConfig, NgGridItemConfig, NgGridItemEvent } from "angular2-grid";
import { WidgetControlService } from '../../shared/services/widget-control.service';
import { Component, OnInit} from '@angular/core';
import { CompleterService, CompleterData } from 'ng2-completer';
import myGlobals = require('../../widgets/widget-stocktable/globals');

@Component({
    moduleId: module.id,
    selector: 'autofill',
    templateUrl: '../html/autofill.component.html'
})
export class AutofillComponent implements OnInit {
    private dataService: CompleterData;
    private searchData = myGlobals.stocks;

    constructor(private completerService: CompleterService) {
        this.dataService = completerService.local(this.searchData, 'Symbol,Name', 'Symbol').descriptionField('Name');
    }

    ngOnInit() { 

    }

}