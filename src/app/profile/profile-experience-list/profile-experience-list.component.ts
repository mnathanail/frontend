import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ExperienceService} from '../service/experience/experience.service';
import {ExperienceModel} from './experience-model';

@Component({
    selector: 'app-profile-experience-list',
    templateUrl: './profile-experience-list.component.html',
    styleUrls: ['./profile-experience-list.component.css']
})
export class ProfileExperienceListComponent implements OnInit {

    jobs: ExperienceModel[];

    constructor(private router: Router,
                private route: ActivatedRoute,
                private experienceService: ExperienceService) {
    }

    ngOnInit(): void {

        this.experienceService.fetchExperienceList().subscribe(
            (value) => {
                this.jobs = value;
            }
        );
        /* this.jobs.push(
             {
                 jobTitle: 'Web Developer', companyName: 'Factset', industry: 'Banking',
                 period: {
                     fromYear: '2015', fromMonth: '', toYear: '', toMonth: ''
                 },
                 isCurrent: true,
                 description: 'This is the perfect Description.'
             },
             {
                 jobTitle: 'Web Designer', companyName: 'Factset', industry: 'Banking',
                 period: {
                     fromYear: '2015', fromMonth: '', toYear: '', toMonth: ''
                 },
                 isCurrent: true,
                 description: 'This is the perfect Description.'
             },
         );*/
    }

    onAddExperience(): void {
        this.router.navigate(['new/new-experience-profile'], {relativeTo: this.route});
    }
}
