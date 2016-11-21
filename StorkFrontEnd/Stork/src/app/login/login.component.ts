import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../shared/services/http-request.service';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
    private httpData: Array<any>;
    private user_id: number;
    private error_message: string;
    constructor(private httpReq: HttpRequestService, private router: Router) { }

    ngOnInit() {
        
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