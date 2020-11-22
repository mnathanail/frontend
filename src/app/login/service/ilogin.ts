import {Observable, Subscription} from 'rxjs';
import {LoginModel} from '../model/login-model';

export interface ILogin {
    onLogin(loginModel: LoginModel): Observable<any>;
}
