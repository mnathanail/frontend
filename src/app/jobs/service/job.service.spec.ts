import {getTestBed, TestBed} from '@angular/core/testing';

import {JobService} from './job.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {JobModel} from '../job-model';

describe('JobService', () => {
    let injector: TestBed;
    let service: JobService;
    let httpMock: HttpTestingController;

    const jobModel = {
        id: 3,
        jobId: 'ee1bab27-0558-4287-8452-4b6c437c7645',
        jobTitle: 'Java Developer',
        description: '<p>Creates user information solutions by developing, implementing, and maintaining Java based ' +
            'components and interfaces.!</p>',
        requiredSkills: [
            {skillNode: {name: 'Core Java', entityId: 7225}, relUuid: '5711ab1f-6df1-4448-93d6-7fd6ff1fd836', yearsOfExperience: 1},
            {skillNode: {name: 'Java', entityId: 17477}, relUuid: '5a782ab7-5d3d-43bd-8153-565469d9ee9a', yearsOfExperience: 1},
            {skillNode: {name: 'Java EE', entityId: 0}, relUuid: 'd4d81fef-ee21-4221-99df-47e419f7c0ae', yearsOfExperience: 1},
            {skillNode: {name: 'Java API', entityId: 17478}, relUuid: '703c5b53-550e-4d40-b831-9545f4c28b15', yearsOfExperience: 1}
        ]
    } as unknown as JobModel;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                JobService
            ]
        });
        injector = getTestBed();
        service = injector.get(JobService);
        httpMock = injector.get(HttpTestingController);
    });


    it('should return job model', () => {
        service.getJobByJobId('ee1bab27-0558-4287-8452-4b6c437c7645').subscribe(data => {
            expect(data).toEqual(jobModel);
        });
        const req = httpMock.expectOne(
            'http://localhost:8080/controller/job-view/get/job?jobId=ee1bab27-0558-4287-8452-4b6c437c7645');
        expect(req.request.method).toBe('GET');
        req.flush(jobModel);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
