import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {JobModel} from '../../job-model';
import {catchError, switchMap, takeUntil} from 'rxjs/operators';
import {JobService} from '../../service/job.service';
import {EMPTY, of, Subject} from 'rxjs';
import {TokenStorageService} from '../../../shared/service/token-storage.service';
import {ProfileModel} from '../../../profile/profile-model';
import {ToastService} from '../../../toast/service/toast.service';

@Component({
    selector: 'app-job-search-item',
    templateUrl: './job-search-item.component.html',
    styleUrls: ['./job-search-item.component.css']
})
export class JobSearchItemComponent implements OnInit, OnDestroy, OnChanges {

    destroy$ = new Subject();
    @Input() jobItem: JobModel;
    user: ProfileModel;
    candidateId: string;
    buttonLabel = 'Apply';
    hasApplied = false;
    loaded = false;
    isRecruiter = false;

    constructor(private jobService: JobService,
                private tokenService: TokenStorageService,
                private toastService: ToastService) {
        this.user = (tokenService.getUser() as ProfileModel);
        this.isRecruiter = tokenService.isRecruiter();
        this.candidateId = this.user.id.toString();
    }

    ngOnChanges(): void {
        this.jobService.checkIfAlreadyAppliedForJob(this.candidateId, this.jobItem.jobId)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (value) => {
                    this.loaded = true;
                    if (value === true) {
                        this.buttonLabel = 'Already Applied';
                        this.hasApplied = true;
                    }
                    else{
                        this.buttonLabel = 'Apply';
                        this.hasApplied = false;
                    }
                }
            );
    }

    ngOnInit(): void {
        /*console.log(this.jobItem.jobId)
        this.jobService.checkIfAlreadyAppliedForJob(this.candidateId, this.jobItem.jobId)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (value) => {
                    if (value === true) {
                        this.buttonLabel = 'Already Applied';
                        this.hasApplied = true;
                    }
                }
            );*/
    }


    applyForJob(jobId: string): void {
        this.jobService.checkIfAlreadyAppliedForJob(this.candidateId, jobId)
            .pipe(
                switchMap(value => {
                    if (value === false) {
                        return this.jobService.postCandidateApplyForJob(this.candidateId, jobId);
                    } else {
                        this.toastService.show(
                            'You have already applied for this job!',
                            {classname: 'bg-warning text-light'}
                        );
                        return of();
                    }
                }),
                catchError(err => EMPTY),
                takeUntil(this.destroy$)
            )
            .subscribe(
                (value) => {
                    this.toastService.show(
                        'Congratulations! You just applied for this job! Step closer! :D',
                        {classname: 'bg-success text-light'}
                    );
                }
            );
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }
}
