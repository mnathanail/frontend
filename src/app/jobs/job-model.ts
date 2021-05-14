import {RequiredSkill} from './required-skill';

export interface JobModel {
    jobId: string;
    jobTitle: string;
    description: string;
    requiredSkills: RequiredSkill[];
}
