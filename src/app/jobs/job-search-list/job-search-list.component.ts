import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {JobService} from '../service/job.service';
import {ActivatedRoute, Router} from '@angular/router';
import {JobsComponent} from '../jobs.component';
import {SkillsService} from '../../profile/service/skills/skills.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {JobModel} from '../job-model';
import {Pageable} from '../../shared/models/pageable';

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

    private destroy$ = new Subject<any>();
    isActive = false;
    thePageNumber = 1;

    constructor(private jobService: JobService,
                private activeRoute: ActivatedRoute,
                private router: Router,
                private skillService: SkillsService) {
    }

    ngOnInit(): void {
        this.getJobs();
    }

    updatePage(): void{
        this.getJobs();
    }

    getJobs(): void{
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
                            console.log(val);
                        },
                        error => {
                            console.log(error);
                        },
                        () => {
                            console.log('Completed!');
                        }
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
        return this.selectedJob;
    }

    applyForJob(jobId: string): void {
        const candidateId = '1';
        this.jobService.postCandidateApplyForJob(candidateId, jobId)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (value) => {
                    console.log(value);
                    console.log('Congratulations! You just applied for this job! Step closer!');
                },
                error => {
                    console.log('error');
                },
                () => {
                    console.log('Completed');
                }
            );
    }
}
