import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProfileMessagesService} from './service/profile/profile-messages.service';
import {Subject} from 'rxjs';
import {ProfileService} from './service/profile/profile.service';
import {ProfileModel} from './profile-model';
import {ProfileAbstract} from './abstract-profile';
import {takeUntil} from 'rxjs/operators';
import {TokenStorageService} from '../shared/service/token-storage.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends ProfileAbstract implements OnInit, OnDestroy {

    profilePic: string;
    defaultProfileIcon = '/assets/images/generic.jpg';
    coverPic: any = 'https://via.placeholder.com/468x60?text=%20';
    results: ProfileModel;
    destroy$ = new Subject();
    loaded = false;
    candidateId: string;

    constructor(protected router: Router,
                protected route: ActivatedRoute,
                protected tokenService: TokenStorageService,
                private modalService: NgbModal,
                private profileService: ProfileService,
                private profileMessages: ProfileMessagesService,
                private activatedRoute: ActivatedRoute) {
        super(router, route, tokenService);
        this.candidateId = this.getCandidateId();
    }

    ngOnInit(): void {
        this.profileService.fetchProfile(this.candidateId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((value: ProfileModel) => {
                    this.results = value;
                    this.profilePic = value.image;
                    this.loaded = true;
                }
            );

        this.profileMessages.getPhotoChanged()
            .pipe(takeUntil(this.destroy$))
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
        this.router.navigate(['new/new-experience-profile'], {relativeTo: this.route});
    }

    educationAction(): void {
        this.router.navigate(['new/new-education-profile'], {relativeTo: this.route});
    }

    skillsAction(): void {
        this.router.navigate(['add/add-skills-profile'], {relativeTo: this.route});
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }
}
