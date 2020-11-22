import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Endpoints} from '../../../endpoints/endpoints';
import {HttpClient} from '@angular/common/http';
import {ProfileAbstractEdit} from '../profile-abstract-edit';
import {SummaryMessagesService} from '../../service/summary/summary-messages.service';
import {SummaryModel} from '../../profile-summary/summary-model';
import {SummaryService} from '../../service/summary/summary.service';
import {delay} from 'rxjs/operators';

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

    constructor(protected config: NgbModalConfig,
                protected modalService: NgbModal,
                protected router: Router,
                protected route: ActivatedRoute,
                private http: HttpClient,
                private summaryService: SummaryService
    ) {
        super(config, modalService, router, route);
    }

    ngOnInit(): void {
        this.subscription = this.summaryService.getSummary('1').subscribe(
            (value) => {
                this.summary = value.summary;
                this.loaded = true;
                this.initForm(this.summary);
            },
            error => {
                this.summaryService.getMessages().setSummaryChangedError(error);
            },
            () => {
                //this.profileService.setSummaryChangedComplete();
            }
        );
    }

    ngAfterViewInit(): void {
        this.openModal(this.content);
    }

    onSave(): Subscription {
        const url = Endpoints.SUMMARY_POST.replace(':id', '1');
        const returnedTarget = Object.assign(this.editSummaryForm.value, {id: 1});

        return this.http.post(url, returnedTarget)
            .pipe(delay(500))
            .subscribe(
                (value: SummaryModel) => {
                    this.summaryService.getMessages().setSummaryChanged(value);
                },
                error => {
                    this.summaryService.getMessages().setSummaryChangedError(error);
                },
                () => {

                    this.onClose();
                }
            );
    }

    private initForm(summary: string): void {
        this.editSummaryForm = new FormGroup({
            summary: new FormControl(summary || '')
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
