import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SummaryModel} from '../../profile-summary/summary-model';
import {Endpoints} from '../../../endpoints/endpoints';
import {SummaryMessagesService} from './summary-messages.service';
import {HttpClient} from '@angular/common/http';
import {UrlParameterService} from '../../../shared/service/url-parameter.service';

@Injectable({
    providedIn: 'root'
})
export class SummaryService{

    constructor(private http: HttpClient,
                private messages: SummaryMessagesService,
                private urlParameterService: UrlParameterService) {
    }

    getSummary(id: string): Observable<SummaryModel> {
        const url = Endpoints.SUMMARY_GET.replace(':id', '1');
        return this.http.get<SummaryModel>(url);
    }

    saveSummary(summary: SummaryModel): Observable<SummaryModel> {
        const url = Endpoints.SUMMARY_POST.replace(':id', '1');
        const returnedTarget = Object.assign(summary, {id: 1});
        return this.http.post<SummaryModel>(url, returnedTarget);
    }

    getMessages(): SummaryMessagesService{
        return this.messages;
    }
}
