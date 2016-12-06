import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../shared/services/http-request.service';
import { Router } from '@angular/router';
@Component({
    moduleId: module.id,
    selector: 'captcha-check',
    templateUrl: 'captcha-check.component.html'
})
export class CaptchaCheckComponent implements OnInit {
    private httpData: Array<any>;

    constructor(private httpReq: HttpRequestService, private router: Router) { }

    ngOnInit() { 

    }
    
}