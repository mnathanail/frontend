export interface RecommendationExtendedModel {
    candidateEntityId: number;
    candidateName: string;
    candidateSkillNumber: number;
    haveSkillNames: string[];
    totalSkillNames: string[];
    percent: number;
    totalSkillsNumber: number;
    dontHave: string[];
}
