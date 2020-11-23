import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Endpoints} from '../../../endpoints/endpoints';
import {ExperienceModel} from '../../profile-experience-list/experience-model';

@Injectable({providedIn: 'root'})
export class ExperienceService {

    constructor(private http: HttpClient) {
    }

    fetchExperienceList(): Observable<ExperienceModel[]> {
        const url = Endpoints.EXPERIENCE_LIST_GET.replace(':id', '1');
        return this.http.get<ExperienceModel[]>(url);
    }

    fetchExperience(id: number): Observable<ExperienceModel> {
        const url = Endpoints.PROFILE_GET.replace(':id', '1');
        return this.http.get<ExperienceModel>(url);
    }

    setExperience(experienceModel: ExperienceModel): Observable<ExperienceModel> {
        const url = Endpoints.EXPERIENCE_SAVE.replace(':id', '1');
        return this.http.post<ExperienceModel>(url, experienceModel);
    }

    patchExperience(experienceModel: ExperienceModel, experienceId: string): Observable<ExperienceModel> {
        const url = Endpoints.EXPERIENCE_PATCH
            .replace(':id', '1')
            .replace(':experienceId', String(experienceId));
        return this.http.patch<ExperienceModel>(url, experienceModel);
    }

    deleteExperience(experienceId: string): Observable<ExperienceModel> {
        const url = Endpoints.EXPERIENCE_PATCH
            .replace(':id', '1')
            .replace(':experienceId', String(experienceId));
        return this.http.delete<ExperienceModel>(url);
    }

}
