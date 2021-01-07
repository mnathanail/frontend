import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Endpoints} from '../../../endpoints/endpoints';
import {EducationModel} from '../../profile-education-list/education-model';

@Injectable({providedIn: 'root'})
export class EducationService {

    constructor(private http: HttpClient) {
    }

    fetchEducationList(candidateId: string): Observable<EducationModel[]> {
        const url = Endpoints.EDUCATION_LIST_GET;
        const params = new HttpParams()
            .set('candidateId', candidateId);
        return this.http.get<EducationModel[]>(url, {params});
    }

    fetchEducation(candidateId: string, educationId: string): Observable<EducationModel> {
        const url = Endpoints.EDUCATION_GET;
        const params = new HttpParams()
            .set('candidateId', candidateId)
            .set('educationId', educationId);
        return this.http.get<EducationModel>(url, {params});
    }

    setEducation(candidateId: string, educationModel: EducationModel): Observable<EducationModel> {
        const url = Endpoints.EDUCATION_SAVE;
        const params = new HttpParams()
            .set('candidateId', candidateId);
        return this.http.post<EducationModel>(url, educationModel, {params});
    }

    patchEducation(educationModel: EducationModel, candidateId: string,  educationId: string): Observable<EducationModel> {
        const url = Endpoints.EDUCATION_PATCH;
        const params = new HttpParams()
            .set('candidateId', candidateId)
            .set('educationId', educationId);
        return this.http.patch<EducationModel>(url, educationModel, {params});
    }

    deleteEducatione(candidateId: string, educationId: string): Observable<boolean> {
        const url = Endpoints.EDUCATION_DELETE;
        const params = new HttpParams()
            .set('candidateId', candidateId)
            .set('educationId', educationId);
        return this.http.delete<boolean>(url, {params});
    }

}
