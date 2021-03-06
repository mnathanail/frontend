import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {Subject, Subscription} from 'rxjs';
import {Endpoints} from '../../../endpoints/endpoints';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ProfileAbstractEdit} from '../profile-abstract-edit';
import {SummaryModel} from '../../profile-summary/summary-model';
import {SummaryService} from '../../service/summary/summary.service';
import {delay, take, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-profile-edit-summary',
    templateUrl: './profile-edit-summary.component.html',
    styleUrls: ['./profile-edit-summary.component.css']
})
export class ProfileEditSummaryComponent extends ProfileAbstractEdit implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('content') content: ElementRef;
    editSummaryForm: FormGroup;
    subscription: Subscription;
    summary = '';
    loaded = false;
    candidateId: string;

    constructor(protected config: NgbModalConfig,
                protected modalService: NgbModal,
                protected router: Router,
                protected route: ActivatedRoute,
                private http: HttpClient,
                private summaryService: SummaryService
    ) {
        super(config, modalService, router, route);
        this.candidateId = this.getCandidateId();
    }

    ngOnInit(): void {
        this.summaryService.getSummary(this.candidateId)
            .pipe(takeUntil(this.destroy$)).subscribe(
            (value) => {
                if (value !== null) {
                    this.summary = value.summary;
                    this.initForm(this.summary);
                }
                else{
                    this.initForm('');
                }
                this.loaded = true;
            },
            error => {
                this.summaryService.getMessages().setSummaryChangedError(error);
            },
            () => {
                // this.profileService.setSummaryChangedComplete();
            }
        );
    }

    ngAfterViewInit(): void {
        this.openModal(this.content);
    }

    onSave(): Subscription {
        const url = Endpoints.SUMMARY_POST;
        const params = new HttpParams()
            .set('candidateId', this.getCandidateId());
        const returnedTarget = Object.assign(this.editSummaryForm.value, {id: this.getCandidateId()});

        return this.http.post(url, returnedTarget, {params})
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (value: SummaryModel) => {
                    this.summaryService.getMessages().setSummaryChanged(value);
                },
                error => {
                    console.log(error);
                    this.summaryService.getMessages().setSummaryChangedError(error);
                },
                () => {
                    this.delayedModalClose();
                }
            );
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

    private initForm(summary: string): void {
        this.editSummaryForm = new FormGroup({
            summary: new FormControl(summary || '')
        });
    }
}
