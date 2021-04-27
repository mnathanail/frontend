import {Component, OnDestroy, OnInit} from '@angular/core';
import {TokenStorageService} from '../shared/service/token-storage.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AuthenticationStatusService} from '../shared/events/authentication-status-service';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, takeUntil, tap} from 'rxjs/operators';
import {Observable, of, Subject} from 'rxjs';
import {ProfileModel} from '../profile/profile-model';
import {SkillModel} from '../profile/profile-skill-list/profile-skill-item/skill-model';
import {SkillsService} from '../profile/service/skills/skills.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],

})
export class HeaderComponent implements OnInit, OnDestroy {

    isLoggedIn = false;
    profileId: number;
    model: ProfileModel;
    isCandidate: string;
    isRecruiter: string;
    collapsed = true;
    searching = false;
    searchFailed = false;
    skillListLength: number;
    // tslint:disable-next-line:variable-name
    _router: Router;
    loaded = false;
    user: ProfileModel;
    id: any;
    private destroy$ = new Subject();

    constructor(private tokenService: TokenStorageService,
                private router: Router,
                private skillService: SkillsService,
                private authenticationStatus: AuthenticationStatusService,
                private activeRoute: ActivatedRoute) {
        this.authStatus();
        this._router = router;
    }

    ngOnInit(): void {
    }

    authStatus(): void {
        this.authenticationStatus.getAuthenticationStatus()
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (value) => {
                    this.loaded = true;
                    this.isLoggedIn = value;
                    this.model = this.tokenService.getUser() as ProfileModel;
                    if (this.model) {
                        this.profileId = this.model.id;
                        const searchForCandidate = this.model.authorities.find(v => {
                            return v.authority === 'CANDIDATE';
                        });
                        const searchForRecruiter = this.model.authorities.find(v => {
                            return v.authority === 'RECRUITER';
                        });
                        this.isCandidate = searchForCandidate?.authority;
                        this.isRecruiter = searchForRecruiter?.authority;
                    }
                },
                error => {
                    this.authenticationStatus.setAuthenticationStatusError(error);
                },
                () => {
                }
            );
    }

    onEnter(value: any): void {
        const params = value.split(',').map(e => e.trim());
        const options = {queryParams: {keywords: params}};
        this.router.navigate(['jobs/job-search'], options);
        /*.then(
            v => {
                this.jobService.getJobsForCandidateDependingOnSkillArray(params)
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(
                        (val) => {
                            console.log(val);
                        },
                        error => {
                            console.log(error);
                        },
                        () => {
                            console.log('Completed!');
                        }
                    );
            }
        );*/
    }

    search = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            tap(() => (this.searching = true)),
            switchMap(term =>
                this.skillService.fetchSkills(term).pipe(
                    map((response: SkillModel[] | any) => {
                        this.skillListLength = response.length;
                        return response.length > 0 ? response.slice(0, 10) : [{name: term}];
                    }),
                    tap(() => {
                        this.searchFailed = false;
                    }),
                    catchError(() => {
                        this.searchFailed = true;
                        return of([]);
                    })
                )
            ),
            tap(x => {
                this.searching = false;
            }),
            takeUntil(this.destroy$)
        )

    formatMatches = (x: { name: string }) => x.name;

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }
}
