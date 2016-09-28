import { Component, OnInit } from '@angular/core';

import { DataService } from '../shared/data.service';

@Component({
    moduleId: module.id,
    selector: 'home',
    styleUrls: ['../../styles.css'],
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
    
    projectName: string;

    constructor(private dataService: DataService) { }

    ngOnInit() { 
        this.projectName = this.dataService.getProjectName();
        //End result: create a service that polls what widgets we have with their respective data. Then create the components
        //Using component facory and insert them into the Dom.
    }

}