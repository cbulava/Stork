import { Component, OnInit } from '@angular/core';

import { DataService } from '../shared/services/data.service';
import { WidgetHolderComponent } from '../widget-holder/widget-holder.component';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
    
    projectName: string;

    constructor(private dataService: DataService, private router: Router) { 
        if(!localStorage["id_token"]){
            router.navigate(["/"]);
        }
    }

    ngOnInit() { 
        this.projectName = this.dataService.getProjectName();
        //End result: create a service that polls what widgets we have with their respective data. Then create the components
        //Using component facory and insert them into the Dom.
    }

}