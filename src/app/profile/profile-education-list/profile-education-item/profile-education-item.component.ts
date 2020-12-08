import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-profile-education-item',
    templateUrl: './profile-education-item.component.html',
    styleUrls: ['./profile-education-item.component.css']
})
export class ProfileEducationItemComponent implements OnInit {
    @Input() education;
    @Input() index;

    constructor(private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
    }

    onEditEducation(index: any): void {
        this.router.navigate(['edit/edit-education-profile'], {relativeTo: this.route});
    }
}
