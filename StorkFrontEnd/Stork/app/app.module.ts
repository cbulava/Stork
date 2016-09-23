import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';

import { AppComponent }  from './app.component';
import { HomeComponent } from './home/home.component';
import { FeatureComponent } from './feature/feature.component';
import { LoginComponent } from './login/login.component';
import { MenuTopComponent } from './menu-top/menu-top.component';
import { app_routing } from './app.routing';
import { DataService } from './shared/data.service';

import {LocationStrategy, HashLocationStrategy} from '@angular/common';

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, app_routing],
    declarations: [AppComponent, HomeComponent, FeatureComponent, LoginComponent, MenuTopComponent],
    providers: [DataService, {provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }