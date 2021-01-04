import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, of, Subject} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, takeUntil, tap} from 'rxjs/operators';
import {SkillModel} from '../profile/profile-skill-list/profile-skill-item/skill-model';
import {JobService} from './service/job.service';
import {SkillsService} from '../profile/service/skills/skills.service';

@Component({
    selector: 'app-jobs',
    templateUrl: './jobs.component.html',
    styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit, OnDestroy {
    searching = false;
    searchFailed = false;
    skillListLength: number;
    destroy$ = new Subject();

    parameters: { skill: string, yoe: number }[] = [];

    constructor(private router: Router,
                private skillService: SkillsService,
                private jobService: JobService) {
    }

    ngOnInit(): void {
    }

    onEnter(value: any): void {
        const params = value.split(',').map(e => e.trim());
        const options = {queryParams: {keywords: params}};
        this.router.navigate(['jobs/job-search'], options)
            /*.then(
                v => {
                    this.jobService.getJobsForCandidateDependingOnSkillArray(params)
                        .pipe(takeUntil(this.destroy$))
                        .subscribe(
                            (val) => {
                                console.log(val);
                            },
                            error => {
                                console.log(error);
                            },
                            () => {
                                console.log('Completed!');
                            }
                        );
                }
            );*/
    }

    addParameters(skill: string, yoe: number): void {
        this.parameters.push({skill, yoe});
        console.log(this.parameters);
    }

    search = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            tap(() => (this.searching = true)),
            switchMap(term =>
                this.skillService.fetchSkills(term).pipe(
                    map((response: SkillModel[] | []) => {
                        this.skillListLength = response.length;
                        return response.length > 0 ? response : [];
                    }),
                    tap(() => {
                        this.searchFailed = false;
                    }),
                    catchError(() => {
                        this.searchFailed = true;
                        return of([]);
                    })
                )
            ),
            tap(x => {
                this.searching = false;
            })
        );

    formatMatches = (x: { name: string }) => x.name;

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }
}
