import {Component, OnDestroy, OnInit} from '@angular/core';
import {JobModel} from '../job-model';
import {Subject} from 'rxjs';
import {TokenStorageService} from '../../shared/service/token-storage.service';
import {JobService} from '../service/job.service';
import {ProfileModel} from '../../profile/profile-model';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-jobs-manage',
    templateUrl: './jobs-manage.component.html',
    styleUrls: ['./jobs-manage.component.css']
})
export class JobsManageComponent implements OnInit, OnDestroy {

    profileId: string;
    jobList: JobModel[];
    loaded = false;
    isRecruiter = false;
    private destroy$ = new Subject();

    constructor(private tokenService: TokenStorageService,
                private jobService: JobService) {
        this.isRecruiter = this.tokenService.isRecruiter();
        this.profileId = (this.tokenService.getUser() as ProfileModel).id.toString();
    }

    ngOnInit(): void {
        this.getJobsManage();
    }

    getJobsManage(): void | boolean {
        if (!this.profileId) {
            return false;
        }
        this.jobService.getRecruiterManagesJobList(this.profileId)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (value) => {
                    this.jobList = value;
                    this.loaded = true;
                },
                error => console.log(error),
                () => {}
            );
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }
}
