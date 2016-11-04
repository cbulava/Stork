import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'menu-top',
    templateUrl: 'menu-top.component.html'
})
export class MenuTopComponent implements OnInit {
    private home: string = "black";
    private edit: string = "black";
    private login: string = "black";

    private home_line: string = "2px solid white";
    private edit_line: string = "2px solid white";
    private login_line: string = "2px solid white";
    constructor() {

    }

    ngOnInit() {
        if(document.location.href.includes("home")){
            this.home = "#75b781";
            this.home_line = "2px solid #75b781";
        }else{
            this.home = "black";
            this.home_line = "2px solid white";
        }

        if(document.location.href.includes("edit")){
            this.edit = "#75b781";
            this.edit_line = "2px solid #75b781";
        }else{
            this.edit = "black";
            this.edit_line = "2px solid white";
        }

        if(document.location.href.includes("login")){
            this.login = "#75b781";
            this.login_line = "2px solid #75b781";
        }else{
            this.login = "black";
            this.login_line = "2px solid white";
        }
    }
    ngOnViewInit() {

    }

    changeColorHome(): void{
            this.home = "#75b781";
            this.home_line = "2px solid #75b781";        
            this.login = "black";
            this.login_line = "2px solid white";
            this.edit = "black";
            this.edit_line = "2px solid white";            
    }
    changeColorLogin(): void{
            this.login = "#75b781";
            this.login_line = "2px solid #75b781";
            this.edit = "black";
            this.edit_line = "2px solid white";           
            this.home = "black";
            this.home_line = "2px solid white";  
  }
    changeColorEdit(): void{
            this.edit = "#75b781";
            this.edit_line = "2px solid #75b781";       
            this.login = "black";
            this.login_line = "2px solid white";
            this.home = "black";
            this.home_line = "2px solid white";            
    }

}