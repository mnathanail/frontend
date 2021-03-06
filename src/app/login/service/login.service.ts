import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Endpoints} from '../../endpoints/endpoints';
import {LoginModel} from '../model/login-model';

import {ProfileModel} from '../../profile/profile-model';

@Injectable({
    providedIn: 'root'
})

export class LoginService {

    constructor(private http: HttpClient) {
    }

    onLogin(loginModel: LoginModel): Observable<HttpResponse<ProfileModel>> {
        return this.http.post<ProfileModel>(Endpoints.LOGIN, loginModel,
            {observe: 'response'});
    }

}


