import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoaderService} from './service/loader.service';
import {LoaderModel} from './model/loader-model';
import {Subject, Subscriber, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {

    public show: boolean;
    private destroy$ = new Subject();
    id: string;

    constructor(private loaderService: LoaderService) {
    }

    ngOnInit(): void {
        this.loaderService.loaderStatus
            .pipe(takeUntil(this.destroy$))
            .subscribe(value => {
                this.show = value.status;
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }
}
