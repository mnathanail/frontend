import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {RegisterService} from './service/register.service';
import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';
import {TokenStorageService} from '../shared/service/token-storage.service';
import {MustMatch} from '../shared/forms/validator/custom-validator';
import {ProfileModel} from '../profile/profile-model';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
    registerForm: FormGroup;
    private destroy$ = new Subject<any>();
    submitted = false;

    constructor(private registerService: RegisterService,
                private router: Router,
                private tokenService: TokenStorageService) {
    }

    ngOnInit(): void {
        this.registerForm = new FormGroup({
                name: new FormControl('', Validators.required),
                surname: new FormControl('', Validators.required),
                email: new FormControl('', [Validators.required, Validators.email]),
                password: new FormControl('', Validators.required),
                confirmPassword: new FormControl('', Validators.required)
            },
            {validators: MustMatch('password', 'confirmPassword')}
            );
    }

    onRegister(): void | boolean{
        this.submitted = true;
        console.log(this.registerForm.value);

        if (this.registerForm.valid) {
            delete this.registerForm.value.confirmPassword;
            this.registerService.onRegister(this.registerForm.value)
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                    (data) => {
                        if (data.headers != null && data.body != null && data.ok) {
                            console.log(data);
                            const token = data.headers.get('Authorization');
                            this.tokenService.saveToken(token);
                            this.tokenService.saveUser(data.body as ProfileModel);
                            setTimeout(() => {
                                this.router.navigate([`profile/${data.body.id}`]);
                            }, 500);
                        }
                    }
                );
        }


    }

    get f(): { [p: string]: AbstractControl } { return this.registerForm.controls; }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

}
