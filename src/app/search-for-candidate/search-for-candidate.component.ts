import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, takeUntil, tap} from 'rxjs/operators';
import {SkillModel} from '../profile/profile-skill-list/profile-skill-item/skill-model';
import {SkillsService} from '../profile/service/skills/skills.service';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {SearchForCandidateService} from './service/search-for-candidate.service';
import {TokenStorageService} from '../shared/service/token-storage.service';
import {ProfileModel} from '../profile/profile-model';
import {ToastService} from '../toast/service/toast.service';

export interface CandidatesFromSearch{
    entityId: number;
    name: string;
    email: string;
}

@Component({
    selector: 'app-search-for-candidate',
    templateUrl: './search-for-candidate.component.html',
    styleUrls: ['./search-for-candidate.component.css']
})

export class SearchForCandidateComponent implements OnInit, OnDestroy {
    searching = false;
    searchFailed = false;
    skillListLength: number;
    destroy$ = new Subject();
    searchCandidates: FormGroup;
    user: ProfileModel;
    candidateResults: CandidatesFromSearch[];
    loaded = false;

    constructor(private skillService: SkillsService,
                private searchForCandidates: SearchForCandidateService,
                private tokenService: TokenStorageService,
                private toastService: ToastService) {
        this.user = (this.tokenService.getUser() as ProfileModel);
    }

    get aliases(): FormArray {
        return this.searchCandidates.get('skills') as FormArray;
    }

    ngOnInit(): void {
        this.searchCandidates = new FormGroup({
            excludedSkill: new FormControl(''),
            skills: new FormArray([])
        });
    }

    search = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            tap(() => (this.searching = true)),
            switchMap(term =>
                this.skillService.fetchSkills(term).pipe(
                    map((response: SkillModel | any) => {
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
        );

    formatMatches = (x: { name: string }) => x.name;

    addSkill(e): void {
        const skills = this.searchCandidates.get('skills') as FormArray;
        if (e.item.name.trim().length > 0) {
            skills.push(this.createSkillsFormGroup(e));
            this._clearInputModel();
        }
    }

    removeSelectedSkill(id: number): void {
        const skills = this.searchCandidates.get('skills') as FormArray;
        skills.removeAt(id);
    }

    onSave(): void | boolean {
        delete this.searchCandidates.value.excludedSkill;
        if (this.searchCandidates.value.skills.length === 0){
            this.toastService.show('Please add at least one skill!', {
                classname: 'bg-danger text-light',
            });
            return false;
        }
        this.searchForCandidates.searchCandidatesBySkills(this.user.id.toString(), this.searchCandidates.value.skills)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (value) => {
                    console.log(value);
                    this.loaded = true;
                    this.candidateResults = value;
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    clear(): void {
        const skills = this.searchCandidates.get('skills') as FormArray;
        skills.clear();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

    private createSkillsFormGroup(e): FormGroup {
        const value = e.item;
        return new FormGroup({
            id: new FormControl(value?.id),
            entityId: new FormControl(value?.id || null),
            name: new FormControl(value?.name),
            yearsOfExperience: new FormControl('1')
        });
    }

    private _clearInputModel(): void {
        setTimeout(() => {
            this.searchCandidates.get('excludedSkill').setValue('');
        }, 200);
    }

}
