import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SummaryModel} from '../../profile-summary/summary-model';
import {Endpoints} from '../../../endpoints/endpoints';
import {SummaryMessagesService} from './summary-messages.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SummaryService{

    constructor(private http: HttpClient,
                private messages: SummaryMessagesService) {
    }
    getSummary(id: string): Observable<SummaryModel> {
        const url = Endpoints.SUMMARY_GET.replace(':id', '1');
        return this.http.get<SummaryModel>(url);
    }

    saveSummary(summary: SummaryModel): Observable<SummaryModel> {
        const url = Endpoints.SUMMARY_POST.replace(':id', '1');
        const returnedTarget = Object.assign(summary, {id: 1});
        console.log(returnedTarget);
        return this.http.post<SummaryModel>(url, returnedTarget);
    }

    getMessages(): SummaryMessagesService{
        return this.messages;
    }
}
