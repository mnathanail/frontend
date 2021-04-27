import {ActivatedRoute, Router} from '@angular/router';
import {Directive} from '@angular/core';
import {TokenStorageService} from '../shared/service/token-storage.service';
import {ProfileModel} from './profile-model';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class ProfileAbstract {
    user: ProfileModel;
    isOwner = false;
    isRecruiter = false;

    constructor(
        protected router: Router,
        protected route: ActivatedRoute,
        protected tokenService: TokenStorageService
    ) {
        this.isOwner = this.checkIfIsOwner();
        this.isRecruiter = this.checkIfIsRecruiter();
    }

    getExperienceId(): string {
        return this.route.snapshot.params.expId;
    }

    getEducationId(): string {
        return this.route.snapshot.params.eduId;
    }

    getCandidateId(): string {
        return this.route.snapshot.params.id;
    }

    checkIfIsOwner(): boolean {
        this.user = (this.tokenService.getUser() as ProfileModel);
        return this.user.id.toString() === this.getCandidateId();
    }

    checkIfIsRecruiter(): boolean {
        return this.tokenService.isRecruiter();
    }
}
