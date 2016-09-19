import {Component, OnInit} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/src/common/directives/core_directives";
import {ApiService} from "./api.service";

@Component({
    selector: "numbers",
    templateUrl: "/partial/numbers",
    providers: [ApiService],
    directives: CORE_DIRECTIVES
})
export class ApiComponent implements OnInit {
    apiOccurances: number = 0;
    data: number[];
    isLoading: boolean = false;
    stockjson: any[];
    stockkeys: any[];
    arrayOfKeys;
  
    constructor(private service: ApiService) { }
    
    ngOnInit() {
        this.get();
    }

    get() {
        this.isLoading = true;
        this.service.get(json => {
            if (json) {
                this.stockjson = json.query.results.quote;
                this.isLoading = false;
                this.apiOccurances++;
                this.stockjson = this.generateArray(this.stockjson);
                this.arrayOfKeys = Object.keys(this.stockjson);
            }
        });


    }
    generateArray(obj) {
        var str1;
        var str2;
        return Object.keys(obj).map((key) => {
            str1 = (key.toString()).concat(': ');      
            if (obj[key] == null) {
                return {
                    key: key, 
                    data: " "

                }
            } else {
                return {
                    key: key,
                    data: obj[key]
                }
            }
        });
    }
}