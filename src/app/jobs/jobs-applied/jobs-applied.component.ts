import {Component, OnDestroy, OnInit} from '@angular/core';
import {TokenStorageService} from '../../shared/service/token-storage.service';
import {JobService} from '../service/job.service';
import {ProfileModel} from '../../profile/profile-model';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {JobModel} from '../job-model';

@Component({
    selector: 'app-jobs-applied',
    templateUrl: './jobs-applied.component.html',
    styleUrls: ['./jobs-applied.component.css']
})
export class JobsAppliedComponent implements OnInit, OnDestroy {

    profileId: string;
    jobList: JobModel[];
    loaded = false;
    private destroy$ = new Subject();

    constructor(private tokenService: TokenStorageService,
                private jobService: JobService) {
        this.profileId = (this.tokenService.getUser() as ProfileModel).id.toString();
    }

    ngOnInit(): void {
        this.getAppliedJobs();
    }

    getAppliedJobs(): void | boolean {
        if (!this.profileId) {
            return false;
        }
        this.jobService.getCandidateApplyJobList(this.profileId)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (value) => {
                    this.jobList = value;
                    this.loaded = true;
                },
                error => console.log(error),
                () => console.log('Complete')
            );
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }
}
