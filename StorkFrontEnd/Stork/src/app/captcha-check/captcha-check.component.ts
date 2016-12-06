import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component } from '@angular/core';

 
@Component({
    selector: 'captcha-check',
    template: `<recaptcha (resolved)="resolved($event)" siteKey="6LeCsCYTAAAAAHg1zDajPfozcSWYlyGXoJJ71mmv"></recaptcha>`,
}) export class CaptchaCheckComponent {
    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response ${captchaResponse}:`);
    }
}
 