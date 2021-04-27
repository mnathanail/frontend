import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Endpoints} from '../../endpoints/endpoints';
import {JobModel} from '../job-model';
import {PageableResponse} from '../../shared/models/pageable-response';
import {RecommendationExtendedModel} from '../../search-for-candidate/recommendation-extended-model';

@Injectable({
    providedIn: 'root'
})
export class JobService {

    constructor(private http: HttpClient) {
    }

    saveJob(recruiterId: string, jobModel: JobModel): Observable<JobModel> {
        const url = Endpoints.JOB_SAVE;
        const params = new HttpParams()
            .set('recruiterId', recruiterId);

        return this.http.post<JobModel>(url, jobModel, {params});
    }

    getJobByJobId(jobId: string): Observable<JobModel> {
        const url = Endpoints.JOB_GET_BY_ID;
        const params = new HttpParams()
            .set('jobId', jobId);
        return this.http.get<JobModel>(url, {params});
    }

    getCandidateApplyJobList(candidateId: string): Observable<JobModel[]> {
        const url = Endpoints.JOB_CANDIDATE_APPLIED;
        const params = new HttpParams()
            .set('candidateId', candidateId);
        return this.http.get<JobModel[]>(url, {params});
    }

    postCandidateApplyForJob(candidateId: string, jobId: string): Observable<boolean> {
        const url = Endpoints.CANDIDATE_APPLIED_FOR_JOB;
        const params = new HttpParams()
            .set('candidateId', candidateId)
            .set('jobId', jobId);
        return this.http.post<boolean>(url, {}, {params});
    }

    checkIfAlreadyAppliedForJob(candidateId: string, jobId: string): Observable<boolean> {
        const url = Endpoints.CANDIDATE_ALREADY_APPLIED_FOR_JOB;
        const params = new HttpParams()
            .set('candidateId', candidateId)
            .set('jobId', jobId);
        return this.http.get<boolean>(url, {params});
    }

    deleteCandidateApplyForJob(candidateId: string, jobId: string): Observable<boolean> {
        const url = Endpoints.CANDIDATE_DELETE_APPLIED_FOR_JOB;
        const params = new HttpParams()
            .set('candidateId', candidateId)
            .set('jobId', jobId);
        return this.http.delete<boolean>(url, {params});
    }

    getRecruiterManagesJobList(recruiterId: string): Observable<JobModel[]> {
        const url = Endpoints.JOB_RECRUITER_MANAGES;
        const params = new HttpParams()
            .set('recruiterId', recruiterId);
        return this.http.get<JobModel[]>(url, {params});
    }

    patchJob(jobModel: JobModel, recruiterId: string, jobId: string): Observable<JobModel> {
        const url = Endpoints.JOB_PATCH;
        const params = new HttpParams()
            .set('recruiterId', recruiterId)
            .set('jobId', jobId);
        return this.http.patch<JobModel>(url, jobModel, {params});
    }

    deleteJobByJobId(recruiterId: string, jobId: string): Observable<boolean> {
        const url = Endpoints.JOB_DELETE;
        const params = new HttpParams()
            .set('recruiterId', recruiterId)
            .set('jobId', jobId);
        return this.http.delete<boolean>(url, {params});
    }

    getJobRecommendationForCandidate(candidateId: string): Observable<JobModel[]> {
        const url = Endpoints.JOB_CANDIDATE_RECOMMENDATION_JOB.replace(':candidateId', candidateId);
        return this.http.get<JobModel[]>(url);
    }

    getCandidateRecommendationForJob(recruiterId: string, jobId: string): Observable<RecommendationExtendedModel[]> {
        const params = new HttpParams()
            .set('recruiterId', recruiterId)
            .set('jobId', jobId);
        const url = Endpoints.JOB_CANDIDATE_RECOMMENDATION_JOB;
        return this.http.get<RecommendationExtendedModel[]>(url, {params});
    }

    getCandidateRecommendationForAppliedJob(recruiterId: string, jobId: string): Observable<RecommendationExtendedModel[]> {
        const params = new HttpParams()
            .set('recruiterId', recruiterId)
            .set('jobId', jobId);
        const url = Endpoints.JOB_CANDIDATE_RECOMMENDATION_JOB_APPLIED;
        return this.http.get<RecommendationExtendedModel[]>(url, {params});
    }

    getJobsForCandidateDependingOnSkillArray(keywords: string[], page?: string): Observable<PageableResponse<JobModel[]>> {
        const url = Endpoints.CANDIDATE_SEARCH_JOB_BY_KEYWORDS;
        return this.http.get<PageableResponse<JobModel[]>>(url, {params: {keywords, page}});
    }

    getRecruiterIdByJobId(jobId: string): Observable<string> {
        const url = Endpoints.GET_RECRUITER_BY_JOB_ID;
        const params = new HttpParams()
            .set('jobId', jobId);
        return this.http.get<string>(url, {params});
    }

    removeSkill(recruiterId: string, entityId: number): Observable<boolean> {
        const params = new HttpParams()
            .set('recruiterId', recruiterId)
            .set('entityId', String(entityId));
        const url = Endpoints.JOB_CANDIDATE_RECOMMENDATION_JOB_APPLIED;
        return this.http.delete<boolean>(url, {params});
    }
}
