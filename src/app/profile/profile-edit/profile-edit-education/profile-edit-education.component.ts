import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup} from '@angular/forms';
import {filter, map} from 'rxjs/operators';

@Component({
    selector: 'app-profile-edit-education',
    templateUrl: './profile-edit-education.component.html',
    styleUrls: ['./profile-edit-education.component.css']
})
export class ProfileEditEducationComponent implements OnInit, AfterViewInit {

    @ ViewChild('content') content: ElementRef;
    editEducationForm: FormGroup;
    years: any[] = [];
    editState = false;
    private title: string;

    constructor(config: NgbModalConfig,
                private modalService: NgbModal,
                private router: Router,
                private route: ActivatedRoute) {
        // config.backdrop = 'static';
        config.centered = true;
        config.scrollable = true;
        config.size = 'lg';
        config.keyboard = true;
    }

    ngOnInit(): void {

        this.editState = this.router.url.indexOf('edit') > 0;

        this.title = this.editState === true ? 'Edit Education' : 'Add Education';

        this._populateSelect();
        this.editEducationForm = new FormGroup({
            title: new FormControl(''),
            degree: new FormControl(''),
            school: new FormControl(''),
            startYear: new FormControl(''),
            endYear: new FormControl(''),
        });
    }

    @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent): void {
        this.onClose();
    }

    onClose(): void {
        this.modalService.dismissAll();
        this.route.parent.params.subscribe((param: Params) => {
            const id = +param.id;
            this.router.navigate([`profile/${param.id}`]);
        });
    }

    ngAfterViewInit(): void {
        this.modalService.open(this.content);
    }

    _populateSelect(): any[] {
        const year = new Date().getFullYear();
        const current = year;
        for (let i = 1960; i <= year; i++) {
            this.years.push(i);
        }
        return this.years.reverse();
    }

}
