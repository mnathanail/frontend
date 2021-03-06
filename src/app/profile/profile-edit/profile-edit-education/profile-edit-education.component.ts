import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProfileAbstractEdit} from '../profile-abstract-edit';
import {Subject, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {LoaderService} from '../../../shared/loader/service/loader.service';
import {FormsMethods} from '../../../shared/forms/forms-methods';
import {CrudEventsModel} from '../../../shared/enums/crud-events-model.enum';
import {monthNames} from '../../../shared/months';
import {EducationModel} from '../../profile-education-list/education-model';
import {EducationImpl} from '../../profile-education-list/education-impl';
import {EducationService} from '../../service/education/education.service';
import {EducationMessagesService} from '../../service/education/education-messages.service';
import {DateLessThan} from '../../../shared/forms/validator/custom-validator';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-profile-edit-education',
    templateUrl: './profile-edit-education.component.html',
    styleUrls: ['./profile-edit-education.component.css']
})
export class ProfileEditEducationComponent extends ProfileAbstractEdit implements OnInit, AfterViewInit, OnDestroy {

    @ ViewChild('content') content: ElementRef;
    years: any[] = [];
    futureYears: any[] = [];
    months: any[] = [];
    editState = false;
    editEducationForm: FormGroup;
    toggleChecked = false;
    candidateId: string;
    submitted = false;
    private title: string;


    constructor(protected config: NgbModalConfig,
                protected modalService: NgbModal,
                protected router: Router,
                protected route: ActivatedRoute,
                private http: HttpClient,
                private loaderService: LoaderService,
                private educationService: EducationService,
                private educationMessages: EducationMessagesService,
    ) {
        super(config, modalService, router, route);
        this.candidateId = this.getCandidateId();
        this.initializeForm(new EducationImpl());
    }

    ngOnInit(): void {
        this.editState = this.router.url.indexOf('edit') > 0;

        this.title = this.editState === true ? 'Edit Education' : 'Add Education';
        if (this.editState) {
            const educationId = this.getEducationId();
            this.fetchSelectedEducation(this.candidateId, educationId);
        }
        this._populateSelectYears();
        this._populateSelectMonths();
        this._populateFutureSelectYears();
    }

    ngAfterViewInit(): void {
        this.openModal(this.content);
    }

    isCurrentChecked(): void {
        this.toggleChecked = !this.toggleChecked;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

    onSubmit(): void | boolean {
        this.submitted = true;
        console.log(this.editEducationForm.value);
        console.log(this.editEducationForm.valid);
        return false;
        if (this.editState) {
            const a = FormsMethods.getDirtyValues(this.editEducationForm);
            const educationId = this.editEducationForm.get('educationId').value;
            console.log(a);
            this.educationService.patchEducation(a as EducationModel, this.candidateId, educationId)
                /*.filter(delay(500))*/
                .pipe(takeUntil(this.destroy$))
                .subscribe((value) => {
                        console.log(value);
                        this.educationMessages.setEducationChanged({type: CrudEventsModel.UPDATE, data: value});
                    },
                    error => {
                        this.educationMessages.setEducationChangedError(error);
                    },
                    () => {
                        this.delayedModalClose();
                    }
                );
        } else {
            this.educationService.setEducation(this.candidateId, this.editEducationForm.value)
                /*.filter(delay(500))*/
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                    (value) => {
                        console.log(value);
                        this.educationMessages.setEducationChanged({type: CrudEventsModel.POST, data: value});
                    },
                    error => {
                        this.educationMessages.setEducationChangedError(error);
                    },
                    () => {
                        this.delayedModalClose();
                    }
                );
        }
    }

    deleteExperienceItem(experienceId: string): void {
        this.educationService.deleteEducatione(this.candidateId, experienceId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((value) => {
                    if (value === true) {
                        this.educationMessages.setEducationChanged({type: CrudEventsModel.DELETE, data: this.editEducationForm.value});
                    }
                },
                error => {
                    this.educationMessages.setEducationChangedError(error);
                },
                () => {
                    console.log('completed!');
                    this.delayedModalClose();
                });
    }

    private initializeForm(value: EducationModel): void {
        this.editEducationForm = new FormGroup({
            title: new FormControl(value?.title, Validators.required),
            degree: new FormControl(value?.degree, Validators.required),
            school: new FormControl(value?.school, Validators.required),
            period: new FormGroup({
                startYear: new FormControl(value?.period?.startYear),
                startMonth: new FormControl(value?.period?.startMonth),
                endYear: new FormControl(value?.period?.endYear),
                endMonth: new FormControl(value?.period?.endMonth)
            }, {validators: DateLessThan('startYear', 'endYear')}
            ),
            educationId: new FormControl(value.educationId)
        });

    }

    private _populateSelectYears(): any[] {
        const year = new Date().getFullYear();
        const current = year;
        for (let i = 1970; i <= year; i++) {
            this.years.push(i);
        }
        return this.years.reverse();
    }

    private _populateFutureSelectYears(): any[] {
        const year = new Date().getFullYear() + 10;
        const current = year;
        for (let i = 1970; i <= year; i++) {
            this.futureYears.push(i);
        }
        return this.futureYears.reverse();
    }

    private _populateSelectMonths(): any[] {
        for (let i = 0; i < 12; i++) {
            this.months.push({name: monthNames[i], value: i + 1});
        }
        return this.months;
    }

    private fetchSelectedEducation(candidateId: string, educationId: string): void {
        this.educationService.fetchEducation(candidateId, educationId)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (value) => {
                    this.initializeForm(value);
                }
            );
    }

    get f(): { [p: string]: AbstractControl } { return this.editEducationForm.controls; }


}
