export class Endpoints {
    static FAKE_SERVER_POST = 'https://jsonplaceholder.typicode.com/posts';
    static LOGIN = 'http://localhost:8080/login';

    static SUMMARY_POST = 'http://localhost:8080/profile/:id/save/summary';
    static SUMMARY_UPDATE = 'http://localhost:8080/profile/:id/update/summary';
    static SUMMARY_GET = 'http://localhost:8080/profile/:id/get/summary';

    static SKILL_GET_LIST = 'http://localhost:8080/profile/:id/get/skill-list';
    static SKILL_CANDIDATE_GET_LIST = 'http://localhost:8080/profile/:id/get/candidate-skill-list';
    static SKILL_CANDIDATE_SAVE_LIST = 'http://localhost:8080/profile/:id/save/candidate-skill-list';
    static SKILL_POST = 'http://localhost:8080/profile/:id/save/skill';
    static SKILL_POST_LIST = 'http://localhost:8080/profile/:id/save/skill-list';

    static PROFILE_GET = 'http://localhost:8080/profile/:id/get/profile';
    static PROFILE_PHOTO_POST = 'http://localhost:8080/profile/:id/save/profile-photo';

    static EXPERIENCE_LIST_GET = 'http://localhost:8080/profile/:id/get/experience-list';
    static EXPERIENCE_GET = 'http://localhost:8080/profile/:id/get/experience/:experienceId';
    static EXPERIENCE_SAVE = 'http://localhost:8080/profile/:id/save/experience';
    static EXPERIENCE_PATCH = 'http://localhost:8080/profile/:id/patch/experience/:experienceId';
    static EXPERIENCE_DELETE = 'http://localhost:8080/profile/:id/delete/experience/:experienceId';
}
