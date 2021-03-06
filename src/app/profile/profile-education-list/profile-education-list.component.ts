import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ExperienceModel} from '../profile-experience-list/experience-model';
import {Subject, Subscription} from 'rxjs';
import {ExperienceService} from '../service/experience/experience.service';
import {ExperienceMessagesService} from '../service/experience/experience-messages.service';
import {delay, take, takeUntil} from 'rxjs/operators';
import {CrudEventsModel} from '../../shared/enums/crud-events-model.enum';
import {EducationModel} from './education-model';
import {EducationService} from '../service/education/education.service';
import {EducationMessagesService} from '../service/education/education-messages.service';
import {ProfileAbstract} from '../abstract-profile';
import {TokenStorageService} from '../../shared/service/token-storage.service';

@Component({
  selector: 'app-profile-education-list',
  templateUrl: './profile-education-list.component.html',
  styleUrls: ['./profile-education-list.component.css']
})
export class ProfileEducationListComponent extends ProfileAbstract implements OnInit, OnDestroy {

    educations: EducationModel[];
    sectionTitle = 'Education';
    private destroy$ = new Subject<any>();
    candidateId: string;
    isOwner = false;

    constructor(protected router: Router,
                protected route: ActivatedRoute,
                protected tokenService: TokenStorageService,
                private educationService: EducationService,
                private educationMessages: EducationMessagesService,
    ) {
        super(router, route, tokenService);
        this.candidateId = this.getCandidateId();
        this.checkIfIsOwner();
    }

    ngOnInit(): void {
        this.educationService.fetchEducationList(this.candidateId)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
            (value) => {
                this.educations = value;
            }
        );

        this.educationMessages
            .getEducationChanged()
            .pipe(
                takeUntil(this.destroy$),
              //  delay(500)
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
                    console.log(error);
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
    }
}
