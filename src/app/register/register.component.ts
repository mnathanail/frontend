import {Component, OnInit} from '@angular/core';
import {FormControl, FormControlName, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;

    constructor() {
    }

    ngOnInit(): void {
        this.registerForm = new FormGroup({
            'name': new FormControl('', Validators.required),
           'surname': new FormControl('', Validators.required),
           'email': new FormControl('', [Validators.required, Validators.email]),
           'password': new FormControl('', Validators.required),
           'confirmPassword': new FormControl('', Validators.required)
        });
    }

    onRegister(): void {
       // this.registerForm.removeControl('confirmPassword');
        console.log(this.registerForm);
    }
}
