import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {RegisterModel} from '../model/register-model';
import {Observable} from 'rxjs';
import {Endpoints} from '../../endpoints/endpoints';
import {ProfileModel} from '../../profile/profile-model';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    constructor(private http: HttpClient) {
    }

    onRegister(registeModel: RegisterModel): Observable<HttpResponse<ProfileModel>> {
        return this.http.post<ProfileModel>(Endpoints.REGISTER, registeModel,
            {observe: 'response'});
    }

}
