//
// ===== File globals.ts    
//
import { WidgetSampleComponent } from '../widget-sample/widget-sample.component';
'use strict';

export var sep='/';
export var version: string="22.2.2";    

//place your component in this, the component id of a box aligns with
//the order of the component types in factoryComponents.
export var factoryComponents: Array<any> = [
    WidgetSampleComponent
];
