import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ExperienceModel} from '../profile-experience-list/experience-model';
import {Subject, Subscription} from 'rxjs';
import {ExperienceService} from '../service/experience/experience.service';
import {ExperienceMessagesService} from '../service/experience/experience-messages.service';
import {delay, takeUntil} from 'rxjs/operators';
import {CrudEventsModel} from '../../shared/enums/crud-events-model.enum';
import {EducationModel} from './education-model';
import {EducationService} from '../service/education/education.service';
import {EducationMessagesService} from '../service/education/education-messages.service';

@Component({
  selector: 'app-profile-education-list',
  templateUrl: './profile-education-list.component.html',
  styleUrls: ['./profile-education-list.component.css']
})
export class ProfileEducationListComponent implements OnInit, OnDestroy {

    educations: EducationModel[];
    sectionTitle = 'Education';
    private fetchSubscription = new Subscription();
    private educationMessagesSubscription = new Subscription();
    private destroy$ = new Subject<any>();


    constructor(private router: Router,
                private route: ActivatedRoute,
                private educationService: EducationService,
                private educationMessages: EducationMessagesService,
    ) {
    }

    ngOnInit(): void {
        this.fetchSubscription = this.educationService.fetchEducationList().subscribe(
            (value) => {
                this.educations = value;
            }
        );

        this.educationMessagesSubscription = this.educationMessages
            .getEducationChanged()
            .pipe(
                takeUntil(this.destroy$),
                delay(500)
            )
            .subscribe(
                (value) => {
                    switch (value.type) {
                        case CrudEventsModel.POST: {
                            this.educations.unshift(value.data);
                            break;
                        }
                        case CrudEventsModel.UPDATE: {
                            const index = this.educations.findIndex(job => job.educationId === value.data.educationId);
                            if (index !== -1) {
                                this.educations.splice(index, 1, value.data);
                            }
                            break;
                        }
                        case CrudEventsModel.DELETE: {
                            if (this.educations) {
                                const index = this.educations.findIndex(job => job.educationId === value.data.educationId);
                                if (index !== -1) {
                                    this.educations.splice(index, 1);
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
    onAddEducation(): void {
        this.router.navigate(['new/new-education-profile'], {relativeTo: this.route});
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
        this.fetchSubscription.unsubscribe();
        this.educationMessages.setEducationChangedComplete();
        this.educationMessagesSubscription.unsubscribe();
    }
}
