import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProfileMessagesService} from './service/profile/profile-messages.service';
import {Subscription} from 'rxjs';
import {ProfileService} from './service/profile/profile.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ProfileModel} from './profile-model';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

    profilePic: string;
    coverPic: any = 'https://via.placeholder.com/468x60?text=%20';
    profilePicSubscription: Subscription;
    getProfileSubscription: Subscription;
    results: any;
    loaded = false;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private modalService: NgbModal,
                private profileService: ProfileService,
                private profileMessages: ProfileMessagesService, private domSanitizer: DomSanitizer) {
    }

    ngOnInit(): void {
        this.getProfileSubscription = this.profileService.fetchProfile()
            .subscribe((value: ProfileModel) => {
                    this.results = value;
                    this.profilePic = value.image;
                    this.loaded = true;
                }
            );

        this.profilePicSubscription = this.profileMessages.getPhotoChanged()
            .subscribe(value => {
                    this.profilePic = value.value;
                }
            );
    }

    profilePhotoAction(): void {
        this.router.navigate(['edit/edit-photo-profile'], {relativeTo: this.route});
    }

    introAction(): void {
        this.router.navigate(['edit/edit-intro-profile'], {relativeTo: this.route});
    }

    workExperienceAction(): void {
        this.router.navigate(['edit/edit-experience-profile'], {relativeTo: this.route});
    }

    educationAction(): void {
        this.router.navigate(['edit/edit-education-profile'], {relativeTo: this.route});
    }

    skillsAction(): void {
        this.router.navigate(['edit/edit-skills-profile'], {relativeTo: this.route});
    }

    ngOnDestroy(): void {
        this.getProfileSubscription.unsubscribe();
        this.profilePicSubscription.unsubscribe();
    }
}
