import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthServiceGateway } from '../services/auth-service-gateway';

export class User {
        id:string
        token :string
        name :string
        email :string
        gender :string
        role :string
        isClickWorker:string

    constructor(id:string, token :string, name :string, email :string, gender :string, role :string, isClickWorker:string) {
        this.name = name;
        this.email = email;
        this.id = id;
        this.gender = gender;
        this.role= role;
        this.isClickWorker = isClickWorker;
        this.token = token;
    }
}

@Injectable()
export class AuthService {
    currentUser: User;
    loggedIn: boolean;
    constructor(private _authServiceGateway: AuthServiceGateway) {

    }

    public login(credentials) {
        if (credentials.email === null || credentials.password === null) {
            return Observable.throw("Please insert credentials");
        } else {
            return Observable.create(observer => {
                this._authServiceGateway.authenticate(credentials.password, credentials.email).subscribe(
                    data => {
                        this.currentUser = data;  
                        if(this.currentUser.Token != undefined || this.currentUser.Token != ''){
                            access == true;
                        }
                         observer.next(access);
                         observer.complete();
                    },
                    err => {
                        console.log("Oops!");
                    }
                );

                let access = (credentials.password === "pass" && credentials.email === "email");
                // this.currentUser = new User('Simon', 'saimon@devdactic.com');               
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