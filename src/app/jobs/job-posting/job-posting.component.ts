import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {Observable, of, Subject} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, takeUntil, tap} from 'rxjs/operators';
import {SkillsService} from '../../profile/service/skills/skills.service';
import {JobService} from '../service/job.service';
import {ActivatedRoute, Router} from '@angular/router';
import {JobModel} from '../job-model';

@Component({
    selector: 'app-job-posting',
    templateUrl: './job-posting.component.html',
    styleUrls: ['./job-posting.component.css'],
    providers: [SkillsService]
})
export class JobPostingComponent implements OnInit, OnDestroy {
    jobPosting: FormGroup;
    searching = false;
    searchFailed = false;
    editState = false;
    loaded = false;
    private destroy$ = new Subject<any>();

    constructor(
        private skillService: SkillsService,
        private jobService: JobService,
        private router: Router,
        private activeRoute: ActivatedRoute
    ) {
        this.editState = this.router.url.indexOf('edit') > 0;
    }

    get requiredSkills(): FormArray {
        return this.jobPosting.get('requiredSkills') as FormArray;
    }

    ngOnInit(): void {
        if (this.editState) {
            const jobId = this.activeRoute.snapshot.params.jobId;
            this.jobService.getJobByJobId(jobId)
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                    (value) => {
                        console.log(this.jobPosting);
                        this.loaded = true;
                        this.formInit(value);
                    }
                );
        } else {
            this.loaded = true;
            this.formInit();
        }
    }

    formInit(jobModel?: JobModel): void {
        const requiredSkillsArray = jobModel?.requiredSkills.map(e => this.createSkillsFormGroup(e));
        this.jobPosting = new FormGroup({
            jobTitle: new FormControl(jobModel?.jobTitle || ''),
            description: new FormControl(jobModel?.description || ''),
            skillExcluded: new FormControl(''),
            requiredSkills: new FormArray(requiredSkillsArray || [])
        });
    }

    addRequiredSkills(e): void | boolean {
        const skills = this.jobPosting.get('requiredSkills') as FormArray;

        const exists = skills.value.some(el => el.name === e.item.name);
        if (exists) {
            console.log('Entry already exists');
            this._clearInputModel();
            return false;
        }

        if (e.item.name.trim().length > 0) {
            skills.push(this.createSkillsFormGroup(e));
            this._clearInputModel();
        }
    }

    onSubmit(): void {
        delete this.jobPosting.value.skillExcluded;

        if (this.editState) {
            console.log(this.jobPosting.value);
            const jobId = this.activeRoute.snapshot.params.jobId;
            this.jobService.patchJob(this.jobPosting.value, jobId)
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                    (value) => {
                        setTimeout(() => {
                            this.router.navigate([`jobs/job-view/${value.jobId}`]);
                        }, 500);
                    },
                    error => {
                        console.log(error);
                    },
                    () => {
                        console.log('Completed');
                    }
                );
        } else {
            this.jobService.saveJob(this.jobPosting.value)
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                    (value) => {
                        console.log(value.jobId);
                        setTimeout(() => {
                            this.router.navigate([`jobs/job-view/${value.jobId}`]);
                        }, 500);
                    },
                    error => {
                        console.log(error);
                    },
                    () => {
                        console.log('Completed');
                    }
                );
        }
    }

    onDelete(jobId: string): void {
        this.jobService.deleteJobByJobId(jobId)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (value) => {
                    if (value) {
                        console.log('Deleted!');
                    } else {
                        console.log('Was Not Deleted..');
                    }
                }
            );
    }

    search = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            tap(() => (this.searching = true)),
            switchMap(term =>
                this.skillService.fetchSkills(term).pipe(
                    map((response) => {
                        return response.length > 0 ? response : [{id: null, name: term}];
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

    removeSkill(i: number): void {
        const skills = this.jobPosting.get('requiredSkills') as FormArray;
        skills.removeAt(i);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

    private createSkillsFormGroup(e): FormGroup {
        const value = e;
        return new FormGroup({
            id: new FormControl(value?.id),
            skillNode: new FormGroup({
                entityId: new FormControl(value?.skillNode?.id || null),
                name: new FormControl(value?.skillNode?.name),
            }),
            yearsOfExperience: new FormControl(value?.yearsOfExperience || 1)
        });
    }

    private _clearInputModel(): void {
        setTimeout(() => {
            this.jobPosting.get('skillExcluded').setValue('');
        }, 200);
    }
}
