import {Injectable} from '@angular/core';
import {ProfileModel} from '../../profile/profile-model';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const IS_RECRUITER = 'is_recruiter';

@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {

    constructor() {
    }

    emptyStorage(): void {
        window.sessionStorage.clear();
    }

    public saveToken(token: string): void {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
    }

    public getToken(): string {
        return window.sessionStorage.getItem(TOKEN_KEY);
    }

    public saveUser(user): void {
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    public getUser(): object {
        return JSON.parse(sessionStorage.getItem(USER_KEY));
    }

    public isRecruiter(): boolean {
        const user = this.getUser() as ProfileModel;
        const index = user.authorities.findIndex(value => value.authority === 'RECRUITER');
        return index > -1;
    }
}
