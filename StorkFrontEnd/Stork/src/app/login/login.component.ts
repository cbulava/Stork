import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { HttpRequestService } from '../shared/services/http-request.service';
import { Router } from '@angular/router';
import { WidgetControlService } from '../shared/services/widget-control.service';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
    private httpData: Array<any>;
    private user_id: number;
    private error_message: string;
    constructor(private httpReq: HttpRequestService, private router: Router, private widgetControl: WidgetControlService, private cfr: ComponentFactoryResolver) { 
        widgetControl.resetService();
    }

    ngOnInit() {
        if(localStorage.getItem("id")){
            localStorage.removeItem("id");
        }
    }
    
    login(email: string, password: string) {
        this.httpReq.login(email, password).subscribe(       
                    response => {
                        if(response.success){
                            localStorage.setItem('id', response.payload.id);
                            this.router.navigate(["/home"]);
                        }else{
                            alert("Login unsuccesful. Please check your username and password and try again.");
                            //login failed do stuff here
                        }
                    }
            );
    }

    navigateToAC(){
        this.router.navigate(['account-creation']);
    }

}