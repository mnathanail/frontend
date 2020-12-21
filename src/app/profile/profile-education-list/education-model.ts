import {PeriodModel} from '../../shared/models/period-model';

export interface EducationModel {
    id: string;
    educationId: string;
    title: string;
    degree: string;
    school: string;
    period: PeriodModel;
}
