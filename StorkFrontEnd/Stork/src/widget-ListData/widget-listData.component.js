"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var widget_control_service_1 = require('../app/shared/widget-control.service');
var core_1 = require('@angular/core');
var WidgetListDataComponent = (function () {
    function WidgetListDataComponent(widgetControl) {
        this.widgetControl = widgetControl;
        this.boxes = [];
        this.basicFields = ["Bid", "DaysLow", "DaysHigh", "YearsLow", "YearsHigh", "Ask", "AverageDailyVolume", "DaysRange"];
        this.boxes = this.widgetControl.getBoxes;
        //this is the box you are assigned. This is set in the WidgetHolderComponent when all 
        //the widgets are assigned to their boxes based on a dashboard(future)
        this.boxId = this.widgetControl.currentInitBoxId;
        //do you stock retrieval before getting your box to play with!
        this.widgetControl.getStockData("MSFT", this.boxId, this.basicFields);
        //get your box!
        this.box = this.boxes[this.boxId];
        //do your stuff!
        this.box.name = "Stock Data List";
        //the key values are known only to you so that's on you. You can use the data
        //in the html by using {{ box.data.your_key }}. You can look up pipes to 
        //fetch the data.
    }
    WidgetListDataComponent.prototype.ngOnInit = function () {
    };
    WidgetListDataComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'widget-listData',
            templateUrl: 'widget-listData.component.html'
        }), 
        __metadata('design:paramtypes', [widget_control_service_1.WidgetControlService])
    ], WidgetListDataComponent);
    return WidgetListDataComponent;
}());
exports.WidgetListDataComponent = WidgetListDataComponent;
//# sourceMappingURL=widget-listData.component.js.map