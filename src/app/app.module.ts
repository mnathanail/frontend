import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AppRouting} from './routing/app.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { interceptors } from './interceptor';
import {HttpClientModule} from '@angular/common/http';
import { LoaderComponent } from './shared/loader/loader.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileExperienceListComponent } from './profile/profile-experience-list/profile-experience-list.component';
import { ProfileExperienceItemComponent} from './profile/profile-experience-list/profile-experience-item/profile-experience-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileEditPhotoComponent } from './profile/profile-edit/profile-edit-photo/profile-edit-photo.component';
import { ProfileEditSummaryComponent } from './profile/profile-edit/profile-edit-summary/profile-edit-summary.component';
import { ProfileEditWorkExperienceComponent } from './profile/profile-edit/profile-edit-work-experience/profile-edit-work-experience.component';
import { ProfileEditEducationComponent } from './profile/profile-edit/profile-edit-education/profile-edit-education.component';
import { ProfileEditSkillsComponent } from './profile/profile-edit/profile-edit-skills/profile-edit-skills.component';
import {CanDeactivateGuard} from './guard/can-deactivate.guard';
import { ConfirmComponent } from './shared/confirm/confirm.component';
import { ProfileEducationListComponent } from './profile/profile-education-list/profile-education-list.component';
import { ProfileEducationItemComponent } from './profile/profile-education-list/profile-education-item/profile-education-item.component';
import { ProfileSummaryComponent } from './profile/profile-summary/profile-summary.component';
import { ProfileSkillListComponent } from './profile/profile-skill-list/profile-skill-list.component';
import { ProfileSkillItemComponent } from './profile/profile-skill-list/profile-skill-item/profile-skill-item.component';
import {SummaryMessagesService} from './profile/service/summary/summary-messages.service';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        HeaderComponent,
        DropdownDirective,
        LoaderComponent,
        ProfileComponent,
        ProfileExperienceListComponent,
        ProfileExperienceItemComponent,
        ProfileEditPhotoComponent,
        ProfileEditSummaryComponent,
        ProfileEditWorkExperienceComponent,
        ProfileEditEducationComponent,
        ProfileEditSkillsComponent,
        ConfirmComponent,
        ProfileEducationListComponent,
        ProfileEducationItemComponent,
        ProfileSummaryComponent,
        ProfileSkillListComponent,
        ProfileSkillItemComponent,
    ],
    imports: [
        BrowserModule,
        AppRouting,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule,
        FormsModule
    ],
    providers: [interceptors],
    bootstrap: [AppComponent]
})
export class AppModule {
}
