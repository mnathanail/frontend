import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, of, Subject} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, takeUntil, tap} from 'rxjs/operators';
import {SkillsService} from '../../profile/service/skills/skills.service';
import {JobService} from '../service/job.service';
import {ActivatedRoute, Router} from '@angular/router';
import {JobModel} from '../job-model';
import {TokenStorageService} from '../../shared/service/token-storage.service';
import {ProfileModel} from '../../profile/profile-model';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {RequiredSkill} from '../required-skill';
import {FormsMethods} from '../../shared/forms/forms-methods';
import {SkillModel} from '../../profile/profile-skill-list/profile-skill-item/skill-model';
import {ToastService} from '../../toast/service/toast.service';

@Component({
    selector: 'app-job-posting',
    templateUrl: './job-posting.component.html',
    styleUrls: ['./job-posting.component.css'],
    providers: [SkillsService]
})
export class JobPostingComponent implements OnInit, OnDestroy {
    jobPosting: FormGroup;
    searching = false;
    searchFailed = false;
    editState = false;
    loaded = false;
    submitted = false;
    profileId: string;
    t: RequiredSkill;
    editorConfig: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        height: 'auto',
        minHeight: '300px',
        maxHeight: 'auto',
        width: 'auto',
        minWidth: '0',
        translate: 'yes',
        enableToolbar: true,
        showToolbar: true,
        placeholder: 'Enter job description here...',
        defaultParagraphSeparator: 'p',
        defaultFontName: '',
        defaultFontSize: '',
        fonts: [
            {class: 'arial', name: 'Arial'},
            {class: 'times-new-roman', name: 'Times New Roman'},
            {class: 'calibri', name: 'Calibri'},
        ],
        customClasses: [
            {
                name: 'quote',
                class: 'quote',
            },
            {
                name: 'redText',
                class: 'redText'
            },
            {
                name: 'titleText',
                class: 'titleText',
                tag: 'h1',
            },
        ],
        uploadWithCredentials: false,
        sanitize: true,
        toolbarPosition: 'top',
        toolbarHiddenButtons: [
            [
                'strikeThrough',
                'subscript',
                'superscript',
                'indent',
                'outdent',
                'fontName'
            ],
            [
                'backgroundColor',
                'customClasses',
                'link',
                'unlink',
                'insertImage',
                'insertVideo',
                'insertHorizontalRule',
                'removeFormat',
                'toggleEditorMode'
            ]
        ]
    };
    private destroy$ = new Subject<any>();

    constructor(
        private skillService: SkillsService,
        private jobService: JobService,
        private router: Router,
        private activeRoute: ActivatedRoute,
        private tokenService: TokenStorageService,
        private toastService: ToastService
    ) {
        this.editState = this.router.url.indexOf('edit') > 0;
        this.profileId = (this.tokenService.getUser() as ProfileModel).id.toString();

    }

    get requiredSkills(): FormArray {
        return this.jobPosting.get('requiredSkills') as FormArray;
    }

    get f(): { [p: string]: AbstractControl } {
        return this.jobPosting.controls;
    }

    ngOnInit(): void {

        if (this.editState) {
            const jobId = this.activeRoute.snapshot.params.jobId;
            this.jobService.getJobByJobId(jobId)
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                    (value) => {
                        this.loaded = true;
                        this.formInit(value);
                    }
                );
        } else {
            this.loaded = true;
            this.formInit();
        }
    }

    formInit(jobModel?: JobModel): void {
        const requiredSkillsArray = jobModel?.requiredSkills.map(e => this.createSkillsFormGroup(e));
        this.jobPosting = new FormGroup({
            jobTitle: new FormControl(jobModel?.jobTitle || '', Validators.required),
            description: new FormControl(jobModel?.description || '', Validators.required),
            skillExcluded: new FormControl(''),
            requiredSkills: new FormArray(requiredSkillsArray || [], [Validators.required, Validators.minLength(1)])
        });
    }

    addRequiredSkills(e): void | boolean {
        const skills = this.jobPosting.get('requiredSkills') as FormArray;
        const exists = skills.value.some(el =>  el.skillNode.name === e.item.name);
        if (exists) {
            this.toastService.show(
                'Skill has been already added to your list.',
                {classname: 'bg-warning text-light'}
            );
            this._clearInputModel();
            return false;
        }
        if (e.item.name.trim().length > 0) {
            skills.push(this.createSkillsFormGroup(
            {skillNode: {entityId: e?.item?.id, id: e?.item?.id, name: e?.item?.name}, yearsOfExperience: e?.item?.yearsOfExperience}
            ));
            this._clearInputModel();
        }
    }

    onSubmit(): void | boolean {
        delete this.jobPosting.value.skillExcluded;
        this.submitted = true;

        if (this.editState) {
            const jobId = this.activeRoute.snapshot.params.jobId;
            this.jobService.patchJob(this.jobPosting.value, this.profileId, jobId)
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                    (value) => {
                        setTimeout(() => {
                            this.router.navigate([`job-view/${value.jobId}`]);
                        }, 500);
                    },
                    error => {
                        console.log(error);
                    },
                    () => {}
                );
        } else {
            this.jobService.saveJob(this.profileId, this.jobPosting.value)
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                    (value) => {
                        setTimeout(() => {
                            this.router.navigate([`job-view/${value.jobId}`]);
                        }, 500);
                    },
                    error => {
                        console.log(error);
                    },
                    () => {}
                );
        }
    }

    onDelete(jobId: string): void {
        this.jobService.deleteJobByJobId(this.profileId, jobId)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (value) => {
                    if (value) {
                        this.toastService.show(
                            'Deleted!',
                            {classname: 'bg-success text-light'}
                        );
                    } else {
                        this.toastService.show(
                            'Did not deleted! :(',
                            {classname: 'bg-error text-light'}
                        );
                    }
                }
            );
    }

    search = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            tap(() => (this.searching = true)),
            switchMap(term =>
                this.skillService.fetchSkills(term)
                    .pipe(
                        map((response) => {
                            return response.length > 0 ? response : [{id: null, name: term}];
                        }),
                        tap(() => {
                            this.searchFailed = false;
                        }),
                        catchError(() => {
                            this.searchFailed = true;
                            return of([]);
                        }),
                        takeUntil(this.destroy$)
                    )
            ),
            tap(x => {
                this.searching = false;
            }), takeUntil(this.destroy$)
        )

    formatMatches = (x: { name: string }) => x.name;

    removeSkill(i: number): void {
        const skills = this.jobPosting.get('requiredSkills') as FormArray;
        const obj = skills.get(i.toString()).value;
        skills.removeAt(i);
        /*this.jobService.removeSkill(this.profileId, obj.skillNode.entityId)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (value) => {
                    if (value){
                        skills.removeAt(i);
                    }
                }
            );*/

    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

    private createSkillsFormGroup(e): FormGroup {
        const value = e?.skillNode;
        return new FormGroup({
            id: new FormControl(value?.id),
            skillNode: new FormGroup({
                entityId: new FormControl(value?.entityId || null),
                name: new FormControl(value?.name),
            }),
            yearsOfExperience: new FormControl(value?.yearsOfExperience || 1)
        });
    }

    private _clearInputModel(): void {
        setTimeout(() => {
            this.jobPosting.get('skillExcluded').setValue('');
        }, 200);
    }

    goBack(): void {
        const jobId = this.activeRoute.snapshot.params.jobId;
        this.router.navigate([`/job-view/${jobId}`]);
    }
}
