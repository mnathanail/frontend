import {ActivatedRoute, Router} from '@angular/router';
import {Directive} from '@angular/core';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class ProfileAbstract {

    constructor(protected router: Router,
                protected route: ActivatedRoute
    ) {

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

}
