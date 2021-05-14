import {Component, OnDestroy, OnInit} from '@angular/core';
import {JobService} from '../service/job.service';
import {ActivatedRoute, Router} from '@angular/router';
import {JobModel} from '../job-model';
import {EMPTY, of, Subject} from 'rxjs';
import {catchError, map, switchMap, takeUntil} from 'rxjs/operators';
import {TokenStorageService} from '../../shared/service/token-storage.service';
import {ProfileModel} from '../../profile/profile-model';
import {RecommendationExtendedModel} from '../../search-for-candidate/recommendation-extended-model';
import {ToastService} from '../../toast/service/toast.service';
import {Location} from '@angular/common';

@Component({
    selector: 'app-job-view',
    templateUrl: './job-view.component.html',
    styleUrls: ['./job-view.component.css']
})
export class JobViewComponent implements OnInit, OnDestroy {

    jobValue: JobModel;
    ownsJob = false;
    user: ProfileModel;
    candidateId: string;
    buttonLabel = 'Apply';
    hasApplied = false;
    isRecruiter = false;
    jobId: string;
    recommendationForJob: RecommendationExtendedModel[];
    appliedWithReccomendationForJob: RecommendationExtendedModel[];
    jobRequires: any;
    private destroy$ = new Subject<any>();

    constructor(private activeRoute: ActivatedRoute,
                private router: Router,
                private jobService: JobService,
                private tokenService: TokenStorageService,
                private toastService: ToastService,
                private location: Location) {

        this.user = (tokenService.getUser() as ProfileModel);
        this.isRecruiter = tokenService.isRecruiter();
        this.candidateId = this.user.id.toString();
        this.jobId = this.activeRoute.snapshot.params.jobId;
    }

    ngOnInit(): void {

        this.jobService.checkIfAlreadyAppliedForJob(this.candidateId, this.jobId)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (value) => {
                    if (value === true) {
                        this.buttonLabel = 'Already Applied';
                        this.hasApplied = true;
                    }
                }
            );

        this.jobService.getJobByJobId(this.jobId)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (value) => {
                    this.jobValue = value;
                }
            );

        this.jobService.getRecruiterIdByJobId(this.jobId)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (value) => {
                    this.ownsJob = value === this.user.id.toString();
                }
            );
        this.alreadyApplyChecking(this.jobId);
        if (this.isRecruiter) {
            this.getRecommendationForJob();
            this.getRecommendationForAppliedJob();
        }
    }

    refreshRecommendationList(): void{
        this.getRecommendationForJob();
    }

    applyForJob(jobId: string): void {
        const candidateId = this.user.id.toString();

        this.jobService.postCandidateApplyForJob(candidateId, jobId)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (value) => {
                    console.log(value);
                    this.toastService.show(
                        'Congratulations! You just applied for this job! Step closer!',
                        {classname: 'bg-success text-light'}
                    );
                    this.buttonLabel = 'Already Applied';
                    this.hasApplied = true;
                },
                error => {
                    console.log('error');
                },
                () => {}
            );
    }

    deleteJob(jobId: string): void {
        this.jobService.deleteJobByJobId(this.user.id.toString(), jobId)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (value) => {
                    if (!value) {
                        this.toastService.show('Deleted', {classname: 'bg-success text-light'});
                        setTimeout(() => {
                            this.router.navigate(['/jobs-manage']);
                        }, 500);
                    }
                },
                error => {
                    console.log('Error');
                },
                () => {
                }
            );
    }

    updateJob(jobId: string): void {

        this.router.navigate([`/job-update/edit/${jobId}`]);
    }

    getRecommendationForJob(): void {
        this.jobService.getCandidateRecommendationForJob(this.candidateId, this.jobId)
            .pipe(takeUntil(this.destroy$),
                map((result) => {
                    const items = result.map(e => {
                        e.dontHave = e.totalSkillNames.filter(a => !e.haveSkillNames.includes(a));
                        return e;
                    });
                    return items;
                }))
            .subscribe(
                (value) => {
                    this.recommendationForJob = value.sort((a, b) => (a.percent > b.percent) ? -1 : 1);
                    this.jobRequires = value[0]?.totalSkillNames;
                }
            );
    }

    getRecommendationForAppliedJob(): void {
        this.jobService.getCandidateRecommendationForAppliedJob(this.candidateId, this.jobId)
            .pipe(takeUntil(this.destroy$),
                map((result) => {
                    const items = result.map(e => {
                        e.dontHave = e.totalSkillNames.filter(a => !e.haveSkillNames.includes(a));
                        return e;
                    });
                    console.log(items);
                    return items;
                }))
            .subscribe(
                (value) => {
                    console.log(value);
                    this.appliedWithReccomendationForJob = value.sort((a, b) => (a.percent > b.percent) ? -1 : 1);
                }
            );
    }

    alreadyApplyChecking(jobId: string): void {
        if (!this.isRecruiter) {
            this.jobService.checkIfAlreadyAppliedForJob(this.candidateId, jobId)
                .pipe(
                  /*  switchMap(value => {
                        if (value === false) {
                            return this.jobService.postCandidateApplyForJob(this.candidateId, jobId);
                        } else {
                            return of();
                        }
                    }),
                    catchError(err => EMPTY),*/
                    takeUntil(this.destroy$)
                )
                .subscribe(
                    (value) => {
                        /*this.toastService.show(
                            'Congratulations! You just applied for this job! Step closer!',
                            {classname: 'bg-success text-light'}
                        );*/
                        console.log(value);
                    }
                );
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

    goBack(): void {
        this.location.back();
    }
}
