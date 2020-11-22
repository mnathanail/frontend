import {ExperienceModel} from './experience-model';
import {PeriodImpl} from '../../shared/models/period-impl';

export class ExperienceImpl implements ExperienceModel{
    id = '';
    companyName = '';
    description = '';
    industry = '';
    isCurrent = false;
    jobTitle = '';
    period = new PeriodImpl();
}
