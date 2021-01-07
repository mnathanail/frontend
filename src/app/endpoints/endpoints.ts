export class Endpoints {
    static FAKE_SERVER_POST = 'https://jsonplaceholder.typicode.com/posts';
    static LOGIN = 'http://localhost:8080/authenticate';
    static REGISTER = 'http://localhost:8080/register';

    static SUMMARY_POST = 'http://localhost:8080/profile/save/summary';
    static SUMMARY_UPDATE = 'http://localhost:8080/profile/update/summary';
    static SUMMARY_GET = 'http://localhost:8080/profile/get/summary';

    static SKILL_GET_LIST = 'http://localhost:8080/profile/get/skill-list';
    static SKILL_CANDIDATE_GET_LIST = 'http://localhost:8080/profile/get/candidate-skill-list';
    static SKILL_CANDIDATE_SAVE_LIST = 'http://localhost:8080/profile/save/candidate-skill-list';
    static SKILL_CANDIDATE_DELETE = 'http://localhost:8080/profile/delete/candidate-skill/:skillUuid';
    static SKILL_POST = 'http://localhost:8080/profile/save/skill';
    static SKILL_POST_LIST = 'http://localhost:8080/profile/save/skill-list';
    static SKILL_PATCH_LIST = 'http://localhost:8080/profile/patch/skill-list';

    static PROFILE_GET = 'http://localhost:8080/profile/get/profile';
    static PROFILE_PHOTO_POST = 'http://localhost:8080/profile/save/profile-photo';

    static EDUCATION_LIST_GET = 'http://localhost:8080/profile/get/education-list';
    static EDUCATION_GET = 'http://localhost:8080/profile/get/education/:educationId';
    static EDUCATION_SAVE = 'http://localhost:8080/profile/save/education';
    static EDUCATION_PATCH = 'http://localhost:8080/profile/patch/education/:educationId';
    static EDUCATION_DELETE = 'http://localhost:8080/profile/delete/education/:educationId';

    static EXPERIENCE_LIST_GET = 'http://localhost:8080/profile/get/experience-list';
    static EXPERIENCE_GET = 'http://localhost:8080/profile/get/experience';
    static EXPERIENCE_SAVE = 'http://localhost:8080/profile/save/experience';
    static EXPERIENCE_PATCH = 'http://localhost:8080/profile/patch/experience';
    static EXPERIENCE_DELETE = 'http://localhost:8080/profile/delete/experience';

    static JOB_SAVE = 'http://localhost:8080/controller/job-posting/:recruiterId/save/job';
    static JOB_GET_BY_ID = 'http://localhost:8080/controller/job-view/get/job/:jobId';
    static JOB_PATCH = 'http://localhost:8080/controller/:recruiterId/patch/job/:jobId';
    static JOB_DELETE = 'http://localhost:8080/controller/:recruiterId/delete/job/:jobId';
    static JOB_CANDIDATE_APPLIED = 'http://localhost:8080/controller/:candidateId/get/job-list';
    static CANDIDATE_APPLIED_FOR_JOB = 'http://localhost:8080/controller/candidate/:candidateId/apply/job/:jobId';
    static JOB_CANDIDATE_RECOMMENDATION = 'http://localhost:8080/controller/:candidateId/get/recommendation/job-list';
    static JOB_RECRUITER_MANAGES = 'http://localhost:8080/controller/:recruiterId/get/job-list';

    static CANDIDATE_SEARCH_JOB_BY_KEYWORDS = 'http://localhost:8080/controller/candidate/search/job/keywords';

}
