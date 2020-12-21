import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {EducationModel} from '../education-model';

@Component({
    selector: 'app-profile-education-item',
    templateUrl: './profile-education-item.component.html',
    styleUrls: ['./profile-education-item.component.css']
})
export class ProfileEducationItemComponent implements OnInit, OnDestroy {
    @Input() educationItem: EducationModel;
    @Input() index: string;
    @Input() educationId: string;
    private subscriptionEducation: Subscription;

    constructor(private router: Router,
                private route: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
    }

    onEditEducation(index: any): void {
        this.router.navigate(['edit/edit-education-profile'], {relativeTo: this.route});
    }

    ngOnDestroy(): void {
    }

}
