export class Endpoints {
    static FAKE_SERVER_POST = 'https://jsonplaceholder.typicode.com/posts';
    static LOGIN = 'http://localhost:8080/authenticate';

    static SUMMARY_POST = 'http://localhost:8080/profile/:id/save/summary';
    static SUMMARY_UPDATE = 'http://localhost:8080/profile/:id/update/summary';
    static SUMMARY_GET = 'http://localhost:8080/profile/:id/get/summary';

    static SKILL_GET_LIST = 'http://localhost:8080/profile/:id/get/skill-list';
    static SKILL_CANDIDATE_GET_LIST = 'http://localhost:8080/profile/:id/get/candidate-skill-list';
    static SKILL_CANDIDATE_SAVE_LIST = 'http://localhost:8080/profile/:id/save/candidate-skill-list';
    static SKILL_CANDIDATE_DELETE = 'http://localhost:8080/profile/:id/delete/candidate-skill/:skillUuid';
    static SKILL_POST = 'http://localhost:8080/profile/:id/save/skill';
    static SKILL_POST_LIST = 'http://localhost:8080/profile/:id/save/skill-list';
    static SKILL_PATCH_LIST = 'http://localhost:8080/profile/:id/patch/skill-list';

    static PROFILE_GET = 'http://localhost:8080/profile/:id/get/profile';
    static PROFILE_PHOTO_POST = 'http://localhost:8080/profile/:id/save/profile-photo';

    static EDUCATION_LIST_GET = 'http://localhost:8080/profile/:id/get/education-list';
    static EDUCATION_GET = 'http://localhost:8080/profile/:id/get/education/:educationId';
    static EDUCATION_SAVE = 'http://localhost:8080/profile/:id/save/education';
    static EDUCATION_PATCH = 'http://localhost:8080/profile/:id/patch/education/:educationId';
    static EDUCATION_DELETE = 'http://localhost:8080/profile/:id/delete/education/:educationId';

    static EXPERIENCE_LIST_GET = 'http://localhost:8080/profile/:id/get/experience-list';
    static EXPERIENCE_GET = 'http://localhost:8080/profile/:id/get/experience/:experienceId';
    static EXPERIENCE_SAVE = 'http://localhost:8080/profile/:id/save/experience';
    static EXPERIENCE_PATCH = 'http://localhost:8080/profile/:id/patch/experience/:experienceId';
    static EXPERIENCE_DELETE = 'http://localhost:8080/profile/:id/delete/experience/:experienceId';

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
