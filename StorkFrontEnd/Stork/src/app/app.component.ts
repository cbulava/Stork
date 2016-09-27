import { Component } from '@angular/core';

@Component({ 
  selector: 'app-container',
  template: `<router-outlet><menu-top></menu-top></router-outlet>`,
})
export class AppComponent {
  
  constructor() {

  }
  
}