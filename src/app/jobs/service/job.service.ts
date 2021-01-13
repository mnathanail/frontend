import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Endpoints} from '../../endpoints/endpoints';
import {JobModel} from '../job-model';
import {PageableResponse} from '../../shared/models/pageable-response';

@Injectable({
    providedIn: 'root'
})
export class JobService {

    constructor(private http: HttpClient) {
    }

    saveJob(jobModel: JobModel): Observable<JobModel> {
        const url = Endpoints.JOB_SAVE.replace(':recruiterId', '2');
        return this.http.post<JobModel>(url, jobModel);
    }

    getJobByJobId(id: string): Observable<JobModel> {
        const url = Endpoints.JOB_GET_BY_ID.replace(':jobId', id);
        return this.http.get<JobModel>(url);
    }

    getCandidateApplyJobList(candidateId: string): Observable<JobModel[]> {
        const url = Endpoints.JOB_CANDIDATE_APPLIED.replace(':candidateId', candidateId);
        return this.http.get<JobModel[]>(url);
    }

    postCandidateApplyForJob(candidateId: string, jobId: string): Observable<boolean> {
        const url = Endpoints.CANDIDATE_APPLIED_FOR_JOB
            .replace(':candidateId', candidateId)
            .replace(':jobId', jobId);
        return this.http.post<boolean>(url, {});
    }

    getRecruiterManagesJobList(recruiterId: string): Observable<JobModel[]> {
        const url = Endpoints.JOB_RECRUITER_MANAGES.replace(':recruiterId', recruiterId);
        return this.http.get<JobModel[]>(url);
    }

    patchJob(jobModel: JobModel, jobId: string): Observable<JobModel> {
        const url = Endpoints.JOB_PATCH
            .replace(':recruiterId', '2')
            .replace(':jobId', jobId);
        return this.http.patch<JobModel>(url, jobModel);
    }

    deleteJobByJobId(id: string): Observable<boolean> {
        const url = Endpoints.JOB_DELETE
            .replace(':recruiterId', '2')
            .replace(':jobId', id);
        return this.http.delete<boolean>(url);
    }

    getJobRecommendationForCandidate(candidateId: string): Observable<JobModel[]> {
        const url = Endpoints.JOB_CANDIDATE_RECOMMENDATION.replace(':candidateId', candidateId);
        return this.http.get<JobModel[]>(url);
    }

    getCandidateRecommendationForJob(jobId: string): Observable<any[]> {
        // change it..
        const url = Endpoints.JOB_CANDIDATE_RECOMMENDATION;
        return this.http.get<JobModel[]>(url);
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
}
