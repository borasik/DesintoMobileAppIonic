import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthServiceGateway } from '../services/auth-service-gateway';

export class User {
    Id: string
    Token: string
    Name: string
    Email: string
    Gender: string
    Role: string
    IsClickWorker: string

    constructor(id: string, token: string, name: string, email: string, gender: string, role: string, isClickWorker: string) {
        this.Name = name;
        this.Email = email;
        this.Id = id;
        this.Gender = gender;
        this.Role = role;
        this.IsClickWorker = isClickWorker;
        this.Token = token;
    }
}

@Injectable()
export class AuthService {
    currentUser: User;
    loggedIn: boolean = false;
    constructor(private _authServiceGateway: AuthServiceGateway) {

    }

    public login(credentials) {
        this.loggedIn = false;
        if (credentials.email === null || credentials.password === null) {
            return Observable.throw("Please insert credentials");
        } else {
            return Observable.create(observer => {
                this._authServiceGateway.authenticate(credentials.password, credentials.email).subscribe(
                    data => {
                        this.currentUser = data;
                        if (this.currentUser.Token != undefined && this.currentUser.Token != '' && this.currentUser.Token != null) {
                            localStorage.setItem('currentUser', JSON.stringify({
                                token: this.currentUser.Token,
                                name: this.currentUser.Name,
                                id: this.currentUser.Id,
                                isClickWorker: this.currentUser.IsClickWorker,
                                role: this.currentUser.Role
                            }));
                            this.loggedIn = true;
                        }
                        observer.next(this.loggedIn);
                        observer.complete();
                    },
                    err => {
                          observer.next(this.loggedIn);
                    }
                );

            });
        }
    }

    public register(credentials) {
        if (credentials.email === null || credentials.password === null) {
            return Observable.throw("Please insert credentials");
        } else {
            // At this point store the credentials to your backend!
            return Observable.create(observer => {
                observer.next(true);
                observer.complete();
            });
        }
    }

    public getUserInfo(): User {
        return this.currentUser;
    }

    public logout() {
        return Observable.create(observer => {
            this.currentUser = null;
            observer.next(true);
            observer.complete();
        });
    }
}