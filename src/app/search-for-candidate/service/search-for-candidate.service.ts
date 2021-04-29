import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Endpoints} from '../../endpoints/endpoints';
import {SkillEntityModel} from '../../profile/profile-skill-list/profile-skill-item/skill-entity-model';
import {CandidatesFromSearch} from '../search-for-candidate.component';

@Injectable({
    providedIn: 'root'
})
export class SearchForCandidateService {

    constructor(private http: HttpClient) {
    }

    searchCandidatesBySkills(recruiterId: string, skills: SkillEntityModel[]): Observable<CandidatesFromSearch[]> {
        const url = Endpoints.RECRUITER_SEARCH_CANDIDATE_BY_SKILLS;
        const params = new HttpParams().set('recruiterId', recruiterId);
        return this.http.post<CandidatesFromSearch[]>(url, skills, {params});
    }

}
