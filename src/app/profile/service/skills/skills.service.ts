import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SkillModel} from '../../profile-skill-list/profile-skill-item/skill-model';
import {Endpoints} from '../../../endpoints/endpoints';
import {SkillNodeModel} from '../../profile-skill-list/profile-skill-item/skill-node-model';
import {SkillEntityModel} from '../../profile-skill-list/profile-skill-item/skill-entity-model';

@Injectable({providedIn: 'root'})
export class SkillsService {

    constructor(private http: HttpClient) {
    }

    fetchSkills(skill: string): Observable<SkillModel[]> {
        const url = Endpoints.SKILL_GET_LIST.replace(':id', '1');
        return this.http.get<SkillModel[]>(url, {params: {name: skill}});
    }

    fetchCandidateSkills(): Observable<SkillModel[]> {
        const url = Endpoints.SKILL_CANDIDATE_GET_LIST.replace(':id', '1');
        return this.http.get<SkillModel[]>(url);
    }

    saveSkill(skill: string): Observable<SkillModel> {
        const url = Endpoints.SKILL_POST.replace(':id', '1');
        return this.http.post<SkillModel>(url, {name: skill});
    }

    saveSkillList(skills: SkillModel[]): Observable<SkillEntityModel[]> {
        const url = Endpoints.SKILL_POST_LIST.replace(':id', '1');
        return this.http.post<SkillEntityModel[]>(url, skills);
    }

    saveCandidateSkillList(skills: SkillModel[]): Observable<SkillModel[]> {
        const url = Endpoints.SKILL_CANDIDATE_SAVE_LIST.replace(':id', '1');
        return this.http.post<SkillModel[]>(url, skills);
    }

}
