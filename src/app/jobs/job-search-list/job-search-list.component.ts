import {Component, OnDestroy, OnInit} from '@angular/core';
import {JobService} from '../service/job.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SkillsService} from '../../profile/service/skills/skills.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {JobModel} from '../job-model';
import {Pageable} from '../../shared/models/pageable';
import {TokenStorageService} from '../../shared/service/token-storage.service';
import {ProfileModel} from '../../profile/profile-model';

@Component({
    selector: 'app-job-search-list',
    templateUrl: './job-search-list.component.html',
    styleUrls: ['./job-search-list.component.css']
})
export class JobSearchListComponent implements OnInit, OnDestroy {

    jobModel: JobModel[];
    loaded = false;
    selectedJob: JobModel;
    selectedItem: any;
    page: Pageable;
    collectionSize: number;
    isActive = false;
    hasApplied = false;
    thePageNumber = 1;
    userId: string;
    isRecruiter = false;
    private destroy$ = new Subject<any>();

    constructor(private jobService: JobService,
                private activeRoute: ActivatedRoute,
                private router: Router,
                private skillService: SkillsService,
                private tokenService: TokenStorageService) {
        const user = this.tokenService.getUser() as ProfileModel;
        this.isRecruiter = this.tokenService.isRecruiter();
        this.userId = user.id.toString();
    }

    ngOnInit(): void {
        this.getJobs();
    }

    updatePage(): void {
        this.getJobs();
    }

    getJobs(): void {
        this.activeRoute.queryParams
            .subscribe(params => {
                this.jobService.getJobsForCandidateDependingOnSkillArray(params.keywords, this.thePageNumber.toString())
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(
                        (val) => {
                            this.jobModel = val.content;
                            this.loaded = true;
                            this.selectedJob = val.content[0];
                            this.selectedItem = val.content[0];
                            this.page = val.pageable;
                            this.collectionSize = val.totalElements;
                        },
                        error => {
                            console.log(error);
                        },
                        () => {}
                    );
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

    selected(job: JobModel): JobModel {
        this.selectedJob = job;
        this.isActive = true;
        this.selectedItem = job;
        this.jobService.checkIfAlreadyAppliedForJob(this.userId, job.jobId)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (value) => {
                    this.hasApplied = value;
                }
            );
        return this.selectedJob;
    }

    applyForJob(jobId: string): void {
        this.jobService.postCandidateApplyForJob(this.userId, jobId)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (value) => {
                    console.log(value);
                    console.log('Congratulations! You just applied for this job! Step closer!');
                },
                error => {
                    console.log('error');
                },
                () => {}
            );
    }

    deleteJobAppy(jobId: string): void {
        this.jobService.deleteCandidateApplyForJob(this.userId, jobId)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (value) => {
                    if (value) {
                        console.log('Successfully undo');
                    }
                }
            );
    }
}
