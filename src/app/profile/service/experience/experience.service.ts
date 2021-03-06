import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Endpoints} from '../../../endpoints/endpoints';
import {ExperienceModel} from '../../profile-experience-list/experience-model';

@Injectable({providedIn: 'root'})
export class ExperienceService {

    constructor(private http: HttpClient) {
    }

    fetchExperienceList(candidateId: string): Observable<ExperienceModel[]> {
        const url = Endpoints.EXPERIENCE_LIST_GET;
        const params = new HttpParams()
            .set('candidateId', candidateId);
        return this.http.get<ExperienceModel[]>(url, {params});
    }

    fetchExperience(candidateId: string, experienceId: string): Observable<ExperienceModel> {
        const url = Endpoints.EXPERIENCE_GET;
        const params = new HttpParams()
            .set('candidateId', candidateId)
            .set('experienceId', experienceId);
        return this.http.get<ExperienceModel>(url, {params});
    }

    setExperience(candidateId: string, experienceModel: ExperienceModel): Observable<ExperienceModel> {
        const url = Endpoints.EXPERIENCE_SAVE;
        const params = new HttpParams()
            .set('candidateId', candidateId);
        return this.http.post<ExperienceModel>(url, experienceModel, {params});
    }

    /*
     *
     * Todo: change the patch logic
     *
     */
    patchExperience(experienceModel: ExperienceModel, candidateId: string, experienceId: string): Observable<ExperienceModel> {
        const url = Endpoints.EXPERIENCE_PATCH;
        const params = new HttpParams()
            .set('candidateId', candidateId)
            .set('experienceId', experienceId);
        return this.http.patch<ExperienceModel>(url, experienceModel);
    }

    deleteExperience(candidateId: string, experienceId: string): Observable<boolean> {
        const url = Endpoints.EXPERIENCE_DELETE;
        const params = new HttpParams()
            .set('candidateId', candidateId)
            .set('experienceId', experienceId);
        return this.http.delete<boolean>(url, {params});
    }

}
