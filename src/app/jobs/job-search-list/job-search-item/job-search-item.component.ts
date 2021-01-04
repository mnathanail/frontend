import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {JobModel} from '../../job-model';
import {takeUntil} from 'rxjs/operators';
import {JobService} from '../../service/job.service';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-job-search-item',
    templateUrl: './job-search-item.component.html',
    styleUrls: ['./job-search-item.component.css']
})
export class JobSearchItemComponent implements OnInit, OnDestroy {

    destroy$ = new Subject();
    @Input() jobItem: JobModel;

    constructor(private jobService: JobService) {
    }
    
    ngOnInit(): void {
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

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }
}
