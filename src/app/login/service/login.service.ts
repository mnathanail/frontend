import {Injectable} from '@angular/core';
import {ILogin} from './ilogin';
import {Observable, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Endpoints} from '../../endpoints/endpoints';
import {map} from 'rxjs/operators';
import {LoginModel} from '../model/login-model';

@Injectable({
    providedIn: 'root'
})

export class LoginService implements ILogin {

    constructor(private http: HttpClient) {
    }

    getAllPosts(): Subscription {
        return this.http.get(Endpoints.FAKE_SERVER_POST).subscribe((data) => console.log(data));
    }

    onLogin(loginModel: LoginModel): Observable<any> {
        console.log(Endpoints.LOGIN);
        return this.http.post(Endpoints.LOGIN, loginModel);
    }

}


