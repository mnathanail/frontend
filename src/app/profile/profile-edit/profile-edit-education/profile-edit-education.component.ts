import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup} from '@angular/forms';
import {filter, map} from 'rxjs/operators';
import {ProfileAbstractEdit} from '../profile-abstract-edit';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {LoaderService} from '../../../shared/loader/service/loader.service';
import {ExperienceService} from '../../service/experience/experience.service';
import {ExperienceMessagesService} from '../../service/experience/experience-messages.service';
import {ExperienceImpl} from '../../profile-experience-list/experience-impl';
import {FormsMethods} from '../../../shared/forms/forms-methods';
import {ExperienceModel} from '../../profile-experience-list/experience-model';
import {CrudEventsModel} from '../../../shared/enums/crud-events-model.enum';
import {monthNames} from '../../../shared/months';
import {EducationModel} from '../../profile-education-list/education-model';
import {EducationImpl} from '../../profile-education-list/education-impl';
import {EducationService} from '../../service/education/education.service';
import {EducationMessagesService} from '../../service/education/education-messages.service';

@Component({
    selector: 'app-profile-edit-education',
    templateUrl: './profile-edit-education.component.html',
    styleUrls: ['./profile-edit-education.component.css']
})
export class ProfileEditEducationComponent  extends ProfileAbstractEdit implements OnInit, AfterViewInit, OnDestroy {

    @ ViewChild('content') content: ElementRef;
    years: any[] = [];
    months: any[] = [];
    editState = false;
    editEducationForm: FormGroup;
    toggleChecked = false;
    private title: string;
    private subscription = new Subscription();
    private crudSubscription = new Subscription();
    candidateId: string;

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
    }

    ngAfterViewInit(): void {
        this.openModal(this.content);
    }

    isCurrentChecked(): void {
        this.toggleChecked = !this.toggleChecked;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    onSubmit(): void {
        if (this.editState) {
            const a = FormsMethods.getDirtyValues(this.editEducationForm);
            const educationId = this.editEducationForm.get('educationId').value;
            console.log(a);
            this.educationService.patchEducation(a as EducationModel, this.candidateId, educationId)
                /*.filter(delay(500))*/
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
            title: new FormControl(value?.title),
            degree: new FormControl(value?.degree),
            school: new FormControl(value?.school),
            period: new FormGroup({
                startYear: new FormControl(value?.period?.startYear),
                startMonth: new FormControl(value?.period?.startMonth),
                endYear: new FormControl(value?.period?.endYear),
                endMonth: new FormControl(value?.period?.endMonth)
            }),
            educationId: new FormControl(value.educationId)
        });

    }

    private _populateSelectYears(): any[] {
        const year = new Date().getFullYear();
        const current = year;
        for (let i = 1960; i <= year; i++) {
            this.years.push(i);
        }
        return this.years.reverse();
    }

    private _populateSelectMonths(): any[] {
        for (let i = 0; i < 12; i++) {
            this.months.push({name: monthNames[i], value: i + 1});
        }
        return this.months;
    }

    private fetchSelectedEducation(candidateId: string, educationId: string): void {
        this.educationService.fetchEducation(candidateId, educationId)
            .subscribe(
                (value) => {
                    this.initializeForm(value);
                }
            );
    }


}
