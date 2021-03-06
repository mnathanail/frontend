import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, takeUntil, tap} from 'rxjs/operators';
import {SkillModel} from '../../../../profile/profile-skill-list/profile-skill-item/skill-model';
import {SkillsService} from '../../../../profile/service/skills/skills.service';

@Component({
    selector: 'app-search-by-skill',
    templateUrl: './search-by-skill.component.html',
    styleUrls: ['./search-by-skill.component.css']
})
export class SearchBySkillComponent implements OnInit, OnDestroy {

    searching = false;
    searchFailed = false;
    skillListLength: number;
    destroy$ = new Subject();
    constructor(private skillService: SkillsService) {
    }

    ngOnInit(): void {
    }

    search = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            tap(() => (this.searching = true)),
            switchMap(term =>
                this.skillService.fetchSkills(term).pipe(
                    map((response: SkillModel[] | []) => {
                        this.skillListLength = response.length;
                        return response.length > 0 ? response : [];
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
