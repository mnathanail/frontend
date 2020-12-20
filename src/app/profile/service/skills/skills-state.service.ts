import {Observable, Subject} from 'rxjs';
import {StateModel} from '../../../shared/enums/state-model.enum';
import {Injectable} from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class SkillsStateService {

    private skillState = new Subject<{ state: StateModel }>();

    public getSkillStateChanged(): Observable<{ state: StateModel }> {
        return this.skillState.asObservable();
    }

    public setSkillStateChanged(value: { state: StateModel }): void {
        this.skillState.next(value);
    }

    public setSkillStateChangedError(error: any): void {
        this.skillState.error(error);
    }

    public setSkillStateChangedComplete(): void {
        this.skillState.complete();
    }
}
