import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {SummaryModel} from './summary-model';
import {Subject, Subscription} from 'rxjs';
import {SummaryService} from '../service/summary/summary.service';
import {ProfileAbstract} from '../abstract-profile';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-profile-summary',
    templateUrl: './profile-summary.component.html',
    styleUrls: ['./profile-summary.component.css']
})
export class ProfileSummaryComponent extends ProfileAbstract implements OnInit, OnDestroy {
    subscription: Subscription;
    data: SummaryModel;
    loaded = false;
    candidateId: string;
    private destroy$ = new Subject();

    constructor(protected router: Router,
                protected route: ActivatedRoute,
                private http: HttpClient,
                private summaryService: SummaryService) {
        super(router, route);
        this.candidateId = this.getCandidateId();
    }

    ngOnInit(): void {
        this.summaryService.getMessages().getSummaryChanged()
            .pipe(takeUntil(this.destroy$)).subscribe(
            (value: SummaryModel) => {
                this.data = value;
            }
        );
        this._getSummary(this.getCandidateId());
    }

    onAddOrEditSummary(): void {
        this.router.navigate(['edit/edit-intro-profile'], {relativeTo: this.route});
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
        /*this.subscription.unsubscribe();
        this.summaryService.getMessages().setSummaryChangedComplete();*/
    }

    private _getSummary(id: string): void {
        this.subscription = this.summaryService.getSummary(id)
            .pipe(takeUntil(this.destroy$)).subscribe(
            (value) => {
                this.data = value;
                this.loaded = true;
            },
            error => {
                this.summaryService.getMessages().setSummaryChangedError(error);
            },
            () => {
                console.log('completed!'); // this.profileService.setSummaryChangedComplete();
            }
        );
    }

}
