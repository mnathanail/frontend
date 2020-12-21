import {SkillNode} from './skill-node';

export interface SkillModel extends SkillNode {
    skillNode: SkillNode;
    yearsOfExperience: number;
    relUuid: string;
}
