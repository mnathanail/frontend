import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from './service/login.service';
import {Subscription} from 'rxjs';
import {delay} from 'rxjs/operators';
import {LoaderService} from '../shared/loader/service/loader.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
    loginForm: FormGroup;
    proceedToApp: Subscription;

    constructor(private loginService: LoginService, private loaderService: LoaderService) {

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
                // .pipe(delay(3000))
                .subscribe(
                    data => {
                        this.proceedToApp = data;
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
