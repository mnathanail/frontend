import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {EducationModel} from '../education-model';
import {ProfileAbstract} from '../../abstract-profile';
import {TokenStorageService} from '../../../shared/service/token-storage.service';

@Component({
    selector: 'app-profile-education-item',
    templateUrl: './profile-education-item.component.html',
    styleUrls: ['./profile-education-item.component.css']
})
export class ProfileEducationItemComponent extends ProfileAbstract implements OnInit, OnDestroy {
    @Input() educationItem: EducationModel;
    @Input() index: string;
    @Input() educationId: string;
    private subscriptionEducation: Subscription;

    constructor(protected router: Router,
                protected route: ActivatedRoute,
                protected tokenService: TokenStorageService
    ) {
        super(router, route, tokenService);
    }

    ngOnInit(): void {
    }

    onEditEducation(index: any): void {
        this.router.navigate(['edit/edit-education-profile/' + this.educationId], {relativeTo: this.route});
    }

    ngOnDestroy(): void {
    }

}
