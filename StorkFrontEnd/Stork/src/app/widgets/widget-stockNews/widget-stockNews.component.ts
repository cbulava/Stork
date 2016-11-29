
import { NgGrid, NgGridItem } from 'angular2-grid';
import { HttpRequestService } from '../../shared/services/http-request.service';
import { NgGridConfig, NgGridItemConfig, NgGridItemEvent } from "angular2-grid";
import { WidgetControlService } from '../../shared/services/widget-control.service';
import { Component, OnInit, AfterViewInit} from '@angular/core';
import { Injectable } from '@angular/core';
import { WidgetSampleComponent } from '../widget-sample/widget-sample.component';

import { ViewChild, ElementRef } from '@angular/core'


interface Box {
	id: number;
	config: NgGridItemConfig;
    data: Array<any>;
	name: string;
    type: number;
    error: string;
}


@Component({
    moduleId: module.id,
    selector: 'widget-stockNews',
    templateUrl: 'widget-stockNews.component.html'
    
})



export class WidgetStockNewsComponent implements AfterViewInit {
	private boxes: Array<Box> = [];
    private box: Box;
	private gridConfig: NgGridConfig;
    private boxId: number;
    private basicFields: Array<string> = ["bid", "daysLow", "daysHigh", "yearsLow", "yearsHigh", "ask", "averageDailyVolume", "daysRange"];
    private showError: boolean = false;
    private httpData: Array<any>;
    private symbol: string;

    constructor(private widgetControl: WidgetControlService, private httpReq: HttpRequestService) {
        this.boxes = this.widgetControl.getBoxes;

        //this is the box you are assigned. This is set in the WidgetHolderComponent when all 
        //the widgets are assigned to their boxes based on a dashboard(future)
        this.boxId = this.widgetControl.currentInitBoxId;

        //do you stock retrieval before getting your box to play with!
       // this.widgetControl.getStockData("AAPL", this.boxId, this.basicFields);
        this.widgetControl.setMinSize(this.boxId, 35, 27);
        this.widgetControl.updateSize(this.boxId, 35, 27);
                //get your box!
        this.box = this.boxes[this.boxId];

        //do your stuff!
        this.box.name = "Stock symbol to look up...";
        this.getSymbolData("AAPL");
        this.symbol = "aapl";
        //the key values are known only to you so that's on you. You can use the data
        //in the html by using {{ box.data.your_key }}. You can look up pipes to 
        //fetch the data.
     }

    ngOnInit() { 

        
    }


    @ViewChild('dataContainer') dataContainer: ElementRef;
//<img src="http://chart.finance.yahoo.com/z?s="+symbol.value+"&t=6m&q=l&l=on&z=s&p=m50,m200"/>
//this.dataContainer.nativeElement.innerHTML = "<img src=\"http://chart.finance.yahoo.com/z?s=APPL&t=6m&q=l&l=on&z=s&p=m50,m200\"/>";

//http://finance.yahoo.com/rss/headline?s=yhoo

    loadData(symbol: string) {
       
    }

    ngAfterViewInit(){

                            this.dataContainer.nativeElement.innerHTML = "<!-- start sw-rss-feed code --><script type=\"text/javascript\">rssfeed_url = new Array();rssfeed_url[0]=\"http://finance.yahoo.com/rss/headline?s="+this.symbol+"\";rssfeed_frame_width=\"180\";rssfeed_frame_height=\"250\";rssfeed_scroll=\"on\";rssfeed_scroll_step=\"6\";rssfeed_scroll_bar=\"off\";rssfeed_target=\"_blank\";rssfeed_font_size=\"12\";rssfeed_font_face=\"\";rssfeed_border=\"on\";rssfeed_css_url=\"http://feed.surfing-waves.com/css/style2a.css\";rssfeed_title=\"on\";rssfeed_title_name=\"\";rssfeed_title_bgcolor=\"#3366ff\";rssfeed_title_color=\"#fff\";rssfeed_title_bgimage=\"http://\";rssfeed_footer=\"off\";rssfeed_footer_name=\"rss feed\";rssfeed_footer_bgcolor=\"#fff\";rssfeed_footer_color=\"#333\";rssfeed_footer_bgimage=\"http://\";rssfeed_item_title_length=\"50\";rssfeed_item_title_color=\"#666\";rssfeed_item_bgcolor=\"#fff\";rssfeed_item_bgimage=\"http://\";rssfeed_item_border_bottom=\"on\";rssfeed_item_source_icon=\"off\";rssfeed_item_date=\"off\";rssfeed_item_description=\"on\";rssfeed_item_description_length=\"120\";rssfeed_item_description_color=\"#666\";rssfeed_item_description_link_color=\"#333\";rssfeed_item_description_tag=\"off\";rssfeed_no_items=\"0\";rssfeed_cache = \"081991febd34926d2eb462c61335052d\";</script><script type=\"text/javascript\" src=\"http://feed.surfing-waves.com/js/rss-feed.js\"></script><!-- The link below helps keep this service FREE, and helps other people find the SW widget. Please be cool and keep it! Thanks. --><div style=\"text-align:right;width:180px;\"><a href=\"http://www.surfing-waves.com/feed.htm\" target=\"_blank\" style=\"color:#ccc;font-size:10px\">widget @</a> <a href=\"http://www.surfing-waves.com\" target=\"_blank\" style=\"color:#ccc;font-size:10px\">"+this.symbol+"surfing-waves.com</a></div><!-- end sw-rss-feed code -->";
    }

    getSymbolData(symbol: string){
        this.httpReq.getStock(symbol, this.basicFields).subscribe(
            response => {
                if(response.success){
                            this.box.name = symbol.concat(" Graph");
                            this.widgetControl.updateSize(this.boxId, 35, 28);
                            //this.dataContainer.nativeElement.innerHTML = "<img src=\"http://finance.yahoo.com/rss/headline?s="+symbol+"\"/>";
                            this.symbol = symbol;
                            //this.dataContainer.nativeElement.innerHTML = "<a href=\"http://finance.yhoo.com/rss/headline?s="+symbol+"\">Click me</a>";                            
                            //this.dataContainer.nativeElement.innerHTML = "<html xmlns=\"http://finance.yhoo.com/rss/headline?s="+symbol+"\" xml:lang=\"en\" lang=\"en\"><head><title></title></head><body></body></html>";

                            this.widgetControl.getStockData(symbol, this.boxId, this.basicFields);
                        }else{
                            alert("Look up unsuccesful. Please check your symbol and try again.");
                            //look up failed do stuff here
                        }
            },
            error => {
				this.showError = true;
				this.boxes[this.boxId].error = "Error timeout in Server. Server may be slow, or stock data is updating on Yahoo page.";
			}
        )

            
     }

}