import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {monthNames} from '../../../shared/months';
import {ExperienceMessagesService} from '../../service/experience/experience-messages.service';
import {Subscription} from 'rxjs';
import {ExperienceModel} from '../../profile-experience-list/experience-model';
import {ExperienceImpl} from '../../profile-experience-list/experience-impl';
import {ExperienceService} from '../../service/experience/experience.service';
import {ProfileAbstractEdit} from '../profile-abstract-edit';
import {HttpClient} from '@angular/common/http';
import {SkillsService} from '../../service/skills/skills.service';
import {LoaderService} from '../../../shared/loader/service/loader.service';
import {FormsMethods} from '../../../shared/forms/forms-methods';

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
    expId: string;
    private title: string;
    private subscription = new Subscription();

    constructor(protected config: NgbModalConfig,
                protected modalService: NgbModal,
                protected router: Router,
                protected route: ActivatedRoute,
                private http: HttpClient,
                private skillService: SkillsService,
                private loaderService: LoaderService,
                private experienceService: ExperienceService,
                private experienceMessages: ExperienceMessagesService
    ) {
        super(config, modalService, router, route);
        this.initializeForm(new ExperienceImpl());

    }

    ngOnInit(): void {

        this.expId = this.route.snapshot.params.expId;

        this.editState = this.router.url.indexOf('edit') > 0;

        this.title = this.editState === true ? 'Edit Experience' : 'Add Experience';

        if (this.editState) {
            this.subscription = this.experienceMessages.getExperienceChanged().subscribe(
                (value) => {
                    this.initializeForm(value);
                }
            );
        }

        this._populateSelectYears();
        this._populateSelectMonths();
    }

    ngAfterViewInit(): void {
        this.openModal(this.content);
    }

    _populateSelectYears(): any[] {
        const year = new Date().getFullYear();
        const current = year;
        for (let i = 1960; i <= year; i++) {
            this.years.push(i);
        }
        return this.years.reverse();
    }

    _populateSelectMonths(): any[] {
        for (let i = 0; i < 12; i++) {
            this.months.push({name: monthNames[i], value: i + 1});
        }
        return this.months;
    }

    isCurrentChecked(): void {
        this.toggleChecked = !this.toggleChecked;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    onSubmit(): void {
        if (this.editState) {
            console.log(this.editExperienceForm.value);
            const a = FormsMethods.getDirtyValues(this.editExperienceForm);
            console.log(a);

            this.experienceService.patchExperience(a as ExperienceModel, this.expId)
                .subscribe((value) => {
                    console.log(value);
                });
        } else {
            console.log('Add new Experience');
            console.log(this.editExperienceForm.value);
        }
    }



    private initializeForm(value: ExperienceModel): void {
        this.editExperienceForm = new FormGroup({
            jobTitle: new FormControl(value.jobTitle),
            companyName: new FormControl(value.companyName),
            industry: new FormControl(value.industry),
            description: new FormControl(value.description),
            period: new FormGroup({
                startYear: new FormControl(value.period.fromYear),
                startMonth: new FormControl(value.period.fromMonth),
                endYear: new FormControl(value.period.toYear),
                endMonth: new FormControl(value.period.toMonth)
            }),
            isCurrent: new FormControl(value.isCurrent)
        });
    }
}
