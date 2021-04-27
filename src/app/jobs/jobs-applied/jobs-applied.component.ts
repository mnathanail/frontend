import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {TokenStorageService} from '../../shared/service/token-storage.service';
import {JobService} from '../service/job.service';
import {ProfileModel} from '../../profile/profile-model';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {JobModel} from '../job-model';
import {JobMessagesService} from '../service/job-messages.service';
import {CrudEventsModel} from '../../shared/enums/crud-events-model.enum';

@Component({
    selector: 'app-jobs-applied',
    templateUrl: './jobs-applied.component.html',
    styleUrls: ['./jobs-applied.component.css']
})
export class JobsAppliedComponent implements OnInit, OnDestroy, OnChanges {

    profileId: string;
    jobList: JobModel[];
    loaded = false;
    private destroy$ = new Subject();

    constructor(private tokenService: TokenStorageService,
                private jobService: JobService,
                private jobServiceMessage: JobMessagesService,) {
        this.profileId = (this.tokenService.getUser() as ProfileModel).id.toString();
    }

    ngOnInit(): void {
        this.getAppliedJobs();

        this.jobServiceMessage.getJobChanged()
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (value) => {
                    switch (value.type) {
                        case CrudEventsModel.DELETE: {
                            if (this.jobList) {
                                const index = this.jobList.findIndex(job => job.jobId === value.data.jobId);
                                if (index !== -1) {
                                    this.jobList.splice(index, 1);
                                }
                            }
                            break;
                        }
                    }
                }
            );
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes);


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

    undoApply(jobId: string): void {
        const deleted = this.jobList.find(value => value.jobId === jobId);
        this.jobService.deleteCandidateApplyForJob(this.profileId, jobId)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (value) => {
                    if (value === false) {
                        this.jobServiceMessage.setJobChanged({data: deleted, type: CrudEventsModel.DELETE});
                    }
                }
            );
    }


}
