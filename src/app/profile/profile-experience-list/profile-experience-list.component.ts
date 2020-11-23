import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ExperienceService} from '../service/experience/experience.service';
import {ExperienceModel} from './experience-model';
import {ExperienceMessagesService} from '../service/experience/experience-messages.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-profile-experience-list',
    templateUrl: './profile-experience-list.component.html',
    styleUrls: ['./profile-experience-list.component.css']
})
export class ProfileExperienceListComponent implements OnInit, OnDestroy {

    jobs: ExperienceModel[];
    private fetchSubscription = new Subscription();

    constructor(private router: Router,
                private route: ActivatedRoute,
                private experienceService: ExperienceService,
                private experienceMessages: ExperienceMessagesService) {
    }

    ngOnInit(): void {
        this.fetchSubscription = this.experienceService.fetchExperienceList().subscribe(
            (value) => {
                this.jobs = value;
            }
        );

        this.experienceMessages.getExperienceChanged().subscribe(
            (value) => {
                if (this.jobs) {
                    const index = this.jobs.findIndex(job => job.experienceId === value.experienceId);
                    if (index !== -1) {
                        this.jobs.splice(index, 1, value);
                    }
                }
            }
        );
    }

    onAddExperience(): void {
        this.router.navigate(['new/new-experience-profile'], {relativeTo: this.route});
    }

    ngOnDestroy(): void {
        this.fetchSubscription.unsubscribe();
        this.experienceMessages.setExperienceChangedComplete();
    }
}
