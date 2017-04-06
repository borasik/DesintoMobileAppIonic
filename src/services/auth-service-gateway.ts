import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { Configuration } from "../configurations";

export class LogInModel {
  password: string;
  email: string;
 
  constructor(password: string, email: string) {
    this.password = name;
    this.email = email;
  }
}


@Injectable()
export class AuthServiceGateway {
    constructor(private _http: Http, private _configuration: Configuration) {
    }

    public authenticate = (email, password): Observable<any> => {
        return this._http.post(this._configuration.ServerWithApiUrl, new LogInModel(password, email)) 
            .map(data => data.json());
    };
}