import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-profile-education-list',
  templateUrl: './profile-education-list.component.html',
  styleUrls: ['./profile-education-list.component.css']
})
export class ProfileEducationListComponent implements OnInit {

    education: any[] = [];
    sectionTitle = 'Education';

    constructor(private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.education.push(
            {
                title: 'Advance Software Engineering',
                degree: 'Master Degree',
                school: 'Shefield University',
                dateStart: '18/8/2010',
                dateEnd: '20/5/2012'
            },
            {
                title: 'Advance Software Engineering',
                degree: 'Bachelor Degree',
                school: 'Shefield University',
                dateStart: '18/8/2005',
                dateEnd: '20/5/2010'
            }
        );
    }

    onAddEducation(): void {
        this.router.navigate(['new/new-education-profile'], {relativeTo: this.route});
    }
}
