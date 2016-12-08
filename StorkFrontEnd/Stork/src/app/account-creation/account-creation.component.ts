import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpRequestService } from '../shared/services/http-request.service';
import { Router } from '@angular/router';
import { ReCaptchaComponent } from 'angular2-recaptcha/lib/captcha.component';

@Component({
    moduleId: module.id,
    selector: 'account-creation',
    templateUrl: 'account-creation.component.html'
})

export class AccountCreationComponent implements OnInit {
    private httpData: Array<any>;
    private enableAccountCreation: boolean = false;
    private buttonColor: string = "gray";

    constructor(private httpReq: HttpRequestService, private router: Router) { }
    @ViewChild(ReCaptchaComponent) captcha: ReCaptchaComponent;
    ngOnInit() { 
        this.enableAccountCreation = false;
    }

    handleCorrectCaptcha(event: any){
        this.enableAccountCreation = true;
        this.buttonColor = "black";
    }
    createAccount(email: string, password: string) {
        let token = this.captcha.getResponse();
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