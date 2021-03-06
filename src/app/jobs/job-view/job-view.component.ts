import {Component, OnDestroy, OnInit} from '@angular/core';
import {JobService} from '../service/job.service';
import {ActivatedRoute, Router} from '@angular/router';
import {JobModel} from '../job-model';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {TokenStorageService} from '../../shared/service/token-storage.service';
import {ProfileModel} from '../../profile/profile-model';

@Component({
    selector: 'app-job-view',
    templateUrl: './job-view.component.html',
    styleUrls: ['./job-view.component.css']
})
export class JobViewComponent implements OnInit, OnDestroy {

    jobValue: JobModel;
    ownsJob = false;
    user: ProfileModel;
    private destroy$ = new Subject<any>();

    constructor(private activeRoute: ActivatedRoute,
                private router: Router,
                private jobService: JobService,
                private tokenService: TokenStorageService) {

        this.user = (tokenService.getUser() as ProfileModel);

    }

    ngOnInit(): void {
        const jobId = this.activeRoute.snapshot.params.jobId;
        this.jobService.getJobByJobId(jobId)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (value) => {
                    console.log(value);
                    this.jobValue = value;
                }
            );

        this.jobService.getRecruiterIdByJobId(jobId)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (value) => {
                    this.ownsJob = value === this.user.id.toString();
                }
            );
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

    deleteJob(jobId: string): void {
        this.jobService.deleteJobByJobId(this.user.id.toString(), jobId)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (value) => {
                    if (value) {
                        setTimeout(() => {
                            console.log('Deleted..');
                        }, 500);
                    }
                },
                error => {
                    console.log('Error');
                },
                () => {
                    console.log('Completed');
                }
            );
    }

    updateJob(jobId: string): void {
        this.router.navigate([`jobs/job-update/edit/${jobId}`]);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }
}
