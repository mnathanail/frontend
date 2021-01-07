import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ExperienceService} from '../service/experience/experience.service';
import {ExperienceModel} from './experience-model';
import {ExperienceMessagesService} from '../service/experience/experience-messages.service';
import {Subject, Subscription} from 'rxjs';
import {CrudEventsModel} from '../../shared/enums/crud-events-model.enum';
import {delay, takeUntil} from 'rxjs/operators';
import {ProfileAbstract} from '../abstract-profile';

@Component({
    selector: 'app-profile-experience-list',
    templateUrl: './profile-experience-list.component.html',
    styleUrls: ['./profile-experience-list.component.css']
})
export class ProfileExperienceListComponent extends ProfileAbstract implements OnInit, OnDestroy {

    jobs: ExperienceModel[];
    private fetchSubscription = new Subscription();
    private experienceMessagesSubscription = new Subscription();
    private destroy$ = new Subject<any>();
    candidateId: string;

    constructor(protected router: Router,
                protected route: ActivatedRoute,
                private experienceService: ExperienceService,
                private experienceMessages: ExperienceMessagesService,
    ) {
        super(router, route);
        this.candidateId = this.getCandidateId();
    }

    ngOnInit(): void {
        this.fetchSubscription = this.experienceService
            .fetchExperienceList(this.candidateId)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
            (value) => {
                this.jobs = value;
            }
        );

        this.experienceMessagesSubscription = this.experienceMessages
            .getExperienceChanged()
            .pipe(
                takeUntil(this.destroy$),
                delay(500)
            )
            .subscribe(
            (value) => {
                switch (value.type) {
                    case CrudEventsModel.POST: {
                        this.jobs.unshift(value.data);
                        break;
                    }
                    case CrudEventsModel.UPDATE: {
                        const index = this.jobs.findIndex(job => job.experienceId === value.data.experienceId);
                        if (index !== -1) {
                            this.jobs.splice(index, 1, value.data);
                        }
                        break;
                    }
                    case CrudEventsModel.DELETE: {
                        if (this.jobs) {
                            const index = this.jobs.findIndex(job => job.experienceId === value.data.experienceId);
                            if (index !== -1) {
                                this.jobs.splice(index, 1);
                            }
                        }
                        break;
                    }
                    case CrudEventsModel.EMPTY: {
                        break;
                    }
                }
            },
            error => {

            },
            () => {

            });
    }

    onAddExperience(): void {
        this.router.navigate(['new/new-experience-profile'], {relativeTo: this.route});
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
        this.fetchSubscription.unsubscribe();
        this.experienceMessages.setExperienceChangedComplete();
        this.experienceMessagesSubscription.unsubscribe();
    }

}
