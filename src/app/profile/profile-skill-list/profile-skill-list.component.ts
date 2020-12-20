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

@Component({
    selector: 'app-profile-skill-list',
    templateUrl: './profile-skill-list.component.html',
    styleUrls: ['./profile-skill-list.component.css']
})
export class ProfileSkillListComponent implements OnInit, OnDestroy {

    skills: SkillModel[];
    private destroy$ = new Subject<any>();
    private skillsMessagesSubscription = new Subscription();
    private skillsSubscription = new Subscription();

    constructor(private router: Router,
                private route: ActivatedRoute,
                private skillService: SkillsService,
                private skillsMessage: SkillsMessagesService,
                private skillStateService: SkillsStateService
    ) {
    }

    ngOnInit(): void {

        this.skillsSubscription = this.skillService.fetchCandidateSkills()
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe(
                (value) => {
                    this.skills = value;
                }
            );

        this.skillsMessagesSubscription = this.skillsMessage
            .getSkillChanged()
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(
                (value) => {
                    //this.skills = value.data;

                    switch (value.type) {
                        case CrudEventsModel.POST: {
                            this.skills.unshift(...value.data);
                            break;
                        }
                        case CrudEventsModel.UPDATE: {
                            const index = this.skills.findIndex(skill => skill.relUuid === value.data[0].relUuid);
                            if (index !== -1) {
                                this.skills.splice(index, 1, value.data[0]);
                            }
                            break;
                        }
                        case CrudEventsModel.DELETE: {
                            if (this.skills) {
                                console.log(value);
                                const index = this.skills.findIndex(skill => skill.relUuid === value.data[0].relUuid);
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
        this.destroy$.unsubscribe();
        this.destroy$.next();
        this.skillsSubscription.unsubscribe();
        this.skillsMessagesSubscription.unsubscribe();
        this.skillsMessage.setSkillChangedComplete();
    }
}
