import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {SummaryModel} from './summary-model';
import {SummaryMessagesService} from '../service/summary/summary-messages.service';
import {Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {SummaryService} from '../service/summary/summary.service';

@Component({
    selector: 'app-profile-summary',
    templateUrl: './profile-summary.component.html',
    styleUrls: ['./profile-summary.component.css']
})
export class ProfileSummaryComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    data: SummaryModel;
    loaded = false;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private http: HttpClient,
                private summaryService: SummaryService) {
    }

    ngOnInit(): void {
        this.summaryService.getMessages().getSummaryChanged().subscribe(
            (value: SummaryModel) => {
                this.data = value;
            }
        );
        this._getSummary('1');
    }

    onAddOrEditSummary(): void {
        this.router.navigate(['edit/edit-intro-profile'], {relativeTo: this.route})
    }

    private _getSummary(id: string): void {
        id = '1';
        this.subscription = this.summaryService.getSummary(id).subscribe(
            (value) => {
                this.data = value;
                this.loaded = true;
            },
            error => {
                this.summaryService.getMessages().setSummaryChangedError(error);
            },
            () => {
                //this.profileService.setSummaryChangedComplete();
            }
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.summaryService.getMessages().setSummaryChangedComplete();
    }

}
