import {BehaviorSubject, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ExperienceModel} from '../../profile-experience-list/experience-model';
import {PeriodModel} from '../../../shared/models/period-model';

@Injectable({providedIn: 'root'})
export class ExperienceMessagesService {
    private readonly DEFAULT_PHOTO_PROFILE = 'assets/images/generic.jpg';

    private experienceChanged = new BehaviorSubject<ExperienceModel>(
    {
        id: '',
        jobTitle: '',
        companyName: '',
        industry: '',
        isCurrent: false,
        period: null,
        description: ''
    });

    public getExperienceChanged(): Observable<ExperienceModel> {
        return this.experienceChanged.asObservable();
    }

    public setExperienceChanged(value: ExperienceModel): void {
        this.experienceChanged.next(value);
    }

    public setExperienceChangedError(error: any): void {
        this.experienceChanged.error(error);
    }

    public setExperienceChangedComplete(): void {
        this.experienceChanged.complete();
    }

}
