import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {LoaderComponent} from '../loader.component';
import {LoaderModel} from '../model/loader-model';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {

    private loader = new BehaviorSubject<LoaderModel>({id: 'random', status: false});

    loaderStatus = this.loader.asObservable();

    constructor() {
    }

    public showLoader(id?: string): void{
        this.loader.next({id, status: true});
    }

    public hideLoader(id?: string): void{
        this.loader.next({id, status: false});
    }
}
