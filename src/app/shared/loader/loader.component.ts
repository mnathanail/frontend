import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoaderService} from './service/loader.service';
import {LoaderModel} from './model/loader-model';
import {Subscriber, Subscription} from 'rxjs';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {

    public show: boolean;
    private subscribe: Subscription;
    id: string;

    constructor(private loaderService: LoaderService) {
    }

    ngOnInit(): void {
        this.subscribe = this.loaderService.loaderStatus
            .subscribe(value => {
                this.show = value.status;
            });
    }

    ngOnDestroy(): void {
        this.subscribe.unsubscribe();
    }
}
