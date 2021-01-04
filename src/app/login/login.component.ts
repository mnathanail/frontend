import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from './service/login.service';
import {Subscription} from 'rxjs';
import {LoaderService} from '../shared/loader/service/loader.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../shared/service/token-storage.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
    loginForm: FormGroup;
    proceedToApp: Subscription;

    constructor(private loginService: LoginService,
                private loaderService: LoaderService,
                private router: Router,
                private tokenService: TokenStorageService) {

    }

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            username: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required)
        });

    }

    onLogin(): void {
        if (this.loginForm.valid) {
            this.loaderService.showLoader();
            this.proceedToApp = this.loginService.onLogin(this.loginForm.value)
                // .filter(delay(3000))
                .subscribe(
                    (data) => {
                        if (data.headers != null && data.body != null && data.ok) {

                            const token = data.headers.get('Authorization');
                            this.tokenService.saveToken(token);
                            setTimeout(() => {
                                this.router.navigate([`profile/${data.body.id}`]);
                            }, 500);
                        }
                    },
                    error => {
                    },
                    () => {
                        console.log('Completed!');
                    });
            this.loaderService.hideLoader();
        } else {
            console.log(this.loginForm.status);
        }
    }

    ngOnDestroy(): void {
        if (this.proceedToApp) {
            this.proceedToApp.unsubscribe();
        }
    }
}
