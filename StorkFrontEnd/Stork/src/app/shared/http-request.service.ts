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