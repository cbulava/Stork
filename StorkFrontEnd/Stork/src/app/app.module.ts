import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';


import { AppComponent }  from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AccountCreationComponent } from './account-creation/account-creation.component';
import { MenuTopComponent } from './menu-top/menu-top.component';
import { WidgetHolderComponent } from './widget-holder/widget-holder.component';
import { WidgetSampleComponent } from './widget-sample/widget-sample.component';
import { WidgetListDataComponent } from './widget-listData/widget-listData.component';
import { WidgetShowGraphComponent } from './widget-showGraph/widget-showGraph.component';
import { EditComponent } from './edit/edit.component';

import { app_routing } from './app.routing';

import { DataService } from './shared/data.service';
import { HttpRequestService } from './shared/http-request.service';
import { WidgetControlService } from './shared/widget-control.service';

import {NgGridModule} from "angular2-grid";

import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import { KeysPipe } from './shared/keys.pipe';

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, app_routing, NgGridModule],
    declarations: [AppComponent, HomeComponent, LoginComponent, MenuTopComponent, WidgetHolderComponent, KeysPipe, EditComponent, AccountCreationComponent, WidgetSampleComponent, WidgetListDataComponent, WidgetShowGraphComponent],
    providers: [DataService, HttpRequestService, WidgetControlService, {provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }