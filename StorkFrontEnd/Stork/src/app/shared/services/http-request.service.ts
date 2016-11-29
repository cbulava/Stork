import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class HttpRequestService {
    serverUrl: string = "http://localhost:9000/";
    headers = new Headers({'Content-Type': 'application/json' });
    options = new RequestOptions({ headers: this.headers });
    httpData: Array<any>;


    constructor(private http: Http) { }

  login (email: string, password:string){
    let body = JSON.stringify({ email, password});
    return this.http.post(this.serverUrl.concat("user/login"), body, this.options)
                    .map(this.extractData)
                    .catch(this.handleError);
    

  }

  createAccount (email: string, password:string, passwordConf:string){
    let body = JSON.stringify({ email, password, passwordConf });
    return this.http.post(this.serverUrl.concat("user"), body, this.options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getStock (stock: string, fields: any[]){
      let body = JSON.stringify({ fields });   
      return this.http.post(this.serverUrl.concat("stock/").concat(stock), body, this.options)
                    .map(this.extractData)
                    .timeout(10000, new Error("Server Timeout"))
                    .catch(this.handleError);

  }

  logout(id: number){
  	let body = JSON.stringify({id});
  	return this.http.post(this.serverUrl.concat("user/logout"), body, this.options)
  		.map(this.extractData)
  		.catch(this.handleError);
  }

  updateUser(id : number, oldEmail : string, newEmail : string, oldPassword : string, newPassword : string, newPasswordConf : string){
  	let body = JSON.stringify({oldEmail, newEmail, oldPassword, newPassword, newPasswordConf});
  	return this.http.put(this.serverUrl.concat("user/").concat(id.toString()), body, this.options)
  		.map(this.extractData)
  		.catch(this.handleError);
  }

  deleteUser(id : number){
  	return this.http.delete(this.serverUrl.concat("user/").concat(id.toString()), this.options)
  		.map(this.extractData)
  		.catch(this.handleError);
  }

  getDashboard(id : number){
  	return this.http.get(this.serverUrl.concat("user/").concat(id.toString()).concat("/dashboard"), this.options)
  		.map(this.extractData)
  		.catch(this.handleError);
  }

  addWidget(id : number, stockList: string[], widgetType : string, refresh : number, x : number, y : number, height : number, width : number){
  	let body = JSON.stringify({stockList, widgetType, refresh, x, y, height, width});
  	return this.http.post(this.serverUrl.concat("user/").concat(id.toString()).concat("/dashboard"), body, this.options)
  		.map(this.extractData)
  		.catch(this.handleError);
  }

  addMail(id : number, stock : string) {
    let body = JSON.stringify({stock});
    return this.http.post(this.serverUrl.concat("user/").concat(id.toString()).concat("/mail"), body, this.options)
          .map(this.extractData)
          .catch(this.handleError);
  }

  getMail(id : number){
      return this.http.get(this.serverUrl.concat("user/").concat(id.toString()).concat("/mail"), this.options)
          .map(this.extractData)
          .catch(this.handleError);
  }

  removeMail(id : number, stock : string){
      return this.http.delete(this.serverUrl.concat("user/").concat(id.toString()).concat("/mail/").concat(stock), this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getWidget(id : number, widgetid : number){
  	return this.http.get(this.serverUrl.concat("user/").concat(id.toString()).concat("/dashboard/").concat(widgetid.toString()), this.options)
  		.map(this.extractData)
  		.catch(this.handleError);
  }

  deleteWidget(id : number, widgetid : number){
  	return this.http.delete(this.serverUrl.concat("user/").concat(id.toString()).concat("/dashboard/").concat(widgetid.toString()), this.options)
  		.map(this.extractData)
  		.catch(this.handleError);
  }

  updateWidget(id : number, widgetid: number, stockList: string[], widgetType : string, refresh : number, x : number, y : number, height : number, width : number){
  	let body = JSON.stringify({stockList, widgetType, refresh, x, y, height, width});
  	return this.http.put(this.serverUrl.concat("user/").concat(id.toString()).concat("/dashboard/").concat(widgetid.toString()), body, this.options)
  		.map(this.extractData)
  		.catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: any) {
  // In a real world app, we might use a remote logging infrastructure
  // We'd also dig deeper into the error to get a better message
  let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  console.error(errMsg); // log to console instead
  return Observable.throw(errMsg);
}
}