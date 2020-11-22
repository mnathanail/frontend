import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileAbstractEdit} from '../profile-abstract-edit';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {catchError, debounceTime, delay, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {SkillsService} from '../../service/skills/skills.service';
import {LoaderService} from '../../../shared/loader/service/loader.service';
import {SkillModel} from '../../profile-skill-list/profile-skill-item/skill-model';

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
    'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
    'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
    'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
    'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
    'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];


@Component({
    selector: 'app-profile-edit-skills',
    templateUrl: './profile-edit-skills.component.html',
    styleUrls: ['./profile-edit-skills.component.css'],
    providers: [SkillsService]
})
export class ProfileEditSkillsComponent extends ProfileAbstractEdit implements OnInit, AfterViewInit {

    @ViewChild('content', {static: false}) content: ElementRef;
    index: number;
    skills: any[] = [];
    editSkillsForm: FormGroup;
    searching = false;
    searchFailed = false;

    constructor(protected config: NgbModalConfig,
                protected modalService: NgbModal,
                protected router: Router,
                protected route: ActivatedRoute,
                private http: HttpClient,
                private skillService: SkillsService,
                private loaderService: LoaderService,
    ) {
        super(config, modalService, router, route);

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
        );

    formatMatches = (x: { name: string }) => x.name;

    ngOnInit(): void {
        this.editSkillsForm = new FormGroup({
            skill: new FormControl('')
        });
    }

    ngAfterViewInit(): void {
        this.openModal(this.content);
    }

    addSkill(e): void {
        if (e.item.name.trim().length > 0) {
            this.skills.push(e.item);
            this._clearInputModel();
        }
    }

    removeSelectedSkill(id: number): void {
        this.skills.splice(id, 1);
    }

    onSave(): void {
        console.log(this.skills);
        const unsavedSkills = this.skills.filter(value => value.id === null);

        /*this.skillService.saveSkillList(unsavedSkills)
            .subscribe()*/

    }

    private _clearInputModel(): void {
        setTimeout(() => {
            this.editSkillsForm.get('skill').setValue('');
        }, 200);
    }
}
