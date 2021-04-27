import {Injectable} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class UrlParameterService {

    constructor(private route: ActivatedRoute, private router: Router) {
    }

    getCandidateId(): Params {
        return this.route.snapshot.params;
    }

    getExperienceArrayId(): Params {
        return this.route.snapshot.params;
    }
}
