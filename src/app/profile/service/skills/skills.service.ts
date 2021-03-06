import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SkillModel} from '../../profile-skill-list/profile-skill-item/skill-model';
import {Endpoints} from '../../../endpoints/endpoints';
import {SkillEntityModel} from '../../profile-skill-list/profile-skill-item/skill-entity-model';

@Injectable({providedIn: 'root'})
export class SkillsService {

    constructor(private http: HttpClient) {
    }

    fetchSkills(skill: string): Observable<SkillModel[]> {
        const url = Endpoints.SKILL_GET_LIST;
        return this.http.get<SkillModel[]>(url, {params: {name: skill}});
    }

    fetchCandidateSkills(candidateId: string): Observable<SkillModel[]> {
        const url = Endpoints.SKILL_CANDIDATE_GET_LIST;
        const params = new HttpParams()
            .set('candidateId', candidateId);
        return this.http.get<SkillModel[]>(url, {params});
    }

    saveSkill(candidateId: string, skill: string): Observable<SkillModel> {
        const url = Endpoints.SKILL_POST;
        const params = new HttpParams()
            .set('candidateId', candidateId);
        return this.http.post<SkillModel>(url, {name: skill}, {params});
    }

    saveSkillList(candidateId: string, skills: SkillModel[]): Observable<SkillEntityModel[]> {
        const url = Endpoints.SKILL_POST_LIST;
        const params = new HttpParams()
            .set('candidateId', candidateId);
        return this.http.post<SkillEntityModel[]>(url, skills, {params});
    }

    saveCandidateSkillList(candidateId: string, skills: SkillModel[]): Observable<SkillModel[]> {
        const url = Endpoints.SKILL_CANDIDATE_SAVE_LIST;
        const params = new HttpParams()
            .set('candidateId', candidateId);
        return this.http.post<SkillModel[]>(url, skills, {params});
    }

    updateSkills(candidateId: string, skills: SkillModel[]): Observable<SkillModel[]> {
        const url = Endpoints.SKILL_PATCH_LIST;
        const params = new HttpParams()
            .set('candidateId', candidateId);
        return this.http.patch<SkillModel[]>(url, skills, {params});
    }

    deleteSkill(candidateId: string, skillUuid: string): Observable<boolean> {
        const url = Endpoints.SKILL_CANDIDATE_DELETE;
        const params = new HttpParams()
            .set('candidateId', candidateId)
            .set('skillUuid', skillUuid);
        return this.http.delete<boolean>(url, {params});
    }
}
