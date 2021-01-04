import {SkillNode} from '../profile/profile-skill-list/profile-skill-item/skill-node';
import {RequiredSkill} from './required-skill';

export interface JobModel {

    jobId: string;
    jobTitle: string;
    description: string;
    requiredSkills: RequiredSkill[];

}
