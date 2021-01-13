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
import {CanActivateAuthenticationGuard as authenticationGuard} from '../guard/can-activate-authentication.guard';
import {LogoutComponent} from '../logout/logout.component';
import {CanActivateChildAuthorizationGuard} from '../guard/can-activate-child-authorization.guard';

const appRouting: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'logout', component: LogoutComponent},
    {path: 'register', component: RegisterComponent},
    {
        path: 'profile/:id', component: ProfileComponent, canActivate: [authenticationGuard],
        children: [
            {path: 'edit/edit-photo-profile', component: ProfileEditPhotoComponent, canActivate: [authenticationGuard] , canDeactivate: [CanDeactivateGuard]},
            {path: 'edit/edit-intro-profile', component: ProfileEditSummaryComponent},
            {path: 'edit/edit-education-profile/:eduId', component: ProfileEditEducationComponent},
            {path: 'new/new-education-profile', component: ProfileEditEducationComponent},
            {path: 'edit/edit-experience-profile/:expId', component: ProfileEditWorkExperienceComponent},
            {path: 'new/new-experience-profile', component: ProfileEditWorkExperienceComponent},
            {path: 'add/add-skills-profile', component: ProfileEditSkillsComponent},
            {path: 'edit/edit-skills-profile', component: ProfileEditSkillsComponent, },
        ]
    },
    {
        path: 'jobs', component: JobsComponent, canActivate: [authenticationGuard], canActivateChild: [CanActivateChildAuthorizationGuard],
        children: [
            {path: 'job-search', component: JobSearchListComponent}
        ]
    },
    {
        path: 'job-posting',
        component: JobPostingComponent,
        canActivate: [authenticationGuard],
        data: {authorities: ['RECRUITER']}
    },
    {
        path: 'job-update/edit/:jobId',
        component: JobPostingComponent,
        canActivate: [authenticationGuard],
        data: {authorities: ['RECRUITER']}
    },
    {path: 'job-view/:jobId', component: JobViewComponent, canActivate: [authenticationGuard]},
    {path: '', redirectTo: '/', pathMatch: 'full'},
    {path: '**', redirectTo: ''}

];

@NgModule({
    imports: [RouterModule.forRoot(appRouting, /*{ enableTracing: true }*/)],
    exports: [RouterModule]
})

export class AppRouting {
}
