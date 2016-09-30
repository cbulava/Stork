import { Component } from '@angular/core';
import "./rxjs-operators";

@Component({ 
  selector: 'app-container',
  template: `<router-outlet><menu-top></menu-top></router-outlet>`,
})
export class AppComponent {
  
  constructor() {

  }
  
}