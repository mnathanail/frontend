import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from './service/login.service';
import {Subject, Subscription} from 'rxjs';
import {LoaderService} from '../shared/loader/service/loader.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../shared/service/token-storage.service';
import {delay, take, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
    loginForm: FormGroup;
    submitted = false;
    private destroy$ = new Subject();

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
        this.submitted = true;
        console.log(this.loginForm.valid);

        if (this.loginForm.valid) {
            this.loaderService.showLoader();
            this.loginService.onLogin(this.loginForm.value)
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                    (data) => {
                        if (data.headers != null && data.body != null && data.ok) {

                            const token = data.headers.get('Authorization');
                            this.tokenService.saveToken(token);
                            this.tokenService.saveUser(data.body);
                            setTimeout(() => {
                                this.router.navigate([`profile/${data.body.id}`])
                            }, 500);
                        }
                    },
                    error => {
                        console.log(error);
                    },
                    () => {
                        console.log('Completed!');
                    });
            this.loaderService.hideLoader();
        } else {
            console.log(this.loginForm.status);
        }
    }

    get f(): { [p: string]: AbstractControl } { return this.loginForm.controls; }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }
}
