import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SkillsService} from '../service/skills/skills.service';
import {SkillModel} from './profile-skill-item/skill-model';
import {SkillsMessagesService} from '../service/skills/skills-messages.service';
import {Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {CrudEventsModel} from '../../shared/enums/crud-events-model.enum';
import {SkillsStateService} from '../service/skills/skills-state.service';
import {StateModel} from '../../shared/enums/state-model.enum';
import {ProfileAbstract} from '../abstract-profile';
import {TokenStorageService} from '../../shared/service/token-storage.service';

@Component({
    selector: 'app-profile-skill-list',
    templateUrl: './profile-skill-list.component.html',
    styleUrls: ['./profile-skill-list.component.css']
})
export class ProfileSkillListComponent extends ProfileAbstract implements OnInit, OnDestroy {

    skills: SkillModel[];
    private destroy$ = new Subject<any>();
    candidateId: string;

    constructor(protected router: Router,
                protected route: ActivatedRoute,
                protected tokenService: TokenStorageService,
                private skillService: SkillsService,
                private skillsMessage: SkillsMessagesService,
                private skillStateService: SkillsStateService
    ) {
        super(router, route, tokenService);
        this.candidateId = this.getCandidateId();
    }

    ngOnInit(): void {

        this.skillService.fetchCandidateSkills(this.candidateId)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (value) => {
                    this.skills = value;
                }
            );

        this.skillsMessage
            .getSkillChanged()
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (value) => {
                    switch (value.type) {
                        case CrudEventsModel.POST: {
                            this.skills = value.data;
                            break;
                        }
                        case CrudEventsModel.UPDATE: {
                            this.skills = value.data;
                            /*const index = this.skills.findIndex((skill, i) => skill.relUuid === value.data[i].relUuid);
                            if (index !== -1) {
                                this.skills.splice(index, 1, value.data[0]);
                            }*/
                            break;
                        }
                        case CrudEventsModel.DELETE: {
                            if (this.skills) {
                                const index = this.skills.findIndex((skill, i) => {
                                        return skill.relUuid === value.data[0].relUuid;
                                });

                                if (index !== -1) {
                                    this.skills.splice(index, 1);
                                }
                            }
                            break;
                        }
                        case CrudEventsModel.EMPTY: {
                            break;
                        }
                    }
                }
            );
    }

    onAddSkill(): void {
        this.router.navigate(['add/add-skills-profile'], {relativeTo: this.route});
    }

    onEditSkills(): void {
        this.skillsMessage.setSkillChanged({data: this.skills, type: CrudEventsModel.EMPTY});
        this.router.navigate(['edit/edit-skills-profile'], {relativeTo: this.route})
            .then(value => {
                if (value) {
                    this.skillStateService.setSkillStateChanged({state: StateModel.EDIT});
                    this.skillsMessage.setSkillChanged({data: this.skills, type: CrudEventsModel.UPDATE});
                }
            })
            .catch(reason => {
                console.log(reason);
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }
}
