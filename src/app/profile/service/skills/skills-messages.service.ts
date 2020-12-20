import {Observable, Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {SkillModel} from '../../profile-skill-list/profile-skill-item/skill-model';
import {CrudEventsModel} from '../../../shared/enums/crud-events-model.enum';

@Injectable({
    providedIn: 'root'
})
export class SkillsMessagesService {

    private skillChanged = new Subject<{ type: CrudEventsModel, data: SkillModel[] }>();

    public getSkillChanged(): Observable<{ type: CrudEventsModel, data: SkillModel[] }> {
        return this.skillChanged.asObservable();
    }

    public setSkillChanged(value: { type: CrudEventsModel, data: SkillModel[] }): void {
        this.skillChanged.next(value);
    }

    public setSkillChangedError(error: any): void {
        this.skillChanged.error(error);
    }

    public setSkillChangedComplete(): void {
        this.skillChanged.complete();
    }


}
