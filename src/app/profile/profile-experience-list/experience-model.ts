import {PeriodModel} from '../../shared/models/period-model';

export interface ExperienceModel {
    id: string;
    jobTitle: string;
    companyName: string;
    industry: string;
    isCurrent: boolean;
    period: PeriodModel;
    description: string;
    experienceId: string;
}
