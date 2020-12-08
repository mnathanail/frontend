import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ExperienceService} from '../service/experience/experience.service';
import {ExperienceModel} from './experience-model';
import {ExperienceMessagesService} from '../service/experience/experience-messages.service';
import {Subject, Subscription} from 'rxjs';
import {CrudEventsModel} from '../../shared/enums/crud-events-model.enum';
import {delay, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-profile-experience-list',
    templateUrl: './profile-experience-list.component.html',
    styleUrls: ['./profile-experience-list.component.css']
})
export class ProfileExperienceListComponent implements OnInit, OnDestroy {

    jobs: ExperienceModel[];
    private fetchSubscription = new Subscription();
    private experienceMessagesSubscription = new Subscription();
    private destroy$ = new Subject<any>();


    constructor(private router: Router,
                private route: ActivatedRoute,
                private experienceService: ExperienceService,
                private experienceMessages: ExperienceMessagesService,
    ) {
    }

    ngOnInit(): void {
        this.fetchSubscription = this.experienceService.fetchExperienceList().subscribe(
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
