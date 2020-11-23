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
    private subscriptionExperience: Subscription;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private experienceMessages: ExperienceMessagesService) {
    }

    ngOnInit(): void {
    }

    onEditExperience(index: string): void {
        console.log(index);
        console.log(this.jobItem)
        this.experienceMessages.setExperienceChanged(this.jobItem);
        this.router.navigate(['edit/edit-experience-profile/' + index], {relativeTo: this.route});
    }

    ngOnDestroy(): void {
        //this.experienceMessages.setExperienceChangedComplete();
    }
}
