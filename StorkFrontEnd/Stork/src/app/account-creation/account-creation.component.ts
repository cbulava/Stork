import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../shared/services/http-request.service';
import { Router } from '@angular/router';
@Component({
    moduleId: module.id,
    selector: 'account-creation',
    templateUrl: 'account-creation.component.html'
})
export class AccountCreationComponent implements OnInit {
    private httpData: Array<any>;

    constructor(private httpReq: HttpRequestService, private router: Router) { }

    ngOnInit() { 

    }
    createAccount(email: string, password: string) {
        this.httpReq.createAccount(email, password, password).subscribe(       
                    response => {
                        if(response.success){
                            this.router.navigate(['login']);
                        }
                        else{
                            //account creation failed
                            alert("Account creation unsuccesful. Please check your username and password and try again.");
                        }
                    }
                    );

    }
}