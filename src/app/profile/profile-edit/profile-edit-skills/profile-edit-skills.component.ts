import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileAbstractEdit} from '../profile-abstract-edit';
import {HttpClient} from '@angular/common/http';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {Observable, of, Subject, Subscription} from 'rxjs';
import {catchError, concatMap, debounceTime, distinctUntilChanged, map, switchMap, takeUntil, tap} from 'rxjs/operators';
import {SkillsService} from '../../service/skills/skills.service';
import {LoaderService} from '../../../shared/loader/service/loader.service';
import {SkillsMessagesService} from '../../service/skills/skills-messages.service';
import {CrudEventsModel} from '../../../shared/enums/crud-events-model.enum';
import {SkillModel} from '../../profile-skill-list/profile-skill-item/skill-model';
import {SkillsStateService} from '../../service/skills/skills-state.service';
import {StateModel} from '../../../shared/enums/state-model.enum';
import {SkillNode} from '../../profile-skill-list/profile-skill-item/skill-node';

@Component({
    selector: 'app-profile-edit-skills',
    templateUrl: './profile-edit-skills.component.html',
    styleUrls: ['./profile-edit-skills.component.css'],
    providers: [SkillsService]
})
export class ProfileEditSkillsComponent extends ProfileAbstractEdit implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('content', {static: false}) content: ElementRef;

    @ViewChild('skillElem', {static: false}) skillElem: ElementRef;
    index: number;
    addSkillsForm: FormGroup;
    editSkillsForm: FormGroup;
    searching = false;
    searchFailed = false;
    editState = false;
    initialFormValue: SkillModel[];
    private subscription = new Subscription();
    private crudSubscription = new Subscription();
    private getValues: { type: CrudEventsModel; data: SkillModel[] };
    private destroy$ = new Subject<any>();
    searchTerm = '';
    candidateId: string;

    constructor(protected config: NgbModalConfig,
                protected modalService: NgbModal,
                protected router: Router,
                protected route: ActivatedRoute,
                private http: HttpClient,
                private skillService: SkillsService,
                private loaderService: LoaderService,
                private skillMessages: SkillsMessagesService,
                private skillStateService: SkillsStateService,
    ) {
        super(config, modalService, router, route);
        this.candidateId = this.getCandidateId();
        this.skillStateService.getSkillStateChanged()
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                value => {
                    this.editState = value.state === StateModel.EDIT;
                });

        this.editState = this.router.url.indexOf('edit') > 0;
        this.skillMessages.getSkillChanged().subscribe(value => this.getValues = value);

        /*        this.skillService.fetchCandidateSkills()
                    .filter(
                        takeUntil(this.destroy$)
                    )
                    .subscribe(
                        (value) => {
                            this.getValues.data = value;
                        }
                    );*/

    }

    get aliasesEdit(): FormArray {
        return this.editSkillsForm.get('editSkills') as FormArray;
    }

    get aliases(): FormArray {
        return this.addSkillsForm.get('skills') as FormArray;
    }

    ngOnInit(): void {

        if (this.editState) {
            this.editSkillsForm = new FormGroup({
                editSkills: new FormArray(
                    this.getValues.data.map(r => this.patchValues(r))
                ),
                filterCandidateSkillList: new FormControl('')
            });
            this.initialFormValue = this.editSkillsForm.get('editSkills').value;
        } else {
            this.addSkillsForm = new FormGroup({
                skillExcluded: new FormControl(''),
                skills: new FormArray([])
            });
        }
    }

    patchValues(v: SkillModel): FormGroup {
        return new FormGroup({
            skillNode: new FormGroup({
                entityId: new FormControl(v.skillNode.entityId),
                name: new FormControl(v.skillNode.name)
            }),
            yearsOfExperience: new FormControl(v.yearsOfExperience),
            relUuid: new FormControl(v.relUuid)
        });
    }

    removeSelectedSkill(id: number): void {
        const skills = this.addSkillsForm.get('skills') as FormArray;
        skills.removeAt(id);
    }

    onSave(): void {
        delete this.addSkillsForm.value.skillExcluded;
        const formData = this.addSkillsForm.get('skills').value;

        const unsavedSkills = formData.filter(value => value.id === null);
        const alreadyExistedSkills = formData.filter(value => value.id !== null);
        let finalSkillList = [];

        if (unsavedSkills.length > 0) {
            this.skillService.saveSkillList(this.candidateId, unsavedSkills)
                .pipe(
                    concatMap((result) => {
                        result.forEach(value => {
                            value.yearsOfExperience = unsavedSkills.find(v => v.name === value.name).yearsOfExperience;
                            return value;
                        });

                        finalSkillList = [...alreadyExistedSkills, ...result]
                            .map(value => {
                                value.entityId = value.id;
                                return value;
                            });
                        return this.skillService.saveCandidateSkillList(this.candidateId, finalSkillList);
                    })
                )
                .subscribe(
                    (value) => {
                        this.skillMessages.setSkillChanged({type: CrudEventsModel.POST, data: value});
                    },
                    error => {
                        this.skillMessages.setSkillChangedError(error);
                    },
                    () => {
                        this.delayedModalClose();
                    }
                );
        } else {
            finalSkillList = alreadyExistedSkills.map(value => {
                value.entityId = value.id;
                return value;
            });
            this.skillService.saveCandidateSkillList(this.candidateId, finalSkillList)
                .subscribe(
                    (value) => {
                        this.skillMessages.setSkillChanged({type: CrudEventsModel.POST, data: value});
                    },
                    error => {
                        this.skillMessages.setSkillChangedError(error);
                    },
                    () => {
                        this.delayedModalClose();
                    }
                );
        }
    }

    search = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            tap(() => (this.searching = true)),
            switchMap(term =>
                this.skillService.fetchSkills(term).pipe(
                    map((response) => {
                        return response.length > 0 ? response : [{id: null, name: term}];
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
            })
        )

    formatMatches = (x: { name: string }) => x.name;


    ngAfterViewInit(): void {
        this.openModal(this.content);
    }

    removeSkill(id: number, skillUuid: string): void {
        const skills = this.editSkillsForm.get('editSkills') as FormArray;

        this.skillService.deleteSkill(this.candidateId, skillUuid)
            .subscribe(
                (value) => {
                    if (value) {
                        const removedSkill = [];
                        removedSkill.push(skills.at(id).value);
                        skills.removeAt(id);
                        this.skillMessages.setSkillChanged({type: CrudEventsModel.DELETE, data: removedSkill});
                    }
                },
                error => {
                    this.skillMessages.setSkillChangedError(error);
                },
                () => {
                    console.log('completed!');
                }
            );
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

    onSaveEdit(): void {
        const current = this.editSkillsForm.get('editSkills').value;

        const changed = current.filter((value, index) => {
            return value.yearsOfExperience !== this.initialFormValue[index].yearsOfExperience;
        });

        if (changed.length > 0) {
            this.skillService.updateSkills(this.candidateId, changed)
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                    (value) => {
                        this.skillMessages.setSkillChanged({type: CrudEventsModel.UPDATE, data: value});
                    },
                    error => {
                        this.skillMessages.setSkillChangedError(error);
                    },
                    () => {
                        console.log('complete');
                        this.delayedModalClose();
                    }
                );
        }
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

    private addSkill(e): void {
        const skills = this.addSkillsForm.get('skills') as FormArray;
        if (e.item.name.trim().length > 0) {
            skills.push(this.createSkillsFormGroup(e));
            this._clearInputModel();
        }
    }

    private _clearInputModel(): void {
        setTimeout(() => {
            this.addSkillsForm.get('skillExcluded').setValue('');
        }, 200);
    }

    searchCandidateSkillList(value: any): void {
        this.searchTerm = value;
    }
}
