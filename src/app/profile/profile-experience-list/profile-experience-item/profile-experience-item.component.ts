import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ExperienceMessagesService} from '../../service/experience/experience-messages.service';
import {ExperienceModel} from '../experience-model';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-profile-experience-item',
    templateUrl: './profile-experience-item.component.html',
    styleUrls: ['./profile-experience-item.component.css']
})
export class ProfileExperienceItemComponent implements OnInit, OnDestroy {

    @Input() jobItem: ExperienceModel;
    @Input() index: string;
    @Input() experienceId: string;
    private subscriptionExperience: Subscription;

    constructor(private router: Router,
                private route: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
    }

    onEditExperience(experienceId: string): void {
        this.router.navigate(['edit/edit-experience-profile/' + this.experienceId], {relativeTo: this.route});
    }

    ngOnDestroy(): void {
    }
}
