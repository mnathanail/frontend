import {BehaviorSubject, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ExperienceModel} from '../../profile-experience-list/experience-model';
import {CrudEventsModel} from '../../../shared/enums/crud-events-model.enum';


@Injectable({providedIn: 'root'})
export class ExperienceMessagesService {
    private readonly DEFAULT_PHOTO_PROFILE = 'assets/images/generic.jpg';

    private experienceChanged = new BehaviorSubject<{ type: CrudEventsModel, data: ExperienceModel }>(
        {
            type: CrudEventsModel.EMPTY,
            data: {
                id: '',
                jobTitle: '',
                experienceId: '',
                companyName: '',
                industry: '',
                isCurrent: false,
                period: null,
                description: '',
            }
        });

    public getExperienceChanged(): Observable<{ type: string, data: ExperienceModel }> {
        return this.experienceChanged.asObservable();
    }

    public setExperienceChanged(value: { type: CrudEventsModel, data: ExperienceModel }): void {
        this.experienceChanged.next(value);
    }

    public setExperienceChangedError(error: any): void {
        this.experienceChanged.error(error);
    }

    public setExperienceChangedComplete(): void {
        this.experienceChanged.complete();
    }

}
