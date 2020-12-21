import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Endpoints} from '../../../endpoints/endpoints';
import {EducationModel} from '../../profile-education-list/education-model';

@Injectable({providedIn: 'root'})
export class EducationService {

    constructor(private http: HttpClient) {
    }

    fetchEducationList(): Observable<EducationModel[]> {
        const url = Endpoints.EXPERIENCE_LIST_GET.replace(':id', '1');
        return this.http.get<EducationModel[]>(url);
    }

    fetchEducation(educationId: string): Observable<EducationModel> {
        const url = Endpoints.EXPERIENCE_GET
            .replace(':id', '1')
            .replace(':educationId', educationId);
        return this.http.get<EducationModel>(url);
    }

    setEducation(educationModel: EducationModel): Observable<EducationModel> {
        const url = Endpoints.EXPERIENCE_SAVE.replace(':id', '1');
        return this.http.post<EducationModel>(url, educationModel);
    }

    patchEducation(educationModel: EducationModel, educationId: string): Observable<EducationModel> {
        const url = Endpoints.EXPERIENCE_PATCH
            .replace(':id', '1')
            .replace(':educationId', String(educationId));
        return this.http.patch<EducationModel>(url, educationModel);
    }

    deleteEducatione(educationId: string): Observable<boolean> {
        const url = Endpoints.EXPERIENCE_DELETE
            .replace(':id', '1')
            .replace(':educationId', educationId);
        return this.http.delete<boolean>(url);
    }

}
