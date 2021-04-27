import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {CrudEventsModel} from '../../shared/enums/crud-events-model.enum';
import {ExperienceModel} from '../../profile/profile-experience-list/experience-model';
import {JobModel} from '../job-model';
import {RequiredSkill} from '../required-skill';

@Injectable({providedIn: 'root'})
export class JobMessagesService {

    private jobChanged = new BehaviorSubject<{ type: CrudEventsModel, data: JobModel }>(
        {
            type: CrudEventsModel.EMPTY,
            data: {
                jobId: '',
                jobTitle: '',
                requiredSkills: [],
                description: ''
            }
        });

    public getJobChanged(): Observable<{ type: string, data: JobModel }> {
        return this.jobChanged.asObservable();
    }

    public setJobChanged(value: { type: CrudEventsModel, data: JobModel}): void {
        this.jobChanged.next(value);
    }

    public setJobChangedError(error: any): void {
        this.jobChanged.error(error);
    }

    public setJobChangedComplete(): void {
        this.jobChanged.complete();
    }

}
