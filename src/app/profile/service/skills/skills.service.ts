import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {SkillModel} from '../../profile-skill-list/profile-skill-item/skill-model';
import {Endpoints} from '../../../endpoints/endpoints';
import {map} from 'rxjs/operators';

@Injectable()
export class SkillsService {

    constructor(private http: HttpClient) {
    }

    fetchSkills(skill: string): Observable<SkillModel[]> {
        const url = Endpoints.SKILL_GET_LIST.replace(':id', '1');
        return this.http.get<SkillModel[]>(url, {params: {name: skill}});
    }

    saveSkill(skill: string): Observable<SkillModel> {
        const url = Endpoints.SKILL_POST.replace(':id', '1');
        return this.http.post<SkillModel>(url, {name: skill});
    }

    saveSkillList(skills: SkillModel[]): Observable<SkillModel[]> {
        const url = Endpoints.SKILL_POST_LIST.replace(':id', '1');
        return this.http.post<SkillModel[]>(url, skills);
    }

}
