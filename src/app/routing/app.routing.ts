import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {RegisterComponent} from '../register/register.component';
import {NgModule} from '@angular/core';
import {ProfileComponent} from '../profile/profile.component';
import {ProfileEditPhotoComponent} from '../profile/profile-edit/profile-edit-photo/profile-edit-photo.component';
import {ProfileEditSummaryComponent} from '../profile/profile-edit/profile-edit-summary/profile-edit-summary.component';
import {ProfileEditEducationComponent} from '../profile/profile-edit/profile-edit-education/profile-edit-education.component';
import {ProfileEditWorkExperienceComponent} from '../profile/profile-edit/profile-edit-work-experience/profile-edit-work-experience.component';
import {ProfileEditSkillsComponent} from '../profile/profile-edit/profile-edit-skills/profile-edit-skills.component';
import {CanDeactivateGuard} from '../guard/can-deactivate.guard';
import {JobsComponent} from '../jobs/jobs.component';
import {JobPostingComponent} from '../jobs/job-posting/job-posting.component';
import {JobViewComponent} from '../jobs/job-view/job-view.component';
import {JobSearchListComponent} from '../jobs/job-search-list/job-search-list.component';

const appRouting: Routes = [
    {path: '', redirectTo: 'profile/:id', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {
        path: 'profile/:id', component: ProfileComponent,
        children: [
            {path: 'edit/edit-photo-profile', component: ProfileEditPhotoComponent, canDeactivate: [CanDeactivateGuard]},
            {path: 'edit/edit-intro-profile', component: ProfileEditSummaryComponent},
            {path: 'edit/edit-education-profile/:eduId', component: ProfileEditEducationComponent},
            {path: 'new/new-education-profile', component: ProfileEditEducationComponent},
            {path: 'edit/edit-experience-profile/:expId', component: ProfileEditWorkExperienceComponent},
            {path: 'new/new-experience-profile', component: ProfileEditWorkExperienceComponent},
            {path: 'add/add-skills-profile', component: ProfileEditSkillsComponent},
            {path: 'edit/edit-skills-profile', component: ProfileEditSkillsComponent},
        ]
    },
    {
        path: 'jobs', component: JobsComponent,
        children: [
            {path: 'job-search', component: JobSearchListComponent}
        ]
    },
    {path: 'job-posting', component: JobPostingComponent},
    {path: 'job-update/edit/:jobId', component: JobPostingComponent},
    {path: 'job-view/:jobId', component: JobViewComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(appRouting, /*{ enableTracing: true }*/)],
    exports: [RouterModule]
})

export class AppRouting {
}
