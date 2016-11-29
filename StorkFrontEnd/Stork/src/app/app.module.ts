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
import { WidgetSampleComponent } from './widgets/widget-sample/widget-sample.component';
import { EditComponent } from './edit/edit.component';
import { StocktableComponent } from './widgets/widget-stocktable/widget-stocktable.component'
import { WidgetListDataComponent } from './widgets/widget-listData/widget-listData.component';
import { WidgetShowGraphComponent } from './widgets/widget-showGraph/widget-showGraph.component';
import { WidgetCommoditiesComponent } from './widgets/widget-commodities/widget-commodities.component';
import { RiskComponent } from './widgets/widget-risk/widget-risk.component';
import { WidgetEmailComponent } from './widgets/widget-email/widget-email.component';

import { app_routing } from './app.routing';

import { DataService } from './shared/services/data.service';
import { HttpRequestService } from './shared/services/http-request.service';
import { WidgetControlService } from './shared/services/widget-control.service';

import {NgGridModule} from "angular2-grid";

import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import { KeysPipe } from './shared/keys.pipe';

import {Ng2CompleterModule } from 'ng2-completer';


@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, app_routing, NgGridModule, Ng2CompleterModule],
    declarations: [AppComponent, HomeComponent, LoginComponent, MenuTopComponent, WidgetHolderComponent, KeysPipe, EditComponent, AccountCreationComponent, WidgetSampleComponent, StocktableComponent, WidgetListDataComponent, WidgetShowGraphComponent, WidgetCommoditiesComponent, RiskComponent, WidgetEmailComponent],
    providers: [DataService, HttpRequestService, WidgetControlService, {provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }