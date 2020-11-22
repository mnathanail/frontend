import {SummaryModel} from '../../profile-summary/summary-model';
import {Observable, Subject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SkillsMessagesService {

    private summaryChanged = new Subject<SummaryModel>();

    public getSummaryChanged(): Observable<SummaryModel> {
        return this.summaryChanged.asObservable();
    }

    public setSummaryChanged(value: SummaryModel): void {
        this.summaryChanged.next(value);
    }

    public setSummaryChangedError(error: any): void {
        this.summaryChanged.error(error);
    }

    public setSummaryChangedComplete(): void {
        this.summaryChanged.complete();
    }


}
