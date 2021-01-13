import {Observable, Subject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationStatusService {

    private authenticationStatus = new Subject<boolean>();

    public getAuthenticationStatus(): Observable<boolean> {
        return this.authenticationStatus.asObservable();
    }

    public setAuthenticationStatus(value: boolean): void {
        this.authenticationStatus.next(value);
    }

    public setAuthenticationStatusError(error: any): void {
        this.authenticationStatus.error(error);
    }

    public setAuthenticationStatusComplete(): void {
        this.authenticationStatus.complete();
    }


}
