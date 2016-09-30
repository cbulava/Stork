﻿import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../shared/http-request.service';
@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

    constructor(private httpReq: HttpRequestService) { }

    ngOnInit() {
        
    }
    login(email: string, password: string) {
        this.httpReq.login(email, password, password).subscribe();
    }

}