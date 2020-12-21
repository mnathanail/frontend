import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {monthNames} from '../../../shared/months';
import {ExperienceMessagesService} from '../../service/experience/experience-messages.service';
import {Subscription} from 'rxjs';
import {ExperienceModel} from '../../profile-experience-list/experience-model';
import {ExperienceImpl} from '../../profile-experience-list/experience-impl';
import {ExperienceService} from '../../service/experience/experience.service';
import {ProfileAbstractEdit} from '../profile-abstract-edit';
import {HttpClient} from '@angular/common/http';
import {LoaderService} from '../../../shared/loader/service/loader.service';
import {FormsMethods} from '../../../shared/forms/forms-methods';
import {CrudEventsModel} from '../../../shared/enums/crud-events-model.enum';

@Component({
    selector: 'app-profile-edit-work-experience',
    templateUrl: './profile-edit-work-experience.component.html',
    styleUrls: ['./profile-edit-work-experience.component.css'],
})
export class ProfileEditWorkExperienceComponent extends ProfileAbstractEdit implements OnInit, AfterViewInit, OnDestroy {

    @ ViewChild('content') content: ElementRef;
    years: any[] = [];
    months: any[] = [];
    editState = false;
    editExperienceForm: FormGroup;
    toggleChecked = false;
    private title: string;
    private subscription = new Subscription();
    private crudSubscription = new Subscription();

    constructor(protected config: NgbModalConfig,
                protected modalService: NgbModal,
                protected router: Router,
                protected route: ActivatedRoute,
                private http: HttpClient,
                private loaderService: LoaderService,
                private experienceService: ExperienceService,
                private experienceMessages: ExperienceMessagesService,
    ) {
        super(config, modalService, router, route);
        this.initializeForm(new ExperienceImpl());
    }

    ngOnInit(): void {
        this.editState = this.router.url.indexOf('edit') > 0;
        const experienceId = this.route.snapshot.params.expId;
        if (this.editState) {
            this.fetchSelectedExperience(experienceId);
        }
        this.title = this.editState === true ? 'Edit Experience' : 'Add Experience';
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
            const a = FormsMethods.getDirtyValues(this.editExperienceForm);
            const experienceId = this.editExperienceForm.get('experienceId').value;
            this.experienceService.patchExperience(a as ExperienceModel, experienceId)
                /*.filter(delay(500))*/
                .subscribe((value) => {
                        this.experienceMessages.setExperienceChanged({type: CrudEventsModel.UPDATE, data: value});
                    },
                    error => {
                        this.experienceMessages.setExperienceChangedError(error);
                    },
                    () => {
                        this.delayedModalClose();
                    }
                );
        } else {
            this.experienceService.setExperience(this.editExperienceForm.value)
                /*.filter(delay(500))*/
                .subscribe(
                    (value) => {
                        this.experienceMessages.setExperienceChanged({type: CrudEventsModel.POST, data: value});
                    },
                    error => {
                        this.experienceMessages.setExperienceChangedError(error);
                    },
                    () => {
                        this.delayedModalClose();
                    }
                );
        }
    }

    deleteExperienceItem(experienceId: string): void {
        this.experienceService.deleteExperience(experienceId)
            .subscribe((value) => {
                    if (value === true) {
                        this.experienceMessages.setExperienceChanged({type: CrudEventsModel.DELETE, data: this.editExperienceForm.value});
                    }
                },
                error => {
                    this.experienceMessages.setExperienceChangedError(error);
                },
                () => {
                    console.log('completed!');
                    this.delayedModalClose();
                });
    }

    private initializeForm(value: ExperienceModel): void {
        this.editExperienceForm = new FormGroup({
            jobTitle: new FormControl(value.jobTitle),
            companyName: new FormControl(value.companyName),
            industry: new FormControl(value.industry),
            description: new FormControl(value.description),
            period: new FormGroup({
                startYear: new FormControl(value.period?.startYear),
                startMonth: new FormControl(value.period?.startMonth),
                endYear: new FormControl(value.period?.endYear),
                endMonth: new FormControl(value.period?.endMonth)
            }),
            isCurrent: new FormControl(value.isCurrent),
            experienceId: new FormControl(value.experienceId)
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

    private fetchSelectedExperience(experienceId: string): void {
        this.experienceService.fetchExperience(experienceId)
            .subscribe(
                (value) => {
                    this.initializeForm(value);
                }
            );
    }
}
