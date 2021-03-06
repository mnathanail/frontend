import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SummaryModel} from '../../profile-summary/summary-model';
import {Endpoints} from '../../../endpoints/endpoints';
import {SummaryMessagesService} from './summary-messages.service';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SummaryService{

    constructor(private http: HttpClient,
                private messages: SummaryMessagesService
    ) {
    }

    getSummary(candidateId: string): Observable<SummaryModel> {
        const url = Endpoints.SUMMARY_GET;
        const params = new HttpParams()
            .set('candidateId', candidateId);
        return this.http.get<SummaryModel>(url, {params});
    }

    saveSummary(candidateId: string, summary: SummaryModel): Observable<SummaryModel> {
        const url = Endpoints.SUMMARY_POST;
        const params = new HttpParams()
            .set('candidateId', candidateId);
        const returnedTarget = Object.assign(summary, {id: candidateId});
        return this.http.post<SummaryModel>(url, {returnedTarget}, {params});
    }

    getMessages(): SummaryMessagesService{
        return this.messages;
    }
}
