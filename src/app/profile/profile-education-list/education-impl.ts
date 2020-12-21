import {EducationModel} from './education-model';
import {PeriodImpl} from '../../shared/models/period-impl';
import {PeriodModel} from '../../shared/models/period-model';

export class EducationImpl implements EducationModel{
    id = '';
    title = '';
    degree = '';
    educationId = '';
    school = '';
    period = new PeriodImpl();
}
