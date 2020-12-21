import {BehaviorSubject, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ExperienceModel} from '../../profile-experience-list/experience-model';
import {CrudEventsModel} from '../../../shared/enums/crud-events-model.enum';
import {EducationModel} from '../../profile-education-list/education-model';


@Injectable({providedIn: 'root'})
export class EducationMessagesService {
    private readonly DEFAULT_PHOTO_PROFILE = 'assets/images/generic.jpg';

    private educationChanged = new BehaviorSubject<{ type: CrudEventsModel, data: EducationModel }>(
        {
            type: CrudEventsModel.EMPTY,
            data: {
                id: '',
                educationId: '',
                title: '',
                school: '',
                degree: '',
                period: null,
            }
        });

    public getEducationChanged(): Observable<{ type: string, data: EducationModel }> {
        return this.educationChanged.asObservable();
    }

    public setEducationChanged(value: { type: CrudEventsModel, data: EducationModel }): void {
        this.educationChanged.next(value);
    }

    public setEducationChangedError(error: any): void {
        this.educationChanged.error(error);
    }

    public setEducationChangedComplete(): void {
        this.educationChanged.complete();
    }

}
